import { create } from 'zustand'
import type { PersistedMovieFile, PersistedTvFile } from '../components/props/PersistedData'

interface MediaState {
  // UI state
  mediaItemActive: boolean
  homeMovieLoaded: boolean
  homeTvLoaded: boolean
  homeMusicLoaded: boolean
  castVisible: boolean

  // Persisted data (from Firestore, no blob URLs)
  persistedMovies: PersistedMovieFile[]
  persistedTvShows: PersistedTvFile[]

  // Session data (uploaded files with blob URLs)
  sessionMovies: any[]
  sessionTvShows: any[]

  // Persistence state
  isLoadingMovies: boolean
  isLoadingTvShows: boolean
  isSavingMovies: boolean
  isSavingTvShows: boolean
  persistenceError: string | null
  lastSynced: Date | null
}

interface MediaActions {
  // UI actions
  setMediaItemActive: (active: boolean) => void
  setHomeMovieLoaded: (loaded: boolean) => void
  setHomeTvLoaded: (loaded: boolean) => void
  setHomeMusicLoaded: (loaded: boolean) => void
  setCastVisible: (visible: boolean) => void

  // Persistence actions
  setPersistedMovies: (movies: PersistedMovieFile[]) => void
  setPersistedTvShows: (tvShows: PersistedTvFile[]) => void
  addPersistedMovie: (movie: PersistedMovieFile) => void
  addPersistedTvShow: (tvShow: PersistedTvFile) => void
  removePersistedMovie: (tmdbId: number) => void
  removePersistedTvShow: (tmdbId: number) => void

  // Session actions (for uploaded files with blob URLs)
  addSessionMovie: (movie: any) => void
  addSessionTvShow: (tvShow: any) => void
  getSessionMovie: (tmdbId: number) => any
  getSessionTvShow: (tmdbId: number) => any

  // Loading states
  setIsLoadingMovies: (loading: boolean) => void
  setIsLoadingTvShows: (loading: boolean) => void
  setIsSavingMovies: (saving: boolean) => void
  setIsSavingTvShows: (saving: boolean) => void

  // Error handling
  setPersistenceError: (error: string | null) => void
  setLastSynced: (date: Date | null) => void

  // Reset state (for logout, etc.)
  resetPersistedData: () => void
}

type MediaStore = MediaState & MediaActions

export const useMediaStore = create<MediaStore>((set) => ({
  // Initial state
  mediaItemActive: false,
  homeMovieLoaded: false,
  homeTvLoaded: false,
  homeMusicLoaded: false,
  castVisible: false,

  // Persisted data (from Firestore, no blob URLs)
  persistedMovies: [],
  persistedTvShows: [],

  // Session data (uploaded files with blob URLs)
  sessionMovies: [],
  sessionTvShows: [],

  // Persistence state
  isLoadingMovies: false,
  isLoadingTvShows: false,
  isSavingMovies: false,
  isSavingTvShows: false,
  persistenceError: null,
  lastSynced: null,

  // UI actions
  setMediaItemActive: (active: boolean) => set({ mediaItemActive: active }),
  setHomeMovieLoaded: (loaded: boolean) => set({ homeMovieLoaded: loaded }),
  setHomeTvLoaded: (loaded: boolean) => set({ homeTvLoaded: loaded }),
  setHomeMusicLoaded: (loaded: boolean) => set({ homeMusicLoaded: loaded }),
  setCastVisible: (visible: boolean) => set({ castVisible: visible }),

  // Persistence actions
  setPersistedMovies: (movies: PersistedMovieFile[]) => set({ persistedMovies: movies }),
  setPersistedTvShows: (tvShows: PersistedTvFile[]) => set({ persistedTvShows: tvShows }),

  addPersistedMovie: (movie: PersistedMovieFile) => set((state) => ({
    persistedMovies: [...state.persistedMovies.filter(m => m.tmdbId !== movie.tmdbId), movie]
  })),

  addPersistedTvShow: (tvShow: PersistedTvFile) => set((state) => ({
    persistedTvShows: [...state.persistedTvShows.filter(t => t.tmdbId !== tvShow.tmdbId), tvShow]
  })),

  removePersistedMovie: (tmdbId: number) => set((state) => ({
    persistedMovies: state.persistedMovies.filter(m => m.tmdbId !== tmdbId)
  })),

  removePersistedTvShow: (tmdbId: number) => set((state) => ({
    persistedTvShows: state.persistedTvShows.filter(t => t.tmdbId !== tmdbId)
  })),

  // Session actions
  addSessionMovie: (movie: any) => set((state) => ({
    sessionMovies: [...state.sessionMovies.filter(m => m.tmdbId !== movie.tmdbId), movie]
  })),

  addSessionTvShow: (tvShow: any) => set((state) => ({
    sessionTvShows: [...state.sessionTvShows.filter(t => t.tmdbId !== tvShow.tmdbId), tvShow]
  })),

  getSessionMovie: (tmdbId: number) => {
    const state = useMediaStore.getState();
    return state.sessionMovies.find(m => m.tmdbId === tmdbId);
  },

  getSessionTvShow: (tmdbId: number) => {
    const state = useMediaStore.getState();
    return state.sessionTvShows.find(t => t.tmdbId === tmdbId);
  },

  // Loading states
  setIsLoadingMovies: (loading: boolean) => set({ isLoadingMovies: loading }),
  setIsLoadingTvShows: (loading: boolean) => set({ isLoadingTvShows: loading }),
  setIsSavingMovies: (saving: boolean) => set({ isSavingMovies: saving }),
  setIsSavingTvShows: (saving: boolean) => set({ isSavingTvShows: saving }),

  // Error handling
  setPersistenceError: (error: string | null) => set({ persistenceError: error }),
  setLastSynced: (date: Date | null) => set({ lastSynced: date }),

  // Reset state
  resetPersistedData: () => set({
    persistedMovies: [],
    persistedTvShows: [],
    sessionMovies: [],
    sessionTvShows: [],
    persistenceError: null,
    lastSynced: null,
    isLoadingMovies: false,
    isLoadingTvShows: false,
    isSavingMovies: false,
    isSavingTvShows: false
  })
}))
