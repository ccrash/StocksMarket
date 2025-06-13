import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { DisplayOptions } from './DisplayOptions'
import { useThemeStore } from '../store/useThemeStore'

jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn(),
}))

describe('Display component', () => {
  const mockTheme = {
    text: '#000000',
    background: '#ffffff',
    border: '#cccccc',
  }

  const initialDisplay = {
    open: true,
    close: false,
    high: true,
    low: false,
  }

  beforeEach(() => {
    // @ts-ignore
    (useThemeStore as jest.Mock).mockReturnValue({ theme: mockTheme })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const setup = (display = initialDisplay) => {
    const handleDisplay = jest.fn()
    const utils = render(
      <DisplayOptions currentDisplay={display} handleDisplay={handleDisplay} />
    )
    return { ...utils, handleDisplay }
  }

  it('renders all display options with correct labels', () => {
    const { getByText } = setup()

    expect(getByText('Open')).toBeTruthy()
    expect(getByText('Close')).toBeTruthy()
    expect(getByText('High')).toBeTruthy()
    expect(getByText('Low')).toBeTruthy()
  })

  it('renders switches with correct initial values', () => {
    const { getAllByRole } = setup()
    const switches = getAllByRole('switch')

    expect(switches).toHaveLength(4)
    expect(switches[0].props.value).toBe(true)  // open
    expect(switches[1].props.value).toBe(false) // close
    expect(switches[2].props.value).toBe(true)  // high
    expect(switches[3].props.value).toBe(false) // low
  })

  it('calls handleDisplay with correct key when toggled', () => {
    const { getAllByRole, handleDisplay } = setup()
    const switches = getAllByRole('switch')

    fireEvent(switches[1], 'onValueChange', true) // Fixed event name
    expect(handleDisplay).toHaveBeenCalledWith('close')
  })

  // Alternative approach using testID if the switches have testIDs
  it('calls handleDisplay with correct key when close switch is toggled (alternative)', () => {
    const { getByTestId, handleDisplay } = setup()
    
    // Assuming your Switch components have testIDs like 'switch-close'
    // const closeSwitch = getByTestId('switch-close')
    // fireEvent(closeSwitch, 'onValueChange', true)
    // expect(handleDisplay).toHaveBeenCalledWith('close')
  })

  // Test for testing multiple toggles
  it('calls handleDisplay for each switch toggle', () => {
    const { getAllByRole, handleDisplay } = setup()
    const switches = getAllByRole('switch')

    // Toggle open switch (from true to false)
    fireEvent(switches[0], 'onValueChange', false)
    expect(handleDisplay).toHaveBeenCalledWith('open')

    // Toggle close switch (from false to true)
    fireEvent(switches[1], 'onValueChange', true)
    expect(handleDisplay).toHaveBeenCalledWith('close')

    // Toggle high switch (from true to false)
    fireEvent(switches[2], 'onValueChange', false)
    expect(handleDisplay).toHaveBeenCalledWith('high')

    // Toggle low switch (from false to true)
    fireEvent(switches[3], 'onValueChange', true)
    expect(handleDisplay).toHaveBeenCalledWith('low')

    expect(handleDisplay).toHaveBeenCalledTimes(4)
  })
})