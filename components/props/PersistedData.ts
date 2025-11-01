// Persisted data structures for Firebase Firestore

export interface PersistedMovieFile {
  // Original MovieFile data
  id: number
  name: string
  tmdbId: number
  adult: boolean
  backdrop_path: string
  original_language: string
  popularity: number
  vote_average: number
  vote_count: number
  tmdbPoster: string
  tmdbTitle: string
  tmdbOverview: string
  tmdbReleaseDate: string
  tmdbRating: number
  tmdbGenre: string[]
  fileName: string
  ObjUrl: string
  folderPath: string
  folderPath2: string
  rootPath: string

  // Persistence metadata
  userId: string
  addedAt: Date
  lastModified: Date
}

export interface PersistedTvFile {
  // Original TvFile data
  id: number
  name: string
  episode?: any
  tmdbId: number
  adult?: boolean
  backdrop_path: string
  original_language: string
  popularity: number
  vote_average: number
  vote_count: number
  tmdbPoster: string
  tmdbTitle: string
  tmdbOverview: string
  tmdbReleaseDate: string
  tmdbRating: number
  tmdbGenre: string[]
  fileName: string
  ObjUrl: string
  folderPath: string
  folderPath2: string
  rootPath: string

  // Persistence metadata
  userId: string
  addedAt: Date
  lastModified: Date
}

export interface UserMediaCollection {
  movies: PersistedMovieFile[]
  tvShows: PersistedTvFile[]
  lastUpdated: Date
}

export interface DataPersistenceState {
  isLoading: boolean
  error: string | null
  isSaving: boolean
  lastSaved: Date | null
}
