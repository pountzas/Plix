// Persisted data structures for Firebase Firestore

export interface PersistedMovieFile {
  // Original MovieFile data
  name: string;
  tmdbId: number;
  adult: boolean;
  backdrop_path: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  tmdbPoster: string;
  tmdbTitle: string;
  tmdbOverview: string;
  tmdbReleaseDate: string;
  tmdbRating: number;
  tmdbGenre: string[];
  fileName: string;
  ObjUrl?: string; // Optional - populated when restored from IndexedDB
  folderPath: string;
  folderPath2: string;
  rootPath: string;

  // Persistence metadata
  userId: string;
  addedAt?: Date; // Set by serverTimestamp() when saving to Firestore
  lastModified?: Date; // Set by serverTimestamp() when saving to Firestore
  fileId?: string; // IndexedDB file reference for persistent file storage
}

export interface PersistedTvFile {
  // Original TvFile data
  name: string;
  seasonNumber?: number;
  episodeNumber?: number;
  episodeTitle?: string;
  tmdbId: number;
  adult?: boolean;
  backdrop_path: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  tmdbPoster: string;
  tmdbTitle: string;
  tmdbOverview: string;
  tmdbReleaseDate: string;
  tmdbRating: number;
  tmdbGenre: string[];
  fileName: string;
  ObjUrl?: string; // Optional - populated when restored from IndexedDB
  folderPath: string;
  folderPath2: string;
  rootPath: string;

  // Enhanced fields for file inventory
  relatedFiles?: string[]; // All related files (videos + subtitles) for this episode
  hasVideo?: boolean; // Whether this episode has video files
  hasSubtitles?: boolean; // Whether this episode has subtitle files

  // Persistence metadata
  userId: string;
  addedAt?: Date; // Set by serverTimestamp() when saving to Firestore
  lastModified?: Date; // Set by serverTimestamp() when saving to Firestore
  fileId?: string; // IndexedDB file reference for persistent file storage
}

export interface UserMediaCollection {
  movies: PersistedMovieFile[];
  tvShows: PersistedTvFile[];
  lastUpdated: Date;
}

export interface DataPersistenceState {
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
  lastSaved: Date | null;
}
