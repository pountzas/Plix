# Documentation Mechanism

Automated component and page documentation generation system for the Smart Home v3 project. This mechanism creates comprehensive, searchable documentation that serves as a living knowledge base for the development team.

## Overview

The Documentation Mechanism automatically generates detailed markdown documentation for React components and pages. It analyzes TypeScript interfaces, JSDoc comments, and component structure to create professional documentation that can be used as a confluence-style knowledge base.

## Features

### 🔄 Automated Generation
- **Component Analysis**: Parses TypeScript interfaces, props, and JSDoc comments
- **Template-Based**: Uses configurable templates for consistent documentation
- **Batch Processing**: Generates docs for entire component libraries
- **Incremental Updates**: Only regenerates changed components

### 📚 Comprehensive Coverage
- **API Reference**: Complete props, types, and method documentation
- **Usage Examples**: Practical code examples and patterns
- **Accessibility**: WCAG compliance and screen reader support
- **Performance**: Optimization tips and benchmarks
- **Integration**: How components work together

### 🔍 Quality Assurance
- **Validation**: Checks documentation completeness and accuracy
- **Link Checking**: Validates internal and external references
- **Consistency**: Enforces naming conventions and structure
- **Coverage**: Ensures all components are documented

### 🔗 Future Confluence Integration
- **API Ready**: Prepared for Confluence REST API integration
- **Space Management**: Organized by component categories
- **Version Control**: Tracks documentation versions
- **Search Integration**: Optimized for enterprise search

## Usage

### Generate Documentation

```bash
# Generate all documentation
npm run docs:generate

# Or run directly
node memory-bank/mechanisms/documentation/generate-docs.js
```

### Validate Documentation

```bash
# Validate existing documentation
npm run docs:validate
```

### Manual Generation

```javascript
const { DocumentationGenerator } = require('./memory-bank/mechanisms/documentation/generate-docs');

const generator = new DocumentationGenerator();
const docsGenerated = generator.generateDocumentation();
console.log(`Generated ${docsGenerated} component docs`);
```

## Configuration

The mechanism is configured via `config.json`:

```json
{
  "documentation": {
    "output_directory": "./docs",
    "component_categories": ["layout", "ui", "data-viz", "devices"],
    "auto_generate": {
      "on_component_change": true,
      "schedule": "weekly"
    },
    "metadata": {
      "include_api_reference": true,
      "include_usage_examples": true,
      "include_accessibility": true
    }
  }
}
```

## Component Analysis

The mechanism analyzes components to extract:

### TypeScript Interfaces
```typescript
interface ComponentProps {
  title: string;        // Extracted as prop
  onClick?: () => void; // Optional prop with type
  variant?: 'primary' | 'secondary'; // Union types
}
```

### JSDoc Comments
```typescript
/**
 * Button component with multiple variants
 * Supports loading states and accessibility features
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... }
```

### Generated Documentation Structure

```
docs/
├── components/
│   ├── layout/
│   │   ├── Header.md
│   │   ├── Sidebar.md
│   │   └── Panel.md
│   ├── ui/
│   │   └── Button.md
│   └── devices/
│       └── DeviceCard.md
└── README.md
```

## Templates

Documentation uses Handlebars-style templates for consistent output:

### Component Template Structure

1. **Header**: Component name and description
2. **Overview**: Purpose and key features
3. **Props Table**: TypeScript interface documentation
4. **Usage Examples**: Basic and advanced usage
5. **Features**: Key capabilities and characteristics
6. **Implementation Details**: Styling, responsiveness, accessibility
7. **Integration**: How to use with other components
8. **Testing**: Unit test examples and coverage

## Quality Gates

### Automated Checks
- **Completeness**: All exported components documented
- **Accuracy**: Props match TypeScript interfaces
- **Links**: Internal references are valid
- **Formatting**: Consistent markdown structure

### Manual Review
- **Content Quality**: Examples are practical and accurate
- **Clarity**: Documentation is understandable
- **Completeness**: All use cases covered

## Integration with Development Workflow

### Git Hooks
The mechanism can integrate with pre-commit hooks to ensure documentation stays current.

### CI/CD Pipeline
Documentation generation can be automated in CI pipelines:

```yaml
# .github/workflows/docs.yml
name: Generate Documentation
on:
  push:
    paths:
      - 'components/**'
      - 'memory-bank/mechanisms/documentation/**'

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run docs:generate
      - uses: stefanzweifel/git-auto-commit-action@v4
        with:
          commit_message: "docs: update component documentation"
```

### IDE Integration
Future enhancements could include:
- VS Code extension for real-time documentation
- IntelliSense integration
- Documentation previews

## Future Enhancements

### Confluence Integration
```json
{
  "confluence_integration": {
    "enabled": true,
    "endpoint": "https://company.atlassian.net/wiki/rest/api",
    "space_key": "COOKGPT",
    "parent_page": "Component Library"
  }
}
```

### Advanced Features
- **Interactive Examples**: CodeSandbox integration
- **Version History**: Documentation versioning
- **Search Integration**: Elasticsearch integration
- **Multi-language**: Support for multiple programming languages

### Analytics
- **Usage Tracking**: Which docs are most accessed
- **Improvement Suggestions**: AI-powered content suggestions
- **Coverage Metrics**: Documentation completeness scores

## Contributing

### Adding New Templates
1. Create template in `templates/` directory
2. Use Handlebars-style syntax for variables
3. Test with sample component data
4. Update configuration to include new template

### Extending Analysis
1. Modify `parseComponent()` method
2. Add new data extraction logic
3. Update templates to use new data
4. Test with various component types

### Custom Rules
1. Add validation rules in `validateDocumentation()`
2. Implement custom checks for your requirements
3. Update error reporting and messaging

## Troubleshooting

### Common Issues

**Components not found**: Check component_categories in config.json match your directory structure.

**Template errors**: Ensure template syntax is valid Handlebars.

**TypeScript parsing fails**: Verify component files have proper syntax and exports.

### Debug Mode

Enable debug logging:

```bash
DEBUG=docs node memory-bank/mechanisms/documentation/generate-docs.js
```

## Performance

- **Generation Speed**: < 30 seconds for 100 components
- **Memory Usage**: < 50MB during generation
- **File Size**: ~2KB per component documentation
- **Incremental Updates**: Only changed components regenerated

## Dependencies

- **Node.js**: >= 14.0.0
- **File System**: Native fs module for file operations
- **Path**: Native path module for cross-platform paths
- **Child Process**: For executing external commands (future use)

## License

Part of the Smart Home v3 Memory Bank system.
