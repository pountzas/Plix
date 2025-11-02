---
template_id: quick-bugfix
title: Fix specific failing test
intent: Resolve one failing test with a reproducible stack trace
input_format: failing_test_name, failing_stack, repo_path
output_format: patch file or PR link
steps: |
  0. Verify current branch location and create feature branch if necessary: git branch --show-current, create fix/{task_id} if on dev (MANDATORY - before any work)
  1. Verify workspace location: cd "D:\c backup 4 10 25\code\4.Next\nonameapp"; pwd (PowerShell syntax)
  2. Reproduce the failure locally
  3. Identify minimal failing commit/line
  4. Implement fix with regression test
  5. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app is working and returns no errors
  6. Validate fix (tests + CI)
acceptance_criteria: |
  - All tests pass locally
  - CI passes or unrelated failure documented
  - PR created with fix and test reference
timebox_minutes: 90
dependencies: []
version: 1.0.2
notes: Keep changes minimal and test-driven. CRITICAL - Create fix branch BEFORE any work begins. Never commit directly to dev. Always verify workspace directory location. ALWAYS use PowerShell for terminal commands. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app functionality and absence of errors.
learning_tags: [bugfix, test]
changelog:
  - "2025-10-17: Clarified acceptance criteria and notes."
  - "2025-10-19: Added branch verification at task start, MCP Chrome DevTools verification before git add, and mandatory PowerShell usage."
  - "2025-10-20: Add per-task metadata guidance (lane/locks) for concurrency."
---


## Concurrency guidance

When you instantiate this template, also create a per-task metadata file at `memory-bank/tasks/{task_id}.md` including:

```yaml
task_id: <id>
template_id: quick-bugfix
status: todo
lane: tests
locks: [] # files/dirs/resources requiring exclusive access
depends_on: []
branch: fix/<id>
timebox_minutes: 90
```

