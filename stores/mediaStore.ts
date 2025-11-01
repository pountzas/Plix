import { create } from 'zustand'
import type { PersistedMovieFile, PersistedTvFile } from '../components/props/PersistedData'
import type MovieFile from '../components/props/MovieFiles'
import type TvFile from '../components/props/TvFiles'

interface MediaState {
  // UI state
  mediaItemActive: boolean
  homeMovieLoaded: boolean
  homeTvLoaded: boolean
  homeMusicLoaded: boolean
  castVisible: boolean

  // Persisted data
  persistedMovies: PersistedMovieFile[]
  persistedTvShows: PersistedTvFile[]

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

export const useMediaStore = create<MediaStore>((set, get) => ({
  // Initial state
  mediaItemActive: false,
  homeMovieLoaded: false,
  homeTvLoaded: false,
  homeMusicLoaded: false,
  castVisible: false,

  // Persisted data
  persistedMovies: [],
  persistedTvShows: [],

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
    persistenceError: null,
    lastSynced: null,
    isLoadingMovies: false,
    isLoadingTvShows: false,
    isSavingMovies: false,
    isSavingTvShows: false
  })
}))
