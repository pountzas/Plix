import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import type {
  PersistedMovieFile,
  PersistedTvFile,
} from "../components/props/PersistedData";
import type { MovieFile, TvFile } from "../components/props/types";

/**
 * Validate and clean MovieFile data for Firestore compatibility
 */
function validateMovieFile(movieFile: MovieFile): boolean {
  return !!(movieFile.tmdbId && movieFile.name && movieFile.fileName);
}

/**
 * Convert MovieFile to PersistedMovieFile with user metadata
 * Cleans undefined values for Firestore compatibility
 */
export function createPersistedMovieFile(
  movieFile: MovieFile,
  userId: string
): PersistedMovieFile {
  // Validate required fields
  if (!validateMovieFile(movieFile)) {
    throw new Error("Invalid movie file data: missing required fields");
  }

  // Clean the data by removing undefined values and blob URLs (videos stay local)
  const cleanData = Object.fromEntries(
    Object.entries(movieFile).filter(
      ([key, value]) => value !== undefined && key !== "ObjUrl" // Don't store blob URLs
    )
  );

  return {
    ...cleanData,
    userId,
    addedAt: new Date(),
    lastModified: new Date(),
  } as PersistedMovieFile;
}

/**
 * Validate and clean TvFile data for Firestore compatibility
 */
function validateTvFile(tvFile: TvFile): boolean {
  return !!(tvFile.tmdbId && tvFile.name && tvFile.fileName);
}

/**
 * Convert TvFile to PersistedTvFile with user metadata
 * Cleans undefined values for Firestore compatibility
 */
export function createPersistedTvFile(
  tvFile: TvFile,
  userId: string
): PersistedTvFile {
  // Validate required fields
  if (!validateTvFile(tvFile)) {
    throw new Error("Invalid TV file data: missing required fields");
  }

  // Clean the data by removing undefined values and blob URLs (videos stay local)
  const cleanData = Object.fromEntries(
    Object.entries(tvFile).filter(
      ([key, value]) => value !== undefined && key !== "ObjUrl" // Don't store blob URLs
    )
  );

  return {
    ...cleanData,
    userId,
    addedAt: new Date(),
    lastModified: new Date(),
  } as PersistedTvFile;
}

/**
 * Load user's movie collection from Firestore
 */
export async function loadUserMovies(
  userId: string
): Promise<PersistedMovieFile[]> {
  try {
    // console.log("Loading movies from Firestore for user:", userId);
    // console.log("Movies collection path:", `users/${userId}/movies`);

    const moviesRef = collection(db, "users", userId, "movies");
    // console.log("Movies collection reference created:", moviesRef.path);

    const querySnapshot = await getDocs(moviesRef);
    // console.log("Query snapshot received, document count:", querySnapshot.size);

    const movies: PersistedMovieFile[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Skip deleted movies
      if (data.deleted === true) {
        console.log("Skipping deleted movie:", doc.id);
        return;
      }

      movies.push({
        ...data,
        addedAt: data.addedAt?.toDate() || new Date(),
        lastModified: data.lastModified?.toDate() || new Date(),
      } as PersistedMovieFile);
    });

    // console.log(`Loaded ${movies.length} movies from Firestore`);
    return movies;
  } catch (error) {
    console.error("Error loading user movies from Firestore:", error);
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      code: (error as any)?.code || "Unknown code",
      name: error instanceof Error ? error.name : "Unknown error type",
    });
    // Don't throw error - return empty array so app can still function
    return [];
  }
}

/**
 * Load user's TV show collection from Firestore
 */
export async function loadUserTvShows(
  userId: string
): Promise<PersistedTvFile[]> {
  try {
    console.log("Loading TV shows from Firestore for user:", userId);
    const tvShowsRef = collection(db, "users", userId, "tvshows");
    const querySnapshot = await getDocs(tvShowsRef);

    const tvShows: PersistedTvFile[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Skip deleted TV shows
      if (data.deleted === true) {
        console.log("Skipping deleted TV show:", doc.id);
        return;
      }

      tvShows.push({
        ...data,
        addedAt: data.addedAt?.toDate() || new Date(),
        lastModified: data.lastModified?.toDate() || new Date(),
      } as PersistedTvFile);
    });

    return tvShows;
  } catch (error) {
    console.error("Error loading user TV shows from Firestore:", error);
    // Don't throw error - return empty array so app can still function
    return [];
  }
}

/**
 * Save a movie to user's collection in Firestore
 */
