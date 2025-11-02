### Concurrency Planner

Purpose: Decide safe parallel execution using lanes and locks derived from per-task metadata files in `memory-bank/tasks/`.

Algorithm:
- Collect all tasks with `status` in `todo|in_progress|review`.
- Build a lock map: resource -> task_ids holding/claiming it.
- For a candidate task, allow `in_progress` start if its `locks` set has empty intersection with locks of tasks in `in_progress|review`.
- If intersecting, mark candidate `conflicts_with` and set `status` to `blocked` until resources free.
- Prefer starting tasks across different `lane`s to balance throughput.

Conflict rules:
- File-level locks trump directory-level locks.
- Directory lock implies all children.
- Environment locks (e.g., `dev-server`, `db-migration`) are global.

Outputs:
- Update each task file `conflicts_with` field.
- Produce a start order list grouped by lanes with maximal parallelism.


