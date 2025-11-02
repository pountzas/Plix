---
template_id: small-feature
title: Implement a small feature end-to-end
intent: Deliver a small, shippable user-facing feature with tests
input_format: feature_summary, acceptance_criteria, repo_path
output_format: PR link with screenshots and tests
steps: |
  0. Verify current branch location and create feature branch if necessary: git branch --show-current, create feat/{task_id} if on dev (MANDATORY - before any work)
  1. Define scope and acceptance criteria
  2. Verify workspace location: cd "D:\c backup 4 10 25\code\4.Next\nonameapp"; pwd (PowerShell syntax)
  3. Write failing tests (RED) for all functionality
  4. Implement minimal code to make tests pass (GREEN)
  5. Refactor code while maintaining test coverage
  6. Update docs/changelog and screenshots
  7. Validate locally and in CI with full test coverage
  8. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app is working and returns no errors
  9. Write fresh memories to shared storage using memorySystem.writeFreshMemory() (MANDATORY)
  10. Document any mistakes made during implementation (MANDATORY if any occurred)
  11. Push feature branch and create PR targeting dev
acceptance_criteria: |
  - Feature behavior matches acceptance criteria
  - Tests written first (TDD: RED -> GREEN -> REFACTOR)
  - Unit tests for all public functions (80%+ coverage)
  - Integration tests for API endpoints and components
  - All tests passing locally and in CI
  - Screenshots or recordings attached
timebox_minutes: 120
dependencies: []
version: 1.1.1
notes: Follow TDD cycle (RED->GREEN->REFACTOR). Keep scope tight; avoid refactors unless essential. Write tests before implementation. CRITICAL - Create feature branch BEFORE any work begins. Never commit directly to dev. MANDATORY - Document any mistakes in progress.md with mistake_description, impact, correct_approach, and prevention_measures. Always verify workspace directory location. ALWAYS use PowerShell for terminal commands. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app functionality and absence of errors. MANDATORY - Write fresh memories to shared .memory/ storage using memorySystem.writeFreshMemory(taskId, content) before pushing.
learning_tags: [feature, frontend, tdd, testing]
changelog:
  - "2025-10-17: Initial version."
  - "2025-10-17: Added TDD requirements and test coverage criteria."
  - "2025-10-18: Added mandatory git workflow requirements - feature branch creation before any work."
  - "2025-10-18: Added mistake documentation requirements and workspace directory verification."
  - "2025-10-19: Added branch verification at task start, MCP Chrome DevTools verification before git add, and mandatory PowerShell usage."
  - "2025-10-20: Added cross-branch memory system integration with mandatory fresh memory writing to .memory/ storage."
  - "2025-10-20: Add per-task metadata guidance (lane/locks) for concurrency."
---


## Concurrency guidance

When you instantiate this template, also create a per-task metadata file at `memory-bank/tasks/{task_id}.md` including:

```yaml
task_id: <id>
template_id: small-feature
status: todo
lane: frontend
locks: [] # files/dirs/resources requiring exclusive access
depends_on: []
branch: feat/<id>
timebox_minutes: 120
```

