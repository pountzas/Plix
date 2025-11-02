### Per-task metadata files

Each task has its own metadata file to enable conflict-free parallel execution and precise tracking.

Key concepts:
- **Task file**: `memory-bank/tasks/{task_id}.md`
- **Status**: `todo | in_progress | blocked | review | done | cancelled`
- **Lane**: Logical workstream (e.g., `frontend`, `backend`, `docs`, `infra`, `tests`). Used to detect conflicts.
- **Locks**: Fine-grained resources the task needs exclusive access to (files, directories, DB schemas, environment). Multiple tasks can run concurrently if their locks do not intersect.
- **Splits**: Automatic or manual breakdown into smaller child tasks when scope is large.

YAML frontmatter schema:

```yaml
task_id: small-feature::example-v1
title: Short task title
template_id: small-feature
status: todo
priority: medium
lane: frontend
locks: ["app/[locale]/dashboard/page.tsx", "components/layout/dashboard-layout.tsx"]
depends_on: []
created_at: 2025-10-20T00:00:00Z
created_by: cursor-ai
owner: unassigned
repo_path: D:\c backup 4 10 25\code\4.Next\nonameapp
branch: feat/example-v1
timebox_minutes: 60
acceptance_criteria:
  - Clear, binary acceptance #1
  - Clear, binary acceptance #2
evidence:
  - type: screenshot
    path: coverage/index.html
  - type: tests
    summary: Jest output attached
conflicts_with: [] # Derived field populated by the planner when locks intersect with another active task
children: [] # Optional sub-task ids created by splitting
notes: |
  Free-form notes and decisions.
```

Operational rules:
- Create/update the task file before starting work and when status changes.
- Only one task can hold a given lock at a time.
- If a task requires many locks, prefer splitting into smaller tasks with disjoint locks.
- The planner updates `conflicts_with` for visibility; humans may override with justification.

Planner behavior:
- During queueing, compare `locks` against other tasks in `todo|in_progress|review`.
- Allow parallel start when there is no intersection.
- If a conflict exists but tasks are in different lanes and locks are non-overlapping, proceed.

### How to run two tasks concurrently safely

1) Create two per-task files (e.g., `task-A.md`, `task-B.md`) with clear, minimal `locks` sets.
2) Ensure the `locks` sets are disjoint; if not, split one task to reduce overlap.
3) Set distinct `lane`s if they touch different workstreams.
4) Start `task-A` and `task-B` by setting `status: in_progress` only when no lock intersection exists.
5) If a conflict is detected, mark the blocked task `status: blocked` and populate `conflicts_with` until the lock holder completes.
6) Upon completion, free locks by setting `status: done` and update evidence.


