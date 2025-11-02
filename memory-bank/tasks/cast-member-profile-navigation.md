---
template_id: small-feature
title: Implement cast member profile navigation
intent: Add clickable cast member names that navigate to person profile pages
input_format: cast_member_data, profile_page_route, navigation_flow
output_format: PR link with navigation demo and cast profile pages
steps: |
  0. Verify current branch location and create feature branch: git branch --show-current, create feat/cast-member-profile-navigation if on dev (MANDATORY - before any work)
  1. Analyze current cast display implementation in MediaItem component
  2. Design person profile page structure and routing (/person/[id])
  3. Create PersonProfile page component with TMDB person details
  4. Update cast display to make names clickable with proper navigation
  5. Implement TMDB API calls for person details and filmography
  6. Add loading states and error handling for profile pages
  7. Test navigation flow from media details to person profiles
  8. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify navigation works
  9. Write fresh memories to shared storage using memorySystem.writeFreshMemory() (MANDATORY)
  10. Document any mistakes made during implementation (MANDATORY if any occurred)
  11. Push feature branch and create PR targeting dev
acceptance_criteria: |
  - Cast member names are clickable in media detail pages
  - Clicking cast names navigates to /person/[tmdbId] profile pages
  - Person profile pages display biography, photos, and filmography
  - Proper loading states and error handling
  - Responsive design for profile pages
  - Navigation works from movie/TV detail pages to person profiles
  - Tests written first (TDD: RED -> GREEN -> REFACTOR)
  - Unit tests for navigation and API calls (80%+ coverage)
  - Integration tests for cast clicking and profile loading
  - All tests passing locally and in CI
  - Screenshots or recordings of navigation flow
timebox_minutes: 120
dependencies: []
version: 1.0.0
notes: Follow TDD cycle (RED->GREEN->REFACTOR). Focus on TMDB person API integration. Create proper routing for /person/[id] pages. Ensure backward compatibility with existing cast display. CRITICAL - Create feature branch BEFORE any work begins. Never commit directly to dev. MANDATORY - Document any mistakes in progress.md with mistake_description, impact, correct_approach, and prevention_measures. Always verify workspace directory location. ALWAYS use PowerShell for terminal commands. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify navigation functionality. MANDATORY - Write fresh memories to shared .memory/ storage using memorySystem.writeFreshMemory(taskId, content) before pushing.
learning_tags: [feature, frontend, navigation, tmdb-api, routing, ui]
changelog:
  - "2025-11-02: Initial task creation for cast-member-profile-navigation."

## Concurrency guidance

When you instantiate this template, also create a per-task metadata file at `memory-bank/tasks/{task_id}.md` including:

```yaml
task_id: cast-member-profile-navigation
template_id: small-feature
status: in_progress
lane: frontend
locks: ["components/MediaItem.tsx", "app/person/", "utils/tmdbApi.ts"]
depends_on: []
branch: feat/cast-member-profile-navigation
timebox_minutes: 120
```
