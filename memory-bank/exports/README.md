# Learning Data Exports

This directory contains exported learning data that can be shared between projects or archived for future reference.

## Export Format

Exports are JSON files containing:
- Task completion data and outcomes
- Learning signals from mistakes
- Template evolution history
- Performance metrics
- Mistake patterns and corrections

## File Naming Convention

```
learning_{project}_{date}_{version}.json
task_{task_id}_{completion_date}.json
metrics_{project}_{date_range}.json
```

## Usage

1. **Manual Export**: Copy files from this directory to share learnings
2. **Project Transfer**: Include exports when moving memory-bank to new projects
3. **Backup**: Archive exports for long-term learning analysis

## Configuration

Exports are controlled by `../config.json`:

```json
{
  "learning": {
    "export_enabled": true,
    "export_path": "./exports/",
    "auto_export": true,
    "export_frequency": "on_completion"
  }
}
```
