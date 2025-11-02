---
template_id: tmdb-tv-integration
title: Implement TMDB TV Series API Integration
intent: Add complete TV series support using TMDB API to match movie functionality
input_format: current TMDB movie implementation, TvFiles data structure, Feed component
output_format: working TV series browsing, selection, and display functionality
steps: |
  1. Review TMDB TV API documentation and endpoints
  2. Create TV series data fetching functions in API routes
  3. Implement TV series search and discovery functionality
  4. Update Feed component to handle TV shows alongside movies
  5. Add TV-specific state management (tvMenuState, homeTvState)
  6. Create TvCard component for TV series display
  7. Update MediaItem component to handle TV series metadata
  8. Add TV series to header search functionality
  9. Test TV series display, selection, and media player integration
  10. Update memory bank with TV API implementation details
acceptance_criteria: |
  - TV series appear in Feed component when TV menu is selected
  - TV series can be clicked to open MediaItem view
  - TV metadata (title, overview, cast, crew) displays correctly
  - TV series included in header search results
  - Media player works with TV episode files
  - TV series state management works properly
timebox_minutes: 180
dependencies: [firebase-data-persistence]
version: 1.0.0
notes: Mirror movie implementation but adapt for TV-specific metadata like seasons, episodes, and series vs episode files.
documentation: Use Context7 to research TMDB TV API endpoints and TV series data structure
thinking: Use sequential thinking to analyze TV data requirements and plan component modifications
learning_tags: [tmdb-api, tv-series, api-integration, component-development]
changelog:
  - "2025-10-31: Initial template creation based on TODO analysis"
