import { create } from 'zustand'

interface MediaState {
  mediaItemActive: boolean
  homeMovieLoaded: boolean
  homeTvLoaded: boolean
  homeMusicLoaded: boolean
  castVisible: boolean
}

interface MediaActions {
  setMediaItemActive: (active: boolean) => void
  setHomeMovieLoaded: (loaded: boolean) => void
  setHomeTvLoaded: (loaded: boolean) => void
  setHomeMusicLoaded: (loaded: boolean) => void
  setCastVisible: (visible: boolean) => void
}

type MediaStore = MediaState & MediaActions

export const useMediaStore = create<MediaStore>((set) => ({
  // Initial state (matching Recoil defaults)
  mediaItemActive: false,
  homeMovieLoaded: false,
  homeTvLoaded: false,
  homeMusicLoaded: false,
  castVisible: false,

  // Actions
  setMediaItemActive: (active: boolean) => set({ mediaItemActive: active }),
  setHomeMovieLoaded: (loaded: boolean) => set({ homeMovieLoaded: loaded }),
  setHomeTvLoaded: (loaded: boolean) => set({ homeTvLoaded: loaded }),
  setHomeMusicLoaded: (loaded: boolean) => set({ homeMusicLoaded: loaded }),
  setCastVisible: (visible: boolean) => set({ castVisible: visible }),
}))
