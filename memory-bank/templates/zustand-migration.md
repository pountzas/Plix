---
template_id: zustand-migration
title: Migrate from Recoil to Zustand State Management
intent: Replace Recoil with Zustand for simpler, more predictable state management
input_format: current Recoil atoms and usage patterns, component state dependencies
output_format: Zustand stores replacing Recoil atoms with same functionality
steps: |
  1. Analyze current Recoil atom usage and state dependencies
  2. Install Zustand and remove Recoil dependencies
  3. Create Zustand stores to replace Recoil atoms (modalStore, mediaStore, uiStore)
  4. Migrate simple state atoms first (menuSizeState, modalState, etc.)
  5. Implement complex state management (mediaItemState, media data arrays)
  6. Update all components to use Zustand hooks instead of Recoil hooks
  7. Migrate state setters and getters with proper Zustand patterns
  8. Implement state persistence if needed (for user preferences)
  9. Remove all Recoil imports and dependencies
  10. Test all state-dependent functionality works correctly
  11. Update memory bank with Zustand implementation details
acceptance_criteria: |
  - All Recoil atoms replaced with Zustand stores
  - All useRecoilState calls replaced with useStore hooks
  - State updates work correctly across all components
  - No functionality broken during migration
  - Bundle size reduced (Zustand is smaller than Recoil)
  - State persistence works if implemented
  - DevTools integration available for debugging
timebox_minutes: 180
dependencies: [typescript-migration]
version: 1.0.0
notes: Group related state into logical stores. Use TypeScript interfaces for store types. Consider using Zustand middleware for persistence and devtools.
documentation: Use Context7 to research Zustand best practices and migration patterns from Recoil
thinking: Use sequential thinking to map Recoil atoms to Zustand stores and plan the migration order
learning_tags: [zustand, state-management, migration, react-hooks, typescript]
changelog:
  - "2025-10-31: Initial template creation for Zustand migration"
