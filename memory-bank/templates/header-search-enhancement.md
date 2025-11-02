---
template_id: header-search-enhancement
title: Enhance Header Search with TMDB API Integration
intent: Replace local search with TMDB API-powered search that works across movies, TV shows, and future music
input_format: current Header.js local search, TMDB API structure, page context (home/movies/tv)
output_format: context-aware search that queries TMDB and displays results based on current page
steps: |
  1. Analyze current Header search implementation (local MovieFiles filtering)
  2. Design TMDB search API integration with proper error handling
  3. Implement search debouncing to avoid excessive API calls
  4. Add page context awareness (search movies when on movie page, TV when on TV page)
  5. Create unified search results display component
  6. Update SearchResults handling to work with TMDB data structure
  7. Add loading states and empty search handling
  8. Implement search history or recent searches (optional enhancement)
  9. Test search functionality across different pages and media types
  10. Update memory bank with search implementation details
acceptance_criteria: |
  - Search input triggers TMDB API calls with debouncing
  - Search results display properly formatted with posters and titles
  - Clicking search result opens correct MediaItem view
  - Search respects current page context (movies page searches movies)
  - Loading states shown during API calls
  - Empty search states handled gracefully
  - No local file dependencies for search functionality
timebox_minutes: 120
dependencies: [tmdb-tv-integration]
version: 1.0.0
notes: Replace SearchResults.js array manipulation with proper TMDB search results. Consider implementing search caching for performance.
documentation: Use Context7 to research TMDB search API and debouncing patterns
thinking: Use sequential thinking to analyze search requirements and plan the API integration
learning_tags: [search, tmdb-api, debouncing, user-experience, api-integration]
changelog:
  - "2025-10-31: Initial template creation based on current local search implementation"
