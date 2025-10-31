import { create } from 'zustand'

interface VisualState {
  backgroundImageUrl: string
  imageVisible: boolean
  sliderValue: number
  backgroundOpacity: number
}

interface VisualActions {
  setBackgroundImageUrl: (url: string) => void
  setImageVisible: (visible: boolean) => void
  setSliderValue: (value: number) => void
  setBackgroundOpacity: (opacity: number) => void
}

type VisualStore = VisualState & VisualActions

export const useVisualStore = create<VisualStore>((set) => ({
  // Initial state (matching Recoil defaults)
  backgroundImageUrl: '',
  imageVisible: false,
  sliderValue: 25,
  backgroundOpacity: 2,

  // Actions
  setBackgroundImageUrl: (url: string) => set({ backgroundImageUrl: url }),
  setImageVisible: (visible: boolean) => set({ imageVisible: visible }),
  setSliderValue: (value: number) => set({ sliderValue: value }),
  setBackgroundOpacity: (opacity: number) => set({ backgroundOpacity: opacity }),
}))
