import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import Zoom from './Zoom'
import { useThemeStore } from '../store/useThemeStore'

// Mock the theme store
jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn(),
}))

const mockTheme = { text: '#111111', background: '#eeeeee' }

beforeEach(() => {
  // @ts-ignore
  useThemeStore.mockReturnValue({ theme: mockTheme })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Zoom', () => {
  it('renders all zoom buttons with correct labels', () => {
    const { getByText } = render(<Zoom setZoom={jest.fn()} />)
    expect(getByText('7d')).toBeTruthy()
    expect(getByText('30d')).toBeTruthy()
    expect(getByText('All')).toBeTruthy()
  })

  it('applies theme color to the zoom button text', () => {
    const { getByText } = render(<Zoom setZoom={jest.fn()} />)

    const btnText = getByText('7d')

    // In React Native Testing Library, parent style (TouchableOpacity) may be lost due to mocks.
    // But text color is always present and user-visible.
    const textStyle = Array.isArray(btnText.props.style)
      ? Object.assign({}, ...btnText.props.style)
      : btnText.props.style

    expect(textStyle.color).toBe(mockTheme.background)
  })


  it('calls setZoom with correct value when a button is pressed', () => {
    const setZoom = jest.fn()
    const { getByText } = render(<Zoom setZoom={setZoom} />)

    fireEvent.press(getByText('7d'))
    expect(setZoom).toHaveBeenCalledWith('7d')

    fireEvent.press(getByText('30d'))
    expect(setZoom).toHaveBeenCalledWith('30d')

    fireEvent.press(getByText('All'))
    expect(setZoom).toHaveBeenCalledWith('all')
  })
})
