# Learning Data Imports

This directory is where you place learning data from other projects or previous sessions to import into this memory bank.

## Import Format

Place JSON files here containing:
- Exported learning data from other memory-bank instances
- Task completion histories
- Mistake corrections and patterns
- Template evolution data

## File Naming Convention

Same as exports:
```
learning_{source_project}_{date}_{version}.json
task_{task_id}_{completion_date}.json
metrics_{source_project}_{date_range}.json
```

## Usage

1. **Copy Files**: Place exported JSON files in this directory
2. **Automatic Import**: Configure auto-import in config.json
3. **Manual Import**: Trigger import process manually
4. **Validation**: Imported data is validated before integration

## Configuration

Imports are controlled by `../config.json`:

```json
{
  "learning": {
    "import_enabled": true,
    "import_sources": ["./imports/"],
    "auto_import": true,
    "import_validation": true
  }
}
```

## Safety

- Imported data is validated before integration
- Conflicts are resolved with user confirmation
- Original data remains unchanged during import process
