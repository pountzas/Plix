---
template_id: refactor
title: Targeted refactor with safety net
intent: Improve code structure without changing behavior
input_format: refactor_target, risks, test_plan, repo_path
output_format: PR link with before/after and tests
steps: |
  0. Verify current branch location and create feature branch if necessary: git branch --show-current, create chore/{task_id} if on dev (MANDATORY - before any work)
  1. Verify workspace location: cd "D:\c backup 4 10 25\code\4.Next\nonameapp"; pwd (PowerShell syntax)
  2. Capture baseline (tests, metrics, screenshots)
  3. Apply refactor in small, verifiable increments
  4. Maintain behavior parity with tests
  5. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app is working and returns no errors
  6. Document rationale and outcomes
acceptance_criteria: |
  - No behavior changes; tests pass
  - Clear before/after diff and rationale
timebox_minutes: 120
dependencies: []
version: 1.0.1
notes: Avoid scope creep; defer unrelated cleanups. CRITICAL - Create chore branch BEFORE any work begins. Never commit directly to dev. Always verify workspace directory location. ALWAYS use PowerShell for terminal commands. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app functionality and absence of errors.
learning_tags: [refactor]
changelog:
  - "2025-10-17: Initial version."
  - "2025-10-19: Added branch verification at task start, MCP Chrome DevTools verification before git add, and mandatory PowerShell usage."
  - "2025-10-20: Add per-task metadata guidance (lane/locks) for concurrency."
---


## Concurrency guidance

When you instantiate this template, also create a per-task metadata file at `memory-bank/tasks/{task_id}.md` including:

```yaml
task_id: <id>
template_id: refactor
status: todo
lane: frontend
locks: [] # files/dirs/resources requiring exclusive access
depends_on: []
branch: chore/<id>
timebox_minutes: 120
```

