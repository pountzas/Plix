### Per-task metadata template

Purpose: Define the per-task metadata file stored at `memory-bank/tasks/{task_id}.md` to enable conflict-free parallel execution via lanes and locks.

YAML frontmatter schema:

```yaml
task_id: <required>
title: <short title>
template_id: <small-feature|refactor|quick-bugfix|chore-doc|...>
status: todo # todo | in_progress | blocked | review | done | cancelled
priority: medium # low | medium | high | urgent
lane: frontend # frontend | backend | docs | infra | tests | other
locks: [] # list of files/dirs/resources requiring exclusive access
depends_on: [] # list of task_ids
created_at: 2025-10-20T00:00:00Z
created_by: cursor-ai
owner: unassigned
repo_path: D:\c backup 4 10 25\code\4.Next\nonameapp
branch: feat/<task_id>
timebox_minutes: 60
acceptance_criteria:
  - Binary acceptance #1
  - Binary acceptance #2
evidence: [] # structured evidence references (screenshots, test outputs, links)
conflicts_with: [] # derived by planner based on lock intersections with active tasks
children: [] # optional subtask ids when split
notes: |
  Free-form notes and decisions
```

Operational rules:
- Always create/update this file when status changes.
- No two tasks may hold the same lock concurrently.
- Prefer splitting tasks to reduce lock surface area and enable parallelism.
- The planner populates `conflicts_with` and may auto-block tasks until locks free.


