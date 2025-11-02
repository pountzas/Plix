---
template_id: tmdb-api-routes
title: Create TMDB API Routes for Media Data
intent: Build Next.js API routes for TMDB integration to replace direct API calls in components
input_format: current direct TMDB API calls in components, TMDB API key configuration
output_format: secure API routes with proper error handling and response caching
steps: |
  1. Analyze current TMDB API usage in components (MediaItem credits fetch)
  2. Create centralized TMDB API client utility
  3. Implement API routes for movie details, search, and discovery
  4. Add TV series API routes (seasons, episodes, details)
  5. Implement music/artists API routes if TMDB supports them
  6. Add proper error handling and rate limiting
  7. Implement response caching to reduce API calls
  8. Add API key validation and environment variable handling
  9. Create search API route for header search functionality
  10. Test all API routes with proper error scenarios
  11. Update memory bank with API implementation details
acceptance_criteria: |
  - All TMDB API calls moved from components to API routes
  - Proper error handling for API failures and rate limits
  - Response caching implemented to reduce redundant calls
  - API key properly secured in environment variables
  - Search endpoint supports multi-type queries (movies, TV, music)
  - Loading states handled properly in frontend
  - API routes follow RESTful conventions
timebox_minutes: 120
dependencies: []
version: 1.0.0
notes: Implement caching at API route level to avoid duplicate calls. Consider implementing request deduplication for identical searches.
documentation: Use Context7 to research Next.js API routes patterns and TMDB API integration best practices
thinking: Use sequential thinking to analyze API requirements and plan route structure
learning_tags: [api-routes, tmdb, caching, error-handling, security]
changelog:
  - "2025-10-31: Initial template creation for TMDB API routes"
