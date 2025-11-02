---

template_id: small-feature
title: Implement delete functionality for menu items with hover icons
intent: Add delete functionality to menu items with hover icons for better UX
input_format: feature_summary, acceptance_criteria, repo_path
output_format: PR link with screenshots and tests
steps: | 0. Verify current branch location and create feature branch: git branch --show-current, create feat/delete-menu-items-feature if on dev (MANDATORY - before any work)

1. Define scope and acceptance criteria - hover icons for delete functionality on menu items
2. Verify workspace location: cd "D:\c backup 4 10 25\code\4.Next\Plix"; pwd (PowerShell syntax)
3. Write failing tests (RED) for delete functionality
4. Implement minimal code to make tests pass (GREEN) - add hover icons and delete handlers
5. Refactor code while maintaining test coverage
6. Update docs/changelog and screenshots
7. Validate locally and in CI with full test coverage
8. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app is working and returns no errors
9. Write fresh memories to shared storage using memorySystem.writeFreshMemory() (MANDATORY)
10. Document any mistakes made during implementation (MANDATORY if any occurred)
11. Push feature branch and create PR targeting dev
    acceptance_criteria: |

- Delete icons appear on hover for menu items
- Clicking delete icon removes the menu item from both local state and Firebase
- Hover state provides visual feedback
- Deleted items don't reappear on page refresh or re-login
- Tests written first (TDD: RED -> GREEN -> REFACTOR)
- Unit tests for delete functionality (80%+ coverage)
- Integration tests for hover behavior and component interactions
- All tests passing locally and in CI
- Screenshots or recordings attached
  timebox_minutes: 120
  dependencies: []
  version: 1.0.0
  notes: Follow TDD cycle (RED->GREEN->REFACTOR). Keep scope tight to menu item deletion only. Write tests before implementation. CRITICAL - Create feature branch BEFORE any work begins. Never commit directly to dev. MANDATORY - Document any mistakes in progress.md with mistake_description, impact, correct_approach, and prevention_measures. Always verify workspace directory location. ALWAYS use PowerShell for terminal commands. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app functionality and absence of errors. MANDATORY - Write fresh memories to shared .memory/ storage using memorySystem.writeFreshMemory(taskId, content) before pushing.
  learning_tags: [feature, frontend, tdd, testing, ui, ux]
  changelog:
- "2025-11-02: Initial task creation for delete-menu-items-feature."

## Concurrency guidance

When you instantiate this template, also create a per-task metadata file at `memory-bank/tasks/{task_id}.md` including:

```yaml
task_id: delete-menu-items-feature
template_id: small-feature
status: completed
lane: frontend
locks: ["components/Menu.tsx", "stores/navigationStore.ts"]
depends_on: []
branch: feat/delete-menu-items-feature
timebox_minutes: 120
```
