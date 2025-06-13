import {create} from 'zustand'
import {Appearance} from 'react-native'
import {lightTheme, darkTheme, Theme} from '../theme/theme'

type State = {
  isDark: boolean
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<State>((set, get) => {
  const system = Appearance.getColorScheme() === 'dark'
  return {
    isDark: system,
    theme: system ? darkTheme : lightTheme,
    toggleTheme: () => {
      const isDark = !get().isDark
      set({isDark, theme: isDark ? darkTheme : lightTheme})
    }
  }
})
