@echo off
REM Memory Bank Setup Script for New Projects (Windows)
REM Copy this script to your new project and run it

echo 🚀 Setting up Memory Bank for new project...

REM Clean project-specific data
echo 🧹 Cleaning project-specific data...
if exist "memory-bank\activeContext.md" del memory-bank\activeContext.md
if exist "memory-bank\progress.md" del memory-bank\progress.md
if exist "memory-bank\metrics.md" del memory-bank\metrics.md
if exist "memory-bank\.cursorrules" del memory-bank\.cursorrules
if exist "progress" rmdir /s /q progress
if exist "cross-branch-memory\exports" rmdir /s /q cross-branch-memory\exports
if exist "exports\*.json" del exports\*.json
if exist "imports\*.json" del imports\*.json
if exist "figma-specifications" rmdir /s /q figma-specifications
if not exist "cross-branch-memory\exports" mkdir cross-branch-memory\exports

REM Keep template task files but remove project-specific tasks
echo 📋 Cleaning task files...
for %%f in (tasks\*.md) do (
    if not "%%~nf%%~xf"=="README.md" (
        if not "%%~nf%%~xf"=="_template.example.md" (
            del "%%f"
        )
    )
)

REM Create .cursorrules if it doesn't exist
if not exist ".cursorrules" (
    echo 📝 Creating .cursorrules...
    (
        echo {
        echo   "version": "2.0.0",
        echo   "description": "Memory Bank Integration - Rules loaded from memory-bank/config.json",
        echo   "memory_bank": {
        echo     "path": "./memory-bank/",
        echo     "config_file": "./memory-bank/config.json",
        echo     "enabled": true
        echo   },
        echo   "legacy_patterns": [
        echo     {
        echo       "name": "git-workflow",
        echo       "description": "Git workflow patterns (now managed via memory-bank)",
        echo       "deprecated": true,
        echo       "replacement": "memory-bank/mechanisms/git-workflow/"
        echo     },
        echo     {
        echo       "name": "verification-and-push",
        echo       "description": "Verification and push workflow (now managed via memory-bank)",
        echo       "deprecated": true,
        echo       "replacement": "memory-bank/mechanisms/verification-and-push/"
        echo     },
        echo     {
        echo       "name": "test-driven-development",
        echo       "description": "TDD practices (now managed via memory-bank)",
        echo       "deprecated": true,
        echo       "replacement": "memory-bank/mechanisms/test-driven-development/"
        echo     },
        echo     {
        echo       "name": "commit-system",
        echo       "description": "Commit system (now managed via memory-bank)",
        echo       "deprecated": true,
        echo       "replacement": "memory-bank/mechanisms/commit-system/"
        echo     }
        echo   ],
        echo   "migration_notes": [
        echo     "Rules are now stored in memory-bank/rules/",
        echo     "Mechanisms are configured via memory-bank/config.json",
        echo     "Enable/disable mechanisms by editing memory-bank/config.json",
        echo     "Learning data is exportable via memory-bank/exports/",
        echo     "Cross-branch memory is available in memory-bank/cross-branch-memory/"
        echo   ]
        echo }
    ) > .cursorrules
)

echo ✅ Memory Bank setup complete!
echo.
echo 📖 Next steps:
echo 1. Edit memory-bank/config.json to configure mechanisms
echo 2. Optionally import learning data: copy files to memory-bank/imports/
echo 3. Start using the task system: check activeContext.md
echo.
echo 🎛️  Quick config reminder:
echo    - test_driven_development: true/false
echo    - commit_system: true/false
echo    - git_workflow: true/false
echo    - learning.export_enabled: true/false
echo.
echo 🔍 File organization verification:
if exist ".cursorrules" echo    ✅ .cursorrules found in root directory
if not exist "memory-bank\.cursorrules" echo    ✅ No duplicate .cursorrules in memory-bank folder
if exist "memory-bank\activeContext.md" echo    ✅ activeContext.md found in memory-bank folder
if exist "memory-bank\progress.md" echo    ✅ progress.md found in memory-bank folder
if exist "memory-bank\metrics.md" echo    ✅ metrics.md found in memory-bank folder
echo.
pause
