# Cross-Branch Memory System

This directory stores fresh memories that are accessible across all branches, enabling knowledge transfer between concurrent development workstreams.

## Purpose

Previously, memories were stored in git-tracked files (`memory-bank/`) which meant fresh memories were only available on their branch. This system solves that by storing cross-branch accessible memories locally.

## Structure

```
cross-branch-memory/
├── task_{task_id}_fresh.json    # Fresh memory updates from completed tasks
├── learning_{date}.json         # Learning signals and mistake corrections
├── context_{session_id}.json     # Session context and state
└── exports/                     # Exported learning data for sharing
    └── learning_{date}_{project}.json
```

## How It Works

1. **Memory Writing**: When a task completes, fresh memories are written here
2. **Memory Reading**: Systems check here first for freshest memories, then fall back to git-tracked versions
3. **Priority**: Cross-branch memories take precedence over git-tracked versions
4. **Persistence**: Survives branch switches and git operations
5. **Cleanup**: Periodically merged back to `memory-bank/` during PR merges

## Configuration

This system is controlled by `../config.json`:

```json
{
  "cross_branch_memory": {
    "enabled": true,
    "storage_path": "./cross-branch-memory/",
    "auto_sync": true,
    "sync_interval_minutes": 30
  }
}
```

## Benefits

- ✅ Immediate access to fresh memories across branches
- ✅ No memory isolation between concurrent tasks
- ✅ Memory persistence across git operations
- ✅ Seamless knowledge transfer between workstreams
