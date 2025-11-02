---
template_id: investigate-template-missing
title: Investigate and create missing task template
intent: Identify missing template and author a first version
input_format: use_case_summary, evidence_of_need, repo_path
output_format: PR link adding new template
steps: |
  1. Gather instances where template was needed
  2. Draft template with YAML frontmatter
  3. Validate fields and example usage
  4. Submit PR and collect feedback
acceptance_criteria: |
  - Template fields complete and valid
  - Example usage included
timebox_minutes: 60
dependencies: []
version: 1.0.0
notes: Keep initial scope minimal; iterate via feedback.
learning_tags: [templates]
changelog:
  - "2025-10-17: Initial version."
  - "2025-10-20: Add guidance to include lanes/locks fields in new templates."
---


