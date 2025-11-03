const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Rate limiting: TMDB allows ~50 requests per second, but we'll be conservative
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 250; // 250ms between requests (4 requests per second)

/**
 * Rate limiting function to prevent 429 errors
 */
function rateLimit(): Promise<void> {
  return new Promise((resolve) => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;

    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
      const delay = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      setTimeout(() => {
        lastRequestTime = Date.now();
        resolve();
      }, delay);
    } else {
      lastRequestTime = now;
      resolve();
    }
  });
}
export interface TmdbError {
  status_code: number;
  status_message: string;
  success: boolean;
}

export class ApiKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiKeyError";
  }
}

/**
 * Generic TMDB API call wrapper with error handling
 */
export async function tmdbApiCall(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<any> {
  // Apply rate limiting before making the request
  await rateLimit();

  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", TMDB_API_KEY || "");

  // Add additional params
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      if (response.status === 401) {
        const errorData: TmdbError = await response.json();

        // Check if it's an API key error
        if (
          errorData.status_code === 7 &&
          errorData.status_message.includes("Invalid API key")
        ) {
          throw new ApiKeyError(`TMDB API Error: ${errorData.status_message}`);
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (response.status === 429) {
        // Rate limit exceeded - this shouldn't happen with our rate limiting,
        // but handle it gracefully if it does
        throw new Error(
          "TMDB API rate limit exceeded. Please wait and try again."
        );
      }

      // Other errors
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Network or other errors
    console.error("TMDB API call failed:", error);
    throw error;
  }
}

/**
 * Search for movies
 */
export async function searchMovies(query: string): Promise<any> {
  return tmdbApiCall("/search/movie", {
    query,
    append_to_response: "videos,images",
  });
}

/**
 * Search for TV shows
 */
export async function searchTvShows(query: string): Promise<any> {
  return tmdbApiCall("/search/tv", { query });
}

/**
 * Get movie credits
 */
export async function getMovieCredits(movieId: number): Promise<any> {
  return tmdbApiCall(`/movie/${movieId}/credits`);
}

/**
 * Get TV show credits
 */
export async function getTvCredits(tvId: number): Promise<any> {
  return tmdbApiCall(`/tv/${tvId}/credits`);
}

/**
 * Get person details
 */
export async function getPersonDetails(personId: number): Promise<any> {
  return tmdbApiCall(`/person/${personId}`, {
    append_to_response: "images",
  });
}

/**
 * Get person credits (combined cast and crew)
 */
export async function getPersonCredits(personId: number): Promise<any> {
  return tmdbApiCall(`/person/${personId}/combined_credits`);
}
