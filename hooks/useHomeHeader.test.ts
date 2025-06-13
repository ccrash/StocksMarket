import {renderHook} from '@testing-library/react-hooks'
import {useHomeHeader} from '../hooks/useHomeHeader'
import {useThemeStore} from '../store/useThemeStore'
import {useNavigation} from '@react-navigation/native'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn()
}))

jest.mock('../store/useThemeStore', () => ({
  useThemeStore: jest.fn()
}))

describe('useHomeHeader', () => {
  const mockSetOptions = jest.fn()
  const mockNavigate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useNavigation as unknown as jest.Mock).mockReturnValue({
      setOptions: mockSetOptions,
      navigate: mockNavigate
    })
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: {background: '#fff', text: '#000'},
      isDark: true,
      toggleTheme: jest.fn()
    })
  })

  it('sets navigation options with themed header and controls', () => {
    renderHook(() => useHomeHeader())

    expect(mockSetOptions).toHaveBeenCalledWith({
      headerStyle: {backgroundColor: '#fff'},
      headerLeft: expect.any(Function),
      headerRight: expect.any(Function)
    })
  })
})
