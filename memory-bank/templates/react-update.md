---
template_id: react-update
title: Update React to Latest Version (19.x)
intent: Upgrade React from 17.0.2 to latest version for modern features and performance improvements
input_format: current React 17.0.2 setup, component usage patterns, dependencies
output_format: React 19.x compatible codebase with modern features
steps: |
  1. Research breaking changes between React 17 and latest version
  2. Check compatibility of all React-related dependencies
  3. Update React and React-DOM to latest versions in package.json
  4. Update React types if using TypeScript
  5. Test build and fix any compatibility issues
  6. Update React-related dependencies (react-icons, react-player, etc.)
  7. Test all components for functionality after update
  8. Look for opportunities to use new React 19 features
  9. Update documentation with React version change
  10. Monitor for any performance improvements or regressions
acceptance_criteria: |
  - React updated to latest stable version
  - All components render correctly
  - No breaking changes introduced
  - Build process works without errors
  - All existing functionality preserved
  - Dependencies compatible with new React version
timebox_minutes: 90
dependencies: [zustand-migration, typescript-migration]
version: 1.0.0
notes: Check React 19 features like Activity component, but don't force adoption. Focus on compatibility first. Test media player and state management thoroughly.
documentation: Use Context7 to research React 19 breaking changes and migration guide
thinking: Use sequential thinking to analyze dependency compatibility and plan the update sequence
learning_tags: [react, version-update, compatibility, performance]
changelog:
  - "2025-10-31: Initial template creation for React update"
