import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { StockCard } from './StockCard'
import { useThemeStore } from '../store/useThemeStore'

jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn(),
}))

const mockTheme = {
  text: '#123456',
  background: '#abcdef',
  border: '#654321',
}

const stock = {
  id: 'aapl',
  name: 'Apple Inc',
} as any

describe('StockCard', () => {
  beforeEach(() => {
    // @ts-ignore
    (useThemeStore as jest.Mock).mockReturnValue({ theme: mockTheme })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the stock name', () => {
    const { getByText } = render(<StockCard stock={stock} />)
    expect(getByText('Apple Inc')).toBeTruthy()
  })

  it('renders the interest icon', () => {
    const { getByTestId } = render(<StockCard stock={stock} />)
    expect(getByTestId('interest-icon')).toBeTruthy()
  })

  it('applies the correct theme styles', () => {
    const { getByLabelText } = render(<StockCard stock={stock} />)
    const card = getByLabelText('View details for Apple Inc')
    const style = Array.isArray(card.props.style)
      ? Object.assign({}, ...card.props.style)
      : card.props.style
    expect(style.backgroundColor).toBe(mockTheme.background)
    expect(style.borderColor).toBe(mockTheme.border)
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByLabelText } = render(
      <StockCard stock={stock} onPress={onPress} />
    )
    fireEvent.press(getByLabelText('View details for Apple Inc'))
    expect(onPress).toHaveBeenCalled()
  })

  it('has the correct accessibility label', () => {
    const { getByLabelText } = render(<StockCard stock={stock} />)
    expect(getByLabelText('View details for Apple Inc')).toBeTruthy()
  })
})
