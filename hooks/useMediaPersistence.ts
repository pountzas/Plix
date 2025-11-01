import { useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useMediaStore } from "../stores/mediaStore";
import {
  loadUserMovies,
  loadUserTvShows,
  saveMoviesBatchToUserCollection,
  saveTvShowsBatchToUserCollection,
  createPersistedMovieFile,
  createPersistedTvFile,
} from "../utils/dataPersistence";
import MovieFiles from "../components/props/MovieFiles";
import TvFiles from "../components/props/TvFiles";

// Local type definitions for media files
interface MovieFile {
  id: number;
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
  ObjUrl: string;
  folderPath: string;
  folderPath2: string;
  rootPath: string;
}

interface TvFile {
  id: number;
  name: string;
  episode?: any;
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
  ObjUrl: string;
  folderPath: string;
  folderPath2: string;
  rootPath: string;
}

/**
 * Hook for managing media data persistence with Firebase
 * Handles loading user data on authentication and provides persistence functions
 */
export function useMediaPersistence() {
  const { data: session } = useSession();
  const {
    // State
    persistedMovies,
    persistedTvShows,
    isLoadingMovies,
    isLoadingTvShows,
    isSavingMovies,
    isSavingTvShows,
    persistenceError,
    lastSynced,

    // Actions
    setPersistedMovies,
    setPersistedTvShows,
    setIsLoadingMovies,
    setIsLoadingTvShows,
    setIsSavingMovies,
    setIsSavingTvShows,
    setPersistenceError,
    setLastSynced,
    resetPersistedData,
  } = useMediaStore();

  const userId = (session?.user as any)?.uid;
  const isAuthenticated = !!session?.user;

  console.log("useMediaPersistence - Session status:", {
    isAuthenticated,
    userId,
    sessionUser: session?.user,
  });

  // Load user data when authenticated
  useEffect(() => {
    if (!userId || !isAuthenticated) {
      console.log(
        "useMediaPersistence - Not authenticated or no userId, resetting data"
      );
      resetPersistedData();
      return;
    }

    console.log("useMediaPersistence - Starting data load for user:", userId);

    // Add a small delay to ensure authentication is fully established
    const timer = setTimeout(async () => {
      const loadUserData = async () => {
        try {
          setPersistenceError(null);
          console.log("useMediaPersistence - Loading user data from Firestore");

          // Load movies
          setIsLoadingMovies(true);
          console.log("Loading movies for user:", userId);
          const movies = await loadUserMovies(userId);
          console.log("Loaded movies:", movies.length);
          setPersistedMovies(movies);
          // Also populate local arrays for backward compatibility
          MovieFiles.length = 0; // Clear existing
          movies.forEach((movie) => MovieFiles.push(movie));
          setIsLoadingMovies(false);

          // Load TV shows
          setIsLoadingTvShows(true);
          console.log("Loading TV shows for user:", userId);
          const tvShows = await loadUserTvShows(userId);
          console.log("Loaded TV shows:", tvShows.length);
          setPersistedTvShows(tvShows);
          // Also populate local arrays for backward compatibility
          TvFiles.length = 0; // Clear existing
          tvShows.forEach((tvShow) => TvFiles.push(tvShow));
          setIsLoadingTvShows(false);

          setLastSynced(new Date());
          console.log(
            "useMediaPersistence - Data loading completed successfully"
          );
        } catch (error) {
          console.error("Error loading user data:", error);
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          console.error(
            "useMediaPersistence - Data loading failed:",
            errorMessage
          );
          setPersistenceError(
            `Failed to load your media collection: ${errorMessage}. Your data will be saved locally.`
          );
          setIsLoadingMovies(false);
          setIsLoadingTvShows(false);
        }
      };

      loadUserData();
    }, 1000); // Wait 1 second for auth to stabilize

    return () => clearTimeout(timer);
  }, [userId, resetPersistedData]);

  // Save movies to collection
  const saveMoviesToCollection = useCallback(
    async (movieFiles: MovieFile[]) => {
      if (!userId) {
        setPersistenceError("You must be logged in to save media");
        return false;
      }

      try {
        setIsSavingMovies(true);
        setPersistenceError(null);

        await saveMoviesBatchToUserCollection(movieFiles, userId);
        setIsSavingMovies(false);
        setLastSynced(new Date());

        // Update local state
        const persistedMoviesToAdd = movieFiles.map((movie) =>
          createPersistedMovieFile(movie, userId)
        );
        persistedMoviesToAdd.forEach((movie) => {
          setPersistedMovies([...persistedMovies, movie]);
        });

        return true;
      } catch (error) {
        console.error("Error saving movies:", error);
        setPersistenceError("Failed to save movies to your collection");
        setIsSavingMovies(false);
        return false;
      }
    },
    [
      userId,
      setIsSavingMovies,
      setPersistenceError,
      setLastSynced,
      persistedMovies,
      setPersistedMovies,
    ]
  );

  // Save TV shows to collection
  const saveTvShowsToCollection = useCallback(
    async (tvFiles: TvFile[]) => {
      if (!userId) {
        setPersistenceError("You must be logged in to save media");
        return false;
      }

      try {
        setIsSavingTvShows(true);
        setPersistenceError(null);

        await saveTvShowsBatchToUserCollection(tvFiles, userId);
        setIsSavingTvShows(false);
        setLastSynced(new Date());

        // Update local state
        const persistedTvShowsToAdd = tvFiles.map((tvShow) =>
          createPersistedTvFile(tvShow, userId)
        );
        persistedTvShowsToAdd.forEach((tvShow) => {
          setPersistedTvShows([...persistedTvShows, tvShow]);
        });

        return true;
      } catch (error) {
        console.error("Error saving TV shows:", error);
        setPersistenceError("Failed to save TV shows to your collection");
        setIsSavingTvShows(false);
        return false;
      }
    },
    [
      userId,
      setIsSavingTvShows,
      setPersistenceError,
      setLastSynced,
      persistedTvShows,
      setPersistedTvShows,
    ]
  );

  // Clear persistence error
  const clearPersistenceError = useCallback(() => {
    setPersistenceError(null);
  }, [setPersistenceError]);

  return {
    // State
    persistedMovies,
    persistedTvShows,
    isLoadingMovies,
    isLoadingTvShows,
    isSavingMovies,
    isSavingTvShows,
    persistenceError,
    lastSynced,
    isAuthenticated: !!userId,

    // Actions
    saveMoviesToCollection,
    saveTvShowsToCollection,
    clearPersistenceError,

    // Computed state
    isLoading: isLoadingMovies || isLoadingTvShows,
    isSaving: isSavingMovies || isSavingTvShows,
    hasData: persistedMovies.length > 0 || persistedTvShows.length > 0,
  };
}