export async function saveMovieToUserCollection(
  movieFile: MovieFile,
  userId: string
): Promise<void> {
  try {
    const persistedMovie = createPersistedMovieFile(movieFile, userId);
    const movieRef = doc(
      db,
      "users",
      userId,
      "movies",
      movieFile.tmdbId.toString()
    );

    await setDoc(movieRef, {
      ...persistedMovie,
      addedAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving movie to collection:", error);
    throw new Error("Failed to save movie to collection");
  }
}

/**
 * Save a TV show to user's collection in Firestore
 */
export async function saveTvShowToUserCollection(
  tvFile: TvFile,
  userId: string
): Promise<void> {
  try {
    const persistedTvShow = createPersistedTvFile(tvFile, userId);
    const tvShowRef = doc(
      db,
      "users",
      userId,
      "tvshows",
      tvFile.tmdbId.toString()
    );

    await setDoc(tvShowRef, {
      ...persistedTvShow,
      addedAt: serverTimestamp(),
      lastModified: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving TV show to collection:", error);
    throw new Error("Failed to save TV show to collection");
  }
}

/**
 * Save multiple movies to user's collection in batch
 */
export async function saveMoviesBatchToUserCollection(
  movieFiles: MovieFile[],
  userId: string
): Promise<void> {
  try {
    // Filter and validate movies before batching
    const validMovies = movieFiles.filter((movieFile) => {
      try {
        validateMovieFile(movieFile);
        return true;
      } catch (error) {
        console.warn("Skipping invalid movie file:", movieFile.name, error);
        return false;
      }
    });

    if (validMovies.length === 0) {
      throw new Error("No valid movies to save");
    }

    console.log(
      `Saving ${validMovies.length} valid movies to Firestore (filtered ${
        movieFiles.length - validMovies.length
      } invalid)`
    );

    const batch = writeBatch(db);

    validMovies.forEach((movieFile) => {
      const persistedMovie = createPersistedMovieFile(movieFile, userId);
      const movieRef = doc(
        db,
        "users",
        userId,
        "movies",
        movieFile.tmdbId.toString()
      );

      batch.set(movieRef, {
        ...persistedMovie,
        addedAt: serverTimestamp(),
        lastModified: serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(`Successfully saved ${validMovies.length} movies to Firestore`);
  } catch (error) {
    console.error("Error saving movies batch to collection:", error);
    throw new Error("Failed to save movies batch to collection");
  }
}

/**
 * Save multiple TV shows to user's collection in batch
 */
export async function saveTvShowsBatchToUserCollection(
  tvFiles: TvFile[],
  userId: string
): Promise<void> {
  try {
    // Filter and validate TV shows before batching
    const validTvShows = tvFiles.filter((tvFile) => {
      try {
        validateTvFile(tvFile);
        return true;
      } catch (error) {
        console.warn("Skipping invalid TV file:", tvFile.name, error);
        return false;
      }
    });

    if (validTvShows.length === 0) {
      throw new Error("No valid TV shows to save");
    }

    console.log(
      `Saving ${validTvShows.length} valid TV shows to Firestore (filtered ${
        tvFiles.length - validTvShows.length
      } invalid)`
    );

    const batch = writeBatch(db);

    validTvShows.forEach((tvFile) => {
      const persistedTvShow = createPersistedTvFile(tvFile, userId);
      const tvShowRef = doc(
        db,
        "users",
        userId,
        "tvshows",
        tvFile.tmdbId.toString()
      );

      batch.set(tvShowRef, {
        ...persistedTvShow,
        addedAt: serverTimestamp(),
        lastModified: serverTimestamp(),
      });
    });

    await batch.commit();
    console.log(
      `Successfully saved ${validTvShows.length} TV shows to Firestore`
    );
  } catch (error) {
    console.error("Error saving TV shows batch to collection:", error);
    throw new Error("Failed to save TV shows batch to collection");
  }
}

/**
 * Remove a movie from user's collection
 */
export async function removeMovieFromUserCollection(
  tmdbId: number,
  userId: string
): Promise<void> {
  try {
    const movieRef = doc(db, "users", userId, "movies", tmdbId.toString());
    await updateDoc(movieRef, {
      deleted: true,
      lastModified: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error removing movie from collection:", error);
    throw new Error("Failed to remove movie from collection");
  }
}

/**
 * Remove a TV show from user's collection
 */
export async function removeTvShowFromUserCollection(
  tmdbId: number,
  userId: string
): Promise<void> {
  try {
    const tvShowRef = doc(db, "users", userId, "tvshows", tmdbId.toString());
    await updateDoc(tvShowRef, {
      deleted: true,
      lastModified: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error removing TV show from collection:", error);
    throw new Error("Failed to remove TV show from collection");
  }
}

/**
 * Check if a movie exists in user's collection
 */
export async function movieExistsInUserCollection(
  tmdbId: number,
  userId: string
): Promise<boolean> {
  try {
    const movieRef = doc(db, "users", userId, "movies", tmdbId.toString());
    const movieSnap = await getDoc(movieRef);
    return movieSnap.exists();
  } catch (error) {
    console.error("Error checking if movie exists:", error);
    return false;
  }
}

/**
 * Check if a TV show exists in user's collection
 */
export async function tvShowExistsInUserCollection(
  tmdbId: number,
  userId: string
): Promise<boolean> {
  try {
    const tvShowRef = doc(db, "users", userId, "tvshows", tmdbId.toString());
    const tvShowSnap = await getDoc(tvShowRef);
    return tvShowSnap.exists();
  } catch (error) {
    console.error("Error checking if TV show exists:", error);
    return false;
  }
}
