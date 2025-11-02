---
template_id: nextjs-update
title: Update Next.js to Latest Version (15.x)
intent: Upgrade Next.js from 12.1.1 to latest version for modern features, performance, and security improvements
input_format: current Next.js 12 setup, Pages Router usage, configuration files
output_format: Next.js 15.x compatible application with modern features
steps: |
  1. Research breaking changes between Next.js 12 and 15
  2. Check compatibility of all Next.js-related dependencies
  3. Update Next.js to latest version in package.json
  4. Update related dependencies (next-auth, eslint-config-next, etc.)
  5. Update next.config.js for any configuration changes
  6. Test build process and fix compatibility issues
  7. Update Pages Router components for any API changes
  8. Test all routes and API endpoints
  9. Update environment variable handling if needed
  10. Consider App Router migration benefits (optional)
  11. Update documentation with Next.js version change
  12. Monitor performance improvements
acceptance_criteria: |
  - Next.js updated to latest stable version
  - All pages and API routes work correctly
  - Build process completes successfully
  - No breaking changes in existing functionality
  - Development server starts without errors
  - All dependencies compatible with new version
timebox_minutes: 120
dependencies: [react-update, typescript-migration]
version: 1.0.0
notes: Next.js 15 has significant changes from 12. Test thoroughly. Consider if App Router migration makes sense. Update next.config.js syntax if needed.
documentation: Use Context7 to research Next.js 15 breaking changes and migration from Pages Router
thinking: Use sequential thinking to analyze configuration changes and plan the update steps
learning_tags: [nextjs, version-update, pages-router, performance, migration]
changelog:
  - "2025-10-31: Initial template creation for Next.js update"
