import React from 'react'
import { render } from '@testing-library/react-native'
import { Graph } from './Graph'
import { useThemeStore } from '../store/useThemeStore'

// Mock theme store
jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn(),
}))

// Mock Skia font hook
jest.mock('@shopify/react-native-skia', () => ({
  useFont: jest.fn(() => ({})),
}))

jest.mock('victory-native', () => {
  const React = require('react')
  const { View } = require('react-native')
  return {
    CartesianChart: ({ children, ...props }: any) => (
      <>{typeof children === 'function' ? children({
        points: {
          open: [{ x: 1, y: 100 }, { x: 2, y: 110 }],
          close: [{ x: 1, y: 105 }, { x: 2, y: 108 }],
          high: [{ x: 1, y: 115 }, { x: 2, y: 120 }],
          low: [{ x: 1, y: 98 }, { x: 2, y: 100 }]
        }
      }) : children}</>
    ),
    Line: (props: any) => <View testID="mock-Line" {...props} />,
  }
})

const mockTheme = {
  open: '#123456',
  close: '#654321',
  high: '#ff0000',
  low: '#00ff00',
}

beforeEach(() => {
  // @ts-ignore
  (useThemeStore as jest.Mock).mockReturnValue({ theme: mockTheme })
})

afterEach(() => {
  jest.clearAllMocks()
})

const baseData = [
  { date: '2024-01-01', open: 10, close: 20, high: 30, low: 5 },
  { date: '2024-01-02', open: 12, close: 22, high: 32, low: 8 },
]

describe('Graph', () => {
  it('renders "No data available" if data is empty', () => {
    const { getByText } = render(<Graph data={[]} selectedSeries={{open: true, close: true, high: true, low: true}} />)
    expect(getByText('No data available')).toBeTruthy()
  })

  it('renders "No series selected" if all series are disabled', () => {
    const { getByText } = render(<Graph data={baseData} selectedSeries={{open: false, close: false, high: false, low: false}} />)
    expect(getByText('No series selected')).toBeTruthy()
  })

  it('renders CartesianChart and the enabled series Lines', () => {
    const selectedSeries = { open: true, close: false, high: true, low: false }
    const { getAllByTestId } = render(<Graph data={baseData} selectedSeries={selectedSeries} />)
    const lines = getAllByTestId('mock-Line')
    expect(lines[0].props.color).toBe(mockTheme.open)
    expect(lines[1].props.color).toBe(mockTheme.high)
    // Also, strokeWidth correct for "high"
    expect(lines[1].props.strokeWidth).toBe(3)
  })

  it('renders all four series if all are enabled', () => {
    const selectedSeries = { open: true, close: true, high: true, low: true }
    const { getAllByTestId } = render(<Graph data={baseData} selectedSeries={selectedSeries} />)
    const lines = getAllByTestId('mock-Line')
    expect(lines).toHaveLength(4)
  })

  it('falls back to default color if theme color is missing', () => {
    // @ts-ignore
    (useThemeStore as jest.Mock).mockReturnValue({ theme: { } })
    const selectedSeries = { open: true, close: false, high: false, low: false }
    const { getAllByTestId } = render(<Graph data={baseData} selectedSeries={selectedSeries} />)
    const lines = getAllByTestId('mock-Line')
    expect(lines[0].props.color).toBe('#4CAF50')
  })
})
