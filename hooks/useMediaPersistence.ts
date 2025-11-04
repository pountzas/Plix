"use client";

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
  restoreMovieFileUrls,
  restoreTvShowFileUrls,
} from "../utils/dataPersistence";
import type { MovieFile, TvFile } from "../components/props/types";
import type {
  PersistedMovieFile,
  PersistedTvFile,
} from "../components/props/PersistedData";
import MovieFiles from "../components/props/MovieFiles";
import TvFiles from "../components/props/TvFiles";

// MovieFile and TvFile types are imported from types.ts above

// Cache for Firestore reads to prevent excessive reads
const firestoreCache = {
  movies: { data: null as PersistedMovieFile[] | null, timestamp: 0 },
  tvShows: { data: null as PersistedTvFile[] | null, timestamp: 0 },
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

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

    // Check if we have recent data and skip loading if data is fresh
    const now = Date.now();
    const hasFreshMovies =
      firestoreCache.movies.data &&
      now - firestoreCache.movies.timestamp < firestoreCache.CACHE_DURATION;
    const hasFreshTvShows =
      firestoreCache.tvShows.data &&
      now - firestoreCache.tvShows.timestamp < firestoreCache.CACHE_DURATION;

    if (hasFreshMovies && hasFreshTvShows) {
      console.log(
        "useMediaPersistence - Using cached data, skipping Firestore reads"
      );
      // Still need to restore file URLs and update state
      const loadCachedData = async () => {
        try {
          setIsLoadingMovies(true);
          setIsLoadingTvShows(true);

          // Restore file URLs from cached data
          const restoredMovies = await restoreMovieFileUrls(
            firestoreCache.movies.data!
          );
          const restoredTvShows = await restoreTvShowFileUrls(
            firestoreCache.tvShows.data!
          );

          setPersistedMovies(restoredMovies);
          setPersistedTvShows(restoredTvShows);

          // Update local arrays
          MovieFiles.length = 0;
          restoredMovies
            .filter((movie) => movie.ObjUrl)
            .forEach((movie) => MovieFiles.push(movie as MovieFile));

          TvFiles.length = 0;
          restoredTvShows
            .filter((tvShow) => tvShow.ObjUrl)
            .forEach((tvShow) => TvFiles.push(tvShow as TvFile));

          setIsLoadingMovies(false);
          setIsLoadingTvShows(false);
          setLastSynced(new Date());
        } catch (error) {
          console.error("Error loading cached data:", error);
          // Fall back to fresh load
          loadUserData();
        }
      };
      loadCachedData();
      return;
    }

    // Define loadUserData function outside of setTimeout for proper scoping
    const loadUserData = async () => {
      try {
        setPersistenceError(null);
        console.log("useMediaPersistence - Loading user data from Firestore");

        // Load movies (with caching)
        setIsLoadingMovies(true);
        console.log("Loading movies for user:", userId);
        let movies: PersistedMovieFile[];
        const now = Date.now();
        if (
          firestoreCache.movies.data &&
          now - firestoreCache.movies.timestamp < firestoreCache.CACHE_DURATION
        ) {
          movies = firestoreCache.movies.data;
          console.log("Using cached movies from Firestore:", movies.length);
        } else {
          movies = await loadUserMovies(userId);
          firestoreCache.movies.data = movies;
          firestoreCache.movies.timestamp = now;
          console.log("Loaded fresh movies from Firestore:", movies.length);
        }

        // Restore file URLs from IndexedDB
        const restoredMovies = await restoreMovieFileUrls(movies);
        const moviesWithFiles = restoredMovies.filter((movie) => movie.ObjUrl);
        console.log(
          `Restored ${moviesWithFiles.length} movies with files from IndexedDB`
        );

        setPersistedMovies(restoredMovies);
        // Also populate local arrays for backward compatibility
        // Only include movies that have been successfully restored with files
        MovieFiles.length = 0; // Clear existing
        restoredMovies
          .filter((movie) => movie.ObjUrl) // Only movies with restored files
          .forEach((movie) => MovieFiles.push(movie as MovieFile));
        setIsLoadingMovies(false);

        // Load TV shows (with caching)
        setIsLoadingTvShows(true);
        console.log("Loading TV shows for user:", userId);
        let tvShows: PersistedTvFile[];
        if (
          firestoreCache.tvShows.data &&
          now - firestoreCache.tvShows.timestamp < firestoreCache.CACHE_DURATION
        ) {
          tvShows = firestoreCache.tvShows.data;
          console.log("Using cached TV shows from Firestore:", tvShows.length);
        } else {
          tvShows = await loadUserTvShows(userId);
          firestoreCache.tvShows.data = tvShows;
          firestoreCache.tvShows.timestamp = now;
          console.log("Loaded fresh TV shows from Firestore:", tvShows.length);
        }

        // Restore file URLs from IndexedDB
        const restoredTvShows = await restoreTvShowFileUrls(tvShows);
        const tvShowsWithFiles = restoredTvShows.filter(
          (tvShow) => tvShow.ObjUrl
        );
        console.log(
          `Restored ${tvShowsWithFiles.length} TV shows with files from IndexedDB`
        );

        setPersistedTvShows(restoredTvShows);
        // Also populate local arrays for backward compatibility
        // Only include TV shows that have been successfully restored with files
        TvFiles.length = 0; // Clear existing
        restoredTvShows
          .filter((tvShow) => tvShow.ObjUrl) // Only TV shows with restored files
          .forEach((tvShow) => TvFiles.push(tvShow as TvFile));
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

    // Add a small delay to ensure authentication is fully established
    const timer = setTimeout(async () => {
      loadUserData();
    }, 1000); // Wait 1 second for auth to stabilize

    return () => clearTimeout(timer);
  }, [userId]);

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
        const persistedMoviesToAdd = await Promise.all(
          movieFiles.map((movie) => createPersistedMovieFile(movie, userId))
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

  // Save movies to collection with original files (for IndexedDB storage)
  const saveMoviesToCollectionWithFiles = useCallback(
    async (
      movieFileData: Array<{ movieFile: MovieFile; originalFile?: File }>
    ) => {
      if (!userId) {
        setPersistenceError("You must be logged in to save media");
        return false;
      }

      try {
        setIsSavingMovies(true);
        setPersistenceError(null);

        // Extract original files for IndexedDB storage
        const originalFiles = movieFileData
          .map(({ originalFile }) => originalFile)
          .filter((file): file is File => file !== undefined);

        // Save to Firestore (this will also trigger IndexedDB storage)
        await saveMoviesBatchToUserCollection(
          movieFileData.map(({ movieFile }) => movieFile),
          userId,
          originalFiles.length > 0 ? originalFiles : undefined
        );

        // Clear cache since data was modified
        clearFirestoreCache();

        setIsSavingMovies(false);
        setLastSynced(new Date());

        // Update local state with persisted data (will be loaded from Firestore on next refresh)
        // The batch save function handles creating the persisted objects

        return true;
      } catch (error) {
        console.error("Error saving movies with files:", error);
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
        const persistedTvShowsToAdd = await Promise.all(
          tvFiles.map((tvShow) => createPersistedTvFile(tvShow, userId))
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

  // Save TV shows to collection with original files (for IndexedDB storage)
  const saveTvShowsToCollectionWithFiles = useCallback(
    async (tvFileData: Array<{ tvFile: TvFile; originalFile?: File }>) => {
      if (!userId) {
        setPersistenceError("You must be logged in to save media");
        return false;
      }

      try {
        setIsSavingTvShows(true);
        setPersistenceError(null);

        // Extract original files for IndexedDB storage
        const originalTvFiles = tvFileData
          .map(({ originalFile }) => originalFile)
          .filter((file): file is File => file !== undefined);

        // Save to Firestore (this will also trigger IndexedDB storage)
        await saveTvShowsBatchToUserCollection(
          tvFileData.map(({ tvFile }) => tvFile),
          userId,
          originalTvFiles.length > 0 ? originalTvFiles : undefined
        );

        // Clear cache since data was modified
        clearFirestoreCache();

        setIsSavingTvShows(false);
        setLastSynced(new Date());

        // Update local state with persisted data (will be loaded from Firestore on next refresh)
        // The batch save function handles creating the persisted objects

        return true;
      } catch (error) {
        console.error("Error saving TV shows with files:", error);
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

  // Clear Firestore cache (call when data is modified)
  const clearFirestoreCache = useCallback(() => {
    firestoreCache.movies.data = null;
    firestoreCache.movies.timestamp = 0;
    firestoreCache.tvShows.data = null;
    firestoreCache.tvShows.timestamp = 0;
  }, []);

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
    saveMoviesToCollectionWithFiles,
    saveTvShowsToCollection,
    saveTvShowsToCollectionWithFiles,
    clearPersistenceError,
    clearFirestoreCache,

    // Computed state
    isLoading: isLoadingMovies || isLoadingTvShows,
    isSaving: isSavingMovies || isSavingTvShows,
    hasData: persistedMovies.length > 0 || persistedTvShows.length > 0,
  };
}
