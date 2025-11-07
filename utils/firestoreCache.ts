import type {
  PersistedMovieFile,
  PersistedTvFile,
} from "../components/props/PersistedData";

// Shared cache for Firestore reads to prevent excessive reads
export const firestoreCache = {
  movies: { data: null as PersistedMovieFile[] | null, timestamp: 0 },
  tvShows: { data: null as PersistedTvFile[] | null, timestamp: 0 },
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

// Clear Firestore cache (call when data is modified)
export const clearFirestoreCache = () => {
  firestoreCache.movies.data = null;
  firestoreCache.movies.timestamp = 0;
  firestoreCache.tvShows.data = null;
  firestoreCache.tvShows.timestamp = 0;
};
