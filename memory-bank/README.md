# Portable Memory Bank System v2.0

This entire `memory-bank/` folder can be copied and pasted into any new project to instantly enable the same development practices, rules, and learning systems.

## Quick Start

### Option 1: Manual Setup
1. **Copy this folder** to your new project root
2. **Edit `config.json`** to enable/disable mechanisms for your project
3. **Update `.cursorrules`** in your project to reference this memory-bank
4. **Done!** All mechanisms are now active and configurable

### Option 2: Automated Setup (Recommended)
1. **Copy this folder** to your new project root
2. **Run the setup script**:
   - **Linux/Mac**: `./memory-bank/setup-new-project.sh`
   - **Windows**: `memory-bank/setup-new-project.bat`
3. **Edit `config.json`** to configure mechanisms
4. **Done!** Everything is ready to use

**What the setup script does:**
- 🧹 **Automatically cleans** project-specific data (tasks, progress, cross-branch memory)
- 📝 Creates `.cursorrules` file pointing to your memory-bank
- 📋 Updates the project name in `config.json`
- ✅ Provides next steps and configuration reminders

**Result:** Clean slate ready for your new project!

### What Gets Cleaned vs What Stays

**🧹 Automatically Removed (Project-Specific):**
- `activeContext.md` - Current project tasks (in memory-bank/)
- `progress.md` - Project progress history (in memory-bank/)
- `metrics.md` - Project metrics (in memory-bank/)
- `memory-bank/.cursorrules` - Incorrectly placed .cursorrules file
- `progress/` folder - Progress logs
- `tasks/*.md` (except templates) - Project task files
- `cross-branch-memory/exports/` - Cross-branch memory data
- `exports/*.json` - Exported learning data
- `imports/*.json` - Imported learning data

**✅ What Stays (Reusable):**
- `config.json` - Gets updated with new project name
- `rules/` - All rule files
- `mechanisms/` - Configurable mechanisms
- `templates/` - Task templates
- `taskTemplateSystem.md` - Core system docs
- `README.md` - This documentation
- Setup scripts - For future reuse

### .cursorrules File Location
**IMPORTANT:** The `.cursorrules` file is created in the **project root directory** (not inside memory-bank/), where Cursor IDE can automatically find and use it. The memory-bank folder contains configuration templates, but the active `.cursorrules` file belongs in the root.

## Directory Structure

```
memory-bank/
├── config.json                 # Main configuration - ENABLE/DISABLE mechanisms here
├── README.md                   # This file
├── taskTemplateSystem.md       # Core task management system
├── activeContext.md            # Current active tasks
├── progress.md                 # Task completion history
├── metrics.md                  # Performance metrics
├── planner.md                  # Task planning utilities
│
├── rules/                      # All rule files (.mdc format)
│   ├── test-driven-development.mdc
│   ├── commit-system.mdc
│   ├── git-workflow.mdc
│   └── ...
│
├── mechanisms/                 # Configurable development mechanisms
│   ├── test-driven-development/
│   │   └── config.json         # TDD-specific configuration
│   ├── commit-system/
│   │   └── config.json         # Commit system configuration
│   └── ...
│
├── templates/                  # Task templates
│   ├── small-feature.md
│   ├── refactor.md
│   └── ...
│
├── tasks/                      # Per-task metadata files
│   ├── _template.example.md
│   ├── small-feature-clerk-google-auth-v1.md
│   └── ...
│
├── progress/                   # Historical progress logs
│   ├── commit-strategy-2025-10.md
│   ├── learning-entries.md
│   └── ...
│
├── cross-branch-memory/        # Cross-branch knowledge sharing
│   ├── README.md
│   └── exports/
│
├── exports/                    # Learning data exports
│   └── README.md
│
└── imports/                    # Learning data imports
    └── README.md
```

## Configuration

Edit `config.json` to control what mechanisms are active:

