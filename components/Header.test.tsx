import React from 'react'
import { render } from '@testing-library/react-native'
import { Header } from './Header'
import { useThemeStore } from '../store/useThemeStore'

// Mock the theme store
jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn(),
}))

// Mock all image assets that might be used
jest.mock('../assets/AAPL.png', () => 'mocked-aapl-image')
jest.mock('../assets/TSLA.png', () => 'mocked-tsla-image')
jest.mock('../assets/GOOGL.png', () => 'mocked-googl-image')

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const React = require('react')
  const { View, Image, Text } = require('react-native')
  
  // Create animated components that behave like regular RN components
  const AnimatedView = React.forwardRef((props: any, ref: any) => <View ref={ref} {...props} />)
  const AnimatedImage = React.forwardRef((props: any, ref: any) => <Image ref={ref} {...props} />)
  const AnimatedText = React.forwardRef((props: any, ref: any) => <Text ref={ref} {...props} />)
  
  // Create the Animated object that matches your import pattern
  const Animated = {
    View: AnimatedView,
    Image: AnimatedImage,
    Text: AnimatedText,
  }
  
  return {
    __esModule: true,
    default: Animated, // This is the key - your component imports Animated as default
    View: AnimatedView,
    Image: AnimatedImage,
    Text: AnimatedText,
  }
})

const mockUseThemeStore = useThemeStore as jest.MockedFunction<typeof useThemeStore>
const mockTheme = { text: '#123456' }

beforeEach(() => {
  mockUseThemeStore.mockReturnValue({ theme: mockTheme })
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('Header', () => {
  it('renders the stock image and title', () => {
    const { getByText, UNSAFE_getByType } = render(<Header id="AAPL" />)
    const { Image } = require('react-native')
    
    expect(getByText('AAPL Stock History')).toBeTruthy()
    expect(UNSAFE_getByType(Image)).toBeTruthy()
  })

  it('uses the theme color for the text', () => {
    const { getByText } = render(<Header id="AAPL" />)
    const titleElement = getByText('AAPL Stock History')
    
    // Check if style contains the theme color
    const styles = Array.isArray(titleElement.props.style) 
      ? titleElement.props.style 
      : [titleElement.props.style]
    
    const hasThemeColor = styles.some(style => 
      style && typeof style === 'object' && style.color === mockTheme.text
    )
    
    expect(hasThemeColor).toBe(true)
  })

  it('sets the correct sharedTransitionTag on the image', () => {
    const { UNSAFE_getByType } = render(<Header id="AAPL" />)
    const { Image } = require('react-native')
    const image = UNSAFE_getByType(Image)
    
    expect(image.props.sharedTransitionTag).toBe('stock-AAPL')
  })

  it('renders the correct title for different stock symbols', () => {
    const { getByText } = render(<Header id="TSLA" />)
    expect(getByText('TSLA Stock History')).toBeTruthy()
  })
})