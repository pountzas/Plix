/**
 * API Utilities with React 19.2 cacheSignal() Implementation
 *
 * Provides utilities for HTTP requests with automatic cleanup when cache expires.
 * Useful for external service integrations requiring proper request cancellation.
 */

import { cache, cacheSignal } from "react";

/**
 * Configuration for API requests
 */
interface ApiConfig {
  baseURL?: string;
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

/**
 * Default API configuration
 */
const defaultConfig: Required<ApiConfig> = {
  baseURL: "",
  timeout: 10000,
  retries: 3,
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * Custom error class for API operations
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public url: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic fetch function with cacheSignal for automatic cleanup
 *
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param config - Optional configuration override
 * @returns Promise resolving to the JSON response
 */
export const fetchWithCacheSignal = cache(
  async (
    url: string,
    options: RequestInit = {},
    config: { timeout?: number } = {}
  ): Promise<any> => {
    // Get cacheSignal for automatic cleanup on cache expiration
    const cacheAbortSignal = cacheSignal();

    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutMs = config.timeout ?? defaultConfig.timeout;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // Combine all abort signals: user-provided, cacheSignal, and timeout
    const signals = [controller.signal];
    if (cacheAbortSignal) signals.push(cacheAbortSignal);
    if (options.signal) signals.push(options.signal);

    const combinedSignal = AbortSignal.any(signals);

    try {
      const response = await fetch(url, {
        ...options,
        signal: combinedSignal, // Use combined signal for all cancellation sources
        headers: {
          ...defaultConfig.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText,
          url
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          // Determine the cause of the abort
          if (controller.signal.aborted) {
            throw new Error(`Request timeout after ${timeoutMs}ms for ${url}`);
          } else if (cacheAbortSignal?.aborted) {
            throw new Error(
              `Request cancelled due to cache expiration for ${url}`
            );
          } else if (options.signal?.aborted) {
            throw new Error(`Request cancelled by user signal for ${url}`);
          } else {
            throw new Error(`Request cancelled for ${url}`);
          }
        }
        throw new Error(`Network error for ${url}: ${error.message}`);
      }

      throw new Error(`Unknown error for ${url}`);
    } finally {
      // Always clear the timeout to prevent memory leaks
      clearTimeout(timeoutId);
    }
  }
);

/**
 * Cached GET request with automatic cleanup
 *
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @returns Promise resolving to the response data
 */
export const cachedGet = cache(
  async (url: string, options: RequestInit = {}): Promise<any> => {
    return fetchWithCacheSignal(url, {
      ...options,
      method: "GET", // Override method to ensure it's always GET
    });
  }
);

/**
 * Cached POST request with automatic cleanup
 *
 * @param url - The URL to fetch
 * @param data - Data to send in the request body
 * @param options - Additional fetch options
 * @returns Promise resolving to the response data
 */
export const cachedPost = cache(
  async (url: string, data: any, options: RequestInit = {}): Promise<any> => {
    return fetchWithCacheSignal(url, {
      ...options,
      method: "POST", // Override method to ensure it's always POST
      body: JSON.stringify(data), // Override body to ensure data parameter is used
    });
  }
);

/**
 * Cached PUT request with automatic cleanup
 *
 * @param url - The URL to fetch
 * @param data - Data to send in the request body
 * @param options - Additional fetch options
 * @returns Promise resolving to the response data
 */
export const cachedPut = cache(
  async (url: string, data: any, options: RequestInit = {}): Promise<any> => {
    return fetchWithCacheSignal(url, {
      ...options,
      method: "PUT", // Override method to ensure it's always PUT
      body: JSON.stringify(data), // Override body to ensure data parameter is used
    });
  }
);

/**
 * Cached DELETE request with automatic cleanup
 *
 * @param url - The URL to fetch
 * @param options - Additional fetch options
 * @returns Promise resolving to the response data
 */
export const cachedDelete = cache(
  async (url: string, options: RequestInit = {}): Promise<any> => {
    return fetchWithCacheSignal(url, {
      ...options,
      method: "DELETE", // Override method to ensure it's always DELETE
    });
  }
);

/**
 * Generic API client with cacheSignal support
 */
export class ApiClient {
  private config: Required<ApiConfig>;

  constructor(config: ApiConfig = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Make a cached request with the configured base URL
   */
  private async request<T = any>(
    method: string,
    endpoint: string,
    data?: any,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
      ...options,
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      requestOptions.body = JSON.stringify(data);
    }

    return fetchWithCacheSignal(url, requestOptions, {
      timeout: this.config.timeout,
    });
  }

  /**
   * GET request
   */
  get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request("GET", endpoint, undefined, options);
  }

  /**
   * POST request
   */
  post<T = any>(
    endpoint: string,
    data: any,
    options?: RequestInit
  ): Promise<T> {
    return this.request("POST", endpoint, data, options);
  }

  /**
   * PUT request
   */
  put<T = any>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
    return this.request("PUT", endpoint, data, options);
  }

  /**
   * DELETE request
   */
  delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request("DELETE", endpoint, undefined, options);
  }
}

/**
 * Create a new API client instance
 */
export const createApiClient = (config: ApiConfig = {}) => {
  return new ApiClient(config);
};

/**
 * Example usage functions demonstrating cacheSignal patterns
 */

// Example: TMDB API client with cacheSignal
export const createTmdbApiClient = () => {
  return createApiClient({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};

// Example: Cached TMDB search with automatic cleanup
export const cachedTmdbSearch = cache(
  async (
    query: string,
    type: "movie" | "tv" | "person" = "movie"
  ): Promise<any> => {
    const client = createTmdbApiClient();
    return client.get(`/search/${type}?query=${encodeURIComponent(query)}`);
  }
);

// Example: Cached TMDB details fetch
export const cachedTmdbDetails = cache(
  async (id: number | string, type: "movie" | "tv" = "movie"): Promise<any> => {
    const client = createTmdbApiClient();
    return client.get(`/${type}/${id}`);
  }
);

// Example: External service integration with cacheSignal
export const cachedExternalApiCall = cache(
  async (
    serviceUrl: string,
    endpoint: string,
    params?: Record<string, string>
  ): Promise<any> => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    const url = `${serviceUrl}${endpoint}${queryString}`;

    return fetchWithCacheSignal(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Plix-Media-App/1.0",
      },
    });
  }
);
