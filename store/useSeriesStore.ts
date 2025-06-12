import { create } from 'zustand'

const defaultState = {
  visible: { open: true, close: true, low: false, high: false },
}

export const useSeriesStore = create<{
  visible: typeof defaultState.visible
  toggle: (key: keyof typeof defaultState.visible) => void
}>((set) => {
  return {
    ...defaultState,
    toggle: (key) =>
      set((state) => ({
        visible: { ...state.visible, [key]: !state.visible[key] },
      })),
  }
})
