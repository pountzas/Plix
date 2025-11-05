"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useMediaStore } from "../stores/mediaStore";
import {
  saveMoviesBatchToUserCollection,
  saveTvShowsBatchToUserCollection,
  createPersistedMovieFile,
  createPersistedTvFile,
} from "../utils/dataPersistence";
import type { MovieFile, TvFile } from "../components/props/types";
import { clearFirestoreCache } from "../utils/firestoreCache";

/**
 * Hook for managing media data persistence with Firebase
 * Provides persistence functions - data loading is now handled globally by useMediaDataLoader
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

    // Computed state
    isLoading: isLoadingMovies || isLoadingTvShows,
    isSaving: isSavingMovies || isSavingTvShows,
    hasData: persistedMovies.length > 0 || persistedTvShows.length > 0,
  };
}
