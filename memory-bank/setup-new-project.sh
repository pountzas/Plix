#!/bin/bash

# Memory Bank Setup Script for New Projects
# Copy this script to your new project and run it

echo "🚀 Setting up Memory Bank for new project..."

# Clean project-specific data
echo "🧹 Cleaning project-specific data..."
rm -f memory-bank/activeContext.md
rm -f memory-bank/progress.md
rm -f memory-bank/metrics.md
rm -f memory-bank/.cursorrules
rm -rf progress/
rm -rf cross-branch-memory/exports/
rm -rf exports/*.json
rm -rf imports/*.json
rm -rf figma-specifications/
mkdir -p cross-branch-memory/exports

# Keep template task files but remove project-specific tasks
echo "📋 Cleaning task files..."
find tasks/ -name "*.md" -not -name "_template.example.md" -not -name "README.md" -delete

# Create .cursorrules if it doesn't exist
if [ ! -f ".cursorrules" ]; then
    echo "📝 Creating .cursorrules..."
    cat > .cursorrules << 'EOF'
{
  "version": "2.0.0",
  "description": "Memory Bank Integration - Rules loaded from memory-bank/config.json",
  "memory_bank": {
    "path": "./memory-bank/",
    "config_file": "./memory-bank/config.json",
    "enabled": true
  },
  "legacy_patterns": [
    {
      "name": "git-workflow",
      "description": "Git workflow patterns (now managed via memory-bank)",
      "deprecated": true,
      "replacement": "memory-bank/mechanisms/git-workflow/"
    },
    {
      "name": "verification-and-push",
      "description": "Verification and push workflow (now managed via memory-bank)",
      "deprecated": true,
      "replacement": "memory-bank/mechanisms/verification-and-push/"
    },
    {
      "name": "test-driven-development",
      "description": "TDD practices (now managed via memory-bank)",
      "deprecated": true,
      "replacement": "memory-bank/mechanisms/test-driven-development/"
    },
    {
      "name": "commit-system",
      "description": "Commit system (now managed via memory-bank)",
      "deprecated": true,
      "replacement": "memory-bank/mechanisms/commit-system/"
    }
  ],
  "migration_notes": [
    "Rules are now stored in memory-bank/rules/",
    "Mechanisms are configured via memory-bank/config.json",
    "Enable/disable mechanisms by editing memory-bank/config.json",
    "Learning data is exportable via memory-bank/exports/",
    "Cross-branch memory is available in memory-bank/cross-branch-memory/"
  ]
}
EOF
fi

# Update project name in config.json
if [ -f "memory-bank/config.json" ]; then
    echo "📋 Updating project name in config..."
    # Get current directory name as project name
    PROJECT_NAME=$(basename "$(pwd)")
    # Update the config.json with the project name
    sed -i "s/\"name\": \"[^\"]*\"/\"name\": \"$PROJECT_NAME\"/" memory-bank/config.json
fi

echo "✅ Memory Bank setup complete!"
echo ""
echo "📖 Next steps:"
echo "1. Edit memory-bank/config.json to configure mechanisms"
echo "2. Optionally import learning data: copy files to memory-bank/imports/"
echo "3. Start using the task system: check activeContext.md"
echo ""
echo "🎛️  Quick config reminder:"
echo "   - test_driven_development: true/false"
echo "   - commit_system: true/false"
echo "   - git_workflow: true/false"
echo "   - learning.export_enabled: true/false"
echo ""
echo "🔍 File organization verification:"
[ -f ".cursorrules" ] && echo "   ✅ .cursorrules found in root directory" || echo "   ❌ .cursorrules missing from root directory"
[ ! -f "memory-bank/.cursorrules" ] && echo "   ✅ No duplicate .cursorrules in memory-bank folder" || echo "   ❌ Duplicate .cursorrules found in memory-bank folder"
[ -f "memory-bank/activeContext.md" ] && echo "   ✅ activeContext.md found in memory-bank folder" || echo "   ⚠️  activeContext.md not yet created in memory-bank folder"
[ -f "memory-bank/progress.md" ] && echo "   ✅ progress.md found in memory-bank folder" || echo "   ⚠️  progress.md not yet created in memory-bank folder"
[ -f "memory-bank/metrics.md" ] && echo "   ✅ metrics.md found in memory-bank folder" || echo "   ⚠️  metrics.md not yet created in memory-bank folder"
echo ""
