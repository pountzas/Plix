---
template_id: chore-doc
title: Documentation or repository chore
intent: Add or update documentation, configs, or project meta
input_format: doc_scope, target_files, repo_path
output_format: PR link with summary of changes
steps: |
  0. Verify current branch location and create feature branch if necessary: git branch --show-current, create chore/{task_id} if on dev (MANDATORY - before any work)
  1. Verify workspace location: cd "D:\c backup 4 10 25\code\4.Next\nonameapp"; pwd (PowerShell syntax)
  2. Identify scope and affected files
  3. Make changes with clear structure
  4. Validate formatting/linting
  5. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app is working and returns no errors (if applicable)
  6. Summarize changes and rationale
acceptance_criteria: |
  - Changes render correctly and pass lint
  - Clear rationale and scope included
timebox_minutes: 60
dependencies: []
version: 1.0.1
notes: Prefer smaller, focused diffs. CRITICAL - Create chore branch BEFORE any work begins. Never commit directly to dev. Always verify workspace directory location. ALWAYS use PowerShell for terminal commands. RIGHT BEFORE git add: Use MCP Chrome DevTools to verify app functionality and absence of errors (when applicable for runtime docs).
learning_tags: [docs, chore]
changelog:
  - "2025-10-17: Initial version."
  - "2025-10-19: Added branch verification at task start, MCP Chrome DevTools verification before git add, and mandatory PowerShell usage."
  - "2025-10-20: Add per-task metadata guidance (lane/locks) for concurrency."
---


## Concurrency guidance

When you instantiate this template, also create a per-task metadata file at `memory-bank/tasks/{task_id}.md` including:

```yaml
task_id: <id>
template_id: chore-doc
status: todo
lane: docs
locks: [] # files/dirs/resources requiring exclusive access
depends_on: []
branch: chore/<id>
timebox_minutes: 60
```

