import { create } from 'zustand'

interface NavigationState {
  homeMenuActive: boolean
  movieMenuActive: boolean
  tvMenuActive: boolean
}

interface NavigationActions {
  setHomeMenuActive: (active: boolean) => void
  setMovieMenuActive: (active: boolean) => void
  setTvMenuActive: (active: boolean) => void
  activateHomeMenu: () => void
  activateMovieMenu: () => void
  activateTvMenu: () => void
}

type NavigationStore = NavigationState & NavigationActions

export const useNavigationStore = create<NavigationStore>((set) => ({
  // Initial state (matching Recoil defaults)
  homeMenuActive: true,
  movieMenuActive: false,
  tvMenuActive: false,

  // Actions
  setHomeMenuActive: (active: boolean) => set({ homeMenuActive: active }),
  setMovieMenuActive: (active: boolean) => set({ movieMenuActive: active }),
  setTvMenuActive: (active: boolean) => set({ tvMenuActive: active }),

  activateHomeMenu: () => set({
    homeMenuActive: true,
    movieMenuActive: false,
    tvMenuActive: false
  }),

  activateMovieMenu: () => set({
    homeMenuActive: false,
    movieMenuActive: true,
    tvMenuActive: false
  }),

  activateTvMenu: () => set({
    homeMenuActive: false,
    movieMenuActive: false,
    tvMenuActive: true
  }),
}))
