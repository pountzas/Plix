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
import { firestoreCache, clearFirestoreCache } from "../utils/firestoreCache";

/**
 * Global hook for managing media data persistence with Firebase
 * This runs once at the app level to prevent duplicate data loading
 */
export function useMediaDataLoader() {
  const { data: session } = useSession();
  const {
    // State
    persistedMovies,
    persistedTvShows,
    isLoadingMovies,
    isLoadingTvShows,
    persistenceError,

    // Actions
    setPersistedMovies,
    setPersistedTvShows,
    setIsLoadingMovies,
    setIsLoadingTvShows,
    setPersistenceError,
    setLastSynced,
    resetPersistedData,
  } = useMediaStore();

  const userId = (session?.user as any)?.uid;
  const isAuthenticated = !!session?.user;

  // Load user data when authenticated (runs once globally)
  useEffect(() => {
    if (!userId || !isAuthenticated) {
      console.log(
        "useMediaDataLoader - Not authenticated or no userId, resetting data"
      );
      resetPersistedData();
      return;
    }

    console.log("useMediaDataLoader - Starting data load for user:", userId);

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
        "useMediaDataLoader - Using cached data, skipping Firestore reads"
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
        console.log("useMediaDataLoader - Loading user data from Firestore");

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
          "useMediaDataLoader - Data loading completed successfully"
        );
      } catch (error) {
        console.error("Error loading user data:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error(
          "useMediaDataLoader - Data loading failed:",
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


  return {
    clearFirestoreCache,
  };
}