```json
{
  "enabled_mechanisms": {
    "test_driven_development": true,     // Enable/disable TDD
    "commit_system": true,              // Enable/disable commit system
    "git_workflow": true,               // Enable/disable git workflow
    // ... other mechanisms
  },
  "learning": {
    "export_enabled": true,             // Allow exporting learning data
    "import_enabled": true              // Allow importing learning data
  }
}
```

### Common Project Configurations

**Full Development (Recommended):**
```json
{
  "enabled_mechanisms": {
    "test_driven_development": true,
    "commit_system": true,
    "git_workflow": true,
    "verification_and_push": true,
    "file_type_awareness": true,
    "mistake_documentation": true,
    "documentation": true
  }
}
```

**Lightweight/Prototype:**
```json
{
  "enabled_mechanisms": {
    "test_driven_development": false,
    "commit_system": true,
    "git_workflow": true,
    "verification_and_push": false
  }
}
```

**Documentation-Only Project:**
```json
{
  "enabled_mechanisms": {
    "file_type_awareness": true,
    "docs_via_context7": true
  }
}
```

## Available Mechanisms

### 🔬 Test Driven Development
- RED-GREEN-REFACTOR cycle enforcement
- Coverage requirements (80%+)
- Test organization structure
- **Config**: `mechanisms/test-driven-development/config.json`

### 📚 Documentation Generation
- Automated component documentation
- TypeScript interface extraction
- Usage examples and API reference
- Confluence-ready output format
- **Config**: `mechanisms/documentation/config.json`

### 📝 Commit System
- Conventional commit format
- Selective staging requirements
- Pre-commit verification
- **Config**: `mechanisms/commit-system/config.json`

### 🌿 Git Workflow
- Feature branch model
- PR requirements
- Branch protection
- **Config**: `mechanisms/git-workflow/config.json`

### ✅ Verification & Push
- Build/test/lint requirements
- CI/CD integration
- Quality gates
- **Config**: `mechanisms/verification-and-push/config.json`

### 📏 Commit Frequency
- Small, focused commits
- Logical commit units
- Maximum file/line limits

### 🚀 Dev Server Management
- Automatic port selection
- Process monitoring
- Health checks

### 📖 File Type Awareness
- Smart npm command execution
- Documentation vs code detection

### 🎯 Docs via Context7
- Authoritative documentation sources
- Versioned references

### 🧠 Mistake Documentation
- Learning from errors
- Prevention systems
- Continuous improvement

## Task System

The memory bank includes a complete task management system:

### Task Templates
- `small-feature.md` - For new features
- `refactor.md` - For code restructuring
- `quick-bugfix.md` - For urgent fixes
- `chore-doc.md` - For documentation tasks

### Task Execution
1. Tasks are instantiated from templates
2. Progress tracked in `progress.md`
3. Learning captured automatically
4. Metrics collected for improvement

## Learning & Evolution

### Exportable Learning
- Task completion data
- Mistake patterns and corrections
- Performance metrics
- Template improvements

### Cross-Project Knowledge
- Import learning from other projects
- Share improvements across teams
- Build institutional knowledge

### Continuous Improvement
- Templates evolve based on outcomes
- Rules updated from lessons learned
- Performance metrics drive changes

## Migration from Legacy System

If migrating from individual `.cursor/rules/` files:

1. This `memory-bank/` replaces all individual rule files
2. Update `.cursorrules` to reference this structure (see included `.cursorrules`)
3. Configure mechanisms in `config.json` instead of individual `alwaysApply` flags
4. Import any existing learning data via `imports/` directory

## Customization

### Adding New Mechanisms
1. Create `mechanisms/your-mechanism/` directory
2. Add `config.json` with mechanism settings
3. Add rule files to `rules/` if needed
4. Enable in main `config.json`

### Project-Specific Tuning
1. Edit `config.json` to match your project needs
2. Adjust mechanism configs for your workflow
3. Import relevant learning data from similar projects

## Support

This system is designed to be:
- **Self-contained** - Everything needed is in this folder
- **Portable** - Copy/paste to any project
- **Configurable** - Enable/disable features as needed
- **Evolving** - Learns and improves over time

For questions or contributions, check the learning data in `progress/` or create a task using the included templates.
