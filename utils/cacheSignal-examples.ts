/**
 * Examples of using cacheSignal() utilities for HTTP requests
 *
 * This file demonstrates practical usage patterns for the cacheSignal API utilities.
 */

import {
  fetchWithCacheSignal,
  cachedGet,
  cachedTmdbSearch,
  cachedExternalApiCall,
  createApiClient,
  ApiError,
} from "./apiUtils";

/**
 * Example 1: Basic fetchWithCacheSignal usage
 * Demonstrates automatic request cleanup when cache expires
 */
export const exampleBasicFetch = async () => {
  try {
    const data = await fetchWithCacheSignal("https://api.example.com/data");
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`API Error ${error.status}: ${error.message}`);
    } else {
      console.error("Network error:", error);
    }
    throw error;
  }
};

/**
 * Example 2: Cached GET request
 * Shows how identical requests are automatically deduplicated
 */
export const exampleCachedGet = async () => {
  try {
    // Multiple calls to the same endpoint will be deduplicated
    const [data1, data2, data3] = await Promise.all([
      cachedGet("https://api.example.com/users"),
      cachedGet("https://api.example.com/users"),
      cachedGet("https://api.example.com/users"),
    ]);

    console.log(
      "All responses are identical:",
      data1 === data2 && data2 === data3
    );
    return data1;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Example 3: TMDB API integration with cacheSignal
 * Demonstrates real-world API usage with automatic cleanup
 */
export const exampleTmdbSearch = async (query: string) => {
  try {
    const results = await cachedTmdbSearch(query, "movie");
    console.log(`Found ${results.results?.length || 0} movies for "${query}"`);
    return results;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      console.error("TMDB API key error - please check configuration");
    } else {
      console.error("TMDB search error:", error);
    }
    throw error;
  }
};

/**
 * Example 4: External service integration
 * Shows how to integrate with third-party services using cacheSignal
 */
export const exampleExternalService = async () => {
  try {
    const weatherData = await cachedExternalApiCall(
      "https://api.weatherapi.com/v1",
      "/current.json",
      { key: "your-api-key", q: "London" }
    );

    console.log("Weather in London:", weatherData.current?.temp_c, "°C");
    return weatherData;
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
};

/**
 * Example 5: Custom API client usage
 * Demonstrates creating a typed API client with cacheSignal support
 */
export const exampleApiClient = async () => {
  const apiClient = createApiClient({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
  });

  try {
    // These requests will be cached and cleaned up automatically
    const [posts, users] = await Promise.all([
      apiClient.get("/posts"),
      apiClient.get("/users"),
    ]);

    console.log(`Fetched ${posts.length} posts and ${users.length} users`);
    return { posts, users };
  } catch (error) {
    console.error("API client error:", error);
    throw error;
  }
};

/**
 * Example 6: Error handling patterns
 * Shows comprehensive error handling with cacheSignal
 */
export const exampleErrorHandling = async () => {
  try {
    // This will fail with a 404
    await cachedGet("https://httpstat.us/404");
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(`Handled API error: ${error.status} ${error.statusText}`);
      console.log(`Request URL: ${error.url}`);

      // Handle specific error codes
      switch (error.status) {
        case 401:
          console.log("Authentication required");
          break;
        case 403:
          console.log("Access forbidden");
          break;
        case 404:
          console.log("Resource not found");
          break;
        case 429:
          console.log("Rate limit exceeded - try again later");
          break;
        case 500:
          console.log("Server error - try again later");
          break;
        default:
          console.log("Unexpected error occurred");
      }
    } else {
      console.log("Network or other error:", error);
    }
  }
};

/**
 * Example 7: Request cancellation demonstration
 * Shows how cacheSignal provides automatic cleanup
 */
export const exampleRequestCancellation = async () => {
  console.log(
    "Starting multiple requests that may be cancelled by cache expiration..."
  );

  try {
    // Simulate multiple API calls that could be cancelled
    const promises = Array.from({ length: 5 }, (_, i) =>
      cachedGet(`https://httpstat.us/200?delay=${1000 + i * 500}`)
    );

    const results = await Promise.all(promises);
    console.log(`All ${results.length} requests completed successfully`);
    return results;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request was cancelled (likely due to cache expiration)");
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

/**
 * Performance demonstration function
 * Shows the benefits of cacheSignal for repeated requests
 */
export const demonstrateCaching = async () => {
  console.log("Demonstrating cacheSignal caching benefits...");

  const startTime = Date.now();

  // Make the same request multiple times
  const requests = Array.from({ length: 10 }, () =>
    cachedGet("https://httpstat.us/200")
  );

  await Promise.all(requests);

  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`10 requests completed in ${duration}ms`);
  console.log("Note: Identical requests were deduplicated by cache()");

  return duration;
};
