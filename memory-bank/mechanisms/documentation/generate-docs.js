#!/usr/bin/env node

/**
 * Documentation Generator
 * Automatically generates comprehensive documentation for components and pages
 * Part of the Smart Home v3 Documentation Mechanism
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class DocumentationGenerator {
  constructor() {
    this.config = this.loadConfig();
    this.templates = this.loadTemplates();
    this.components = this.scanComponents();
  }

  loadConfig() {
    const configPath = path.join(__dirname, 'config.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  loadTemplates() {
    const templates = {};
    const templateDir = path.join(__dirname, 'templates');

    if (fs.existsSync(templateDir)) {
      const templateFiles = fs.readdirSync(templateDir);

      templateFiles.forEach(file => {
        if (file.endsWith('.md')) {
          const templateName = file.replace('.md', '_template');
          const templatePath = path.join(templateDir, file);
          templates[templateName] = fs.readFileSync(templatePath, 'utf8');
        }
      });
    }

    return templates;
  }

  scanComponents() {
    const components = {};
    const componentsDir = path.join(process.cwd(), 'components');

    if (!fs.existsSync(componentsDir)) {
      console.warn('Components directory not found');
      return components;
    }

    // Scan each category
    this.config.documentation.component_categories.forEach(category => {
      const categoryPath = path.join(componentsDir, category);
      if (fs.existsSync(categoryPath)) {
        components[category] = this.scanCategory(categoryPath, category);
      }
    });

    return components;
  }

  scanCategory(categoryPath, categoryName) {
    const components = [];
    const items = fs.readdirSync(categoryPath);

    items.forEach(item => {
      const itemPath = path.join(categoryPath, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Check if it's a component directory (has index.ts or .tsx files)
        const files = fs.readdirSync(itemPath);
        const hasComponentFiles = files.some(file =>
          file.endsWith('.tsx') || file.endsWith('.ts') || file === 'index.ts'
        );

        if (hasComponentFiles) {
          components.push({
            name: item,
            path: itemPath,
            category: categoryName,
            type: 'component'
          });
        }
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        // Individual component file
        const componentName = item.replace(/\.(tsx|ts)$/, '');
        components.push({
          name: componentName,
          path: itemPath,
          category: categoryName,
          type: 'component'
        });
      }
    });

    return components;
  }

  parseComponent(componentPath) {
    try {
      const content = fs.readFileSync(componentPath, 'utf8');
      const component = {
        name: path.basename(componentPath, path.extname(componentPath)),
        path: componentPath,
        props: [],
        types: '',
        description: '',
        features: [],
        hasTests: false
      };

      // Extract component description from JSDoc comments
      const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*([^*\n]+)/);
      if (jsdocMatch) {
        component.description = jsdocMatch[1].trim();
      }

      // Extract props from interface definitions
      const propsInterfaceMatch = content.match(/interface\s+\w+Props\s*{([^}]*)}/s);
      if (propsInterfaceMatch) {
        const propsContent = propsInterfaceMatch[1];
        const propMatches = propsContent.matchAll(/(\w+)\??:\s*([^;]+);\s*\/\/\s*(.+)?/g);

        for (const match of propMatches) {
          const [, name, type, comment] = match;
          component.props.push({
            name,
            type: type.trim(),
            required: !name.endsWith('?'),
            description: comment ? comment.trim() : ''
          });
        }
      }

      // Extract type definitions
      const typeMatches = content.match(/export\s+(type|interface)\s+\w+[\s\S]*?(?=export|\n\s*\n|$)/g);
      if (typeMatches) {
        component.types = typeMatches.join('\n\n');
      }

      // Check for tests
      const testPath = componentPath.replace(/\.tsx?$/, '.test.tsx');
      component.hasTests = fs.existsSync(testPath);

      return component;
    } catch (error) {
      console.error(`Error parsing component ${componentPath}:`, error.message);
      return null;
    }
  }

  generateComponentDoc(component) {
    const parsed = this.parseComponent(component.path);
    if (!parsed) return null;

    const template = this.templates.component_template;
    if (!template) {
      console.warn('Component template not found');
      return null;
    }

    let doc = template;

    // Replace simple template variables
    const replacements = {
      componentName: parsed.name,
      componentDescription: parsed.description || 'A React component',
      componentOverview: this.generateOverview(parsed),
      componentPath: path.relative(process.cwd(), component.path),
      generationDate: new Date().toISOString().split('T')[0],
      version: '1.0.0',
      basicUsage: this.generateBasicUsage(parsed),
      advancedUsage: this.generateAdvancedUsage(parsed),
      features: this.generateFeatures(parsed),
      stylingInfo: this.generateStylingInfo(parsed),
      responsiveInfo: this.generateResponsiveInfo(parsed),
      accessibilityInfo: this.generateAccessibilityInfo(parsed),
      performanceInfo: this.generatePerformanceInfo(parsed),
      integrationExamples: this.generateIntegrationExamples(parsed),
      browserSupport: this.generateBrowserSupport(parsed),
      relatedComponents: this.generateRelatedComponents(parsed),
      testingExamples: this.generateTestingExamples(parsed),
      futureEnhancements: this.generateFutureEnhancements(parsed)
    };

    // Replace simple variables
    Object.entries(replacements).forEach(([key, value]) => {
      doc = doc.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g'), value);
    });

    // Handle complex template sections
    // Props table
    const propsTable = parsed.props.length > 0
      ? parsed.props.map(prop =>
          `| \`${prop.name}\` | \`${prop.type}\` | ${prop.required ? 'Yes' : 'No'} | - | ${prop.description || 'No description'} |`
        ).join('\n')
      : '| No props defined | - | - | - | - |';
    doc = doc.replace(/\{\{#each props\}\}[\s\S]*?\{\{\/each\}\}/g, propsTable);

    // Types section
    const typesSection = parsed.types ? `\`\`\`typescript\n${parsed.types}\n\`\`\`` : 'No additional types defined.';
    doc = doc.replace(/\{\{#if types\}\}[\s\S]*?\{\{\/if\}\}/g, typesSection);

    return doc;
  }

  generateOverview(component) {
    return `The ${component.name} component provides ${component.description || 'functionality for the application'}.`;
  }

  generateBasicUsage(component) {
    return `import { ${component.name} } from '@/components/${component.category}/${component.name}';\n\nfunction MyComponent() {\n  return (\n    <${component.name} />\n  );\n}`;
  }

  generateAdvancedUsage(component) {
    const propsExample = component.props.slice(0, 3).map(prop =>
      `      ${prop.name}={${prop.type.includes('string') ? '"value"' : 'value'}}`
    ).join('\n');

    return `import { ${component.name} } from '@/components/${component.category}/${component.name}';\n\nfunction AdvancedUsage() {\n  return (\n    <${component.name}\n${propsExample}\n    />\n  );\n}`;
  }

  generateFeatures(component) {
    const features = [];
    if (component.props.length > 0) {
      features.push({ title: 'Props Support', description: `Supports ${component.props.length} configurable properties` });
    }
    if (component.hasTests) {
      features.push({ title: 'Tested', description: 'Includes comprehensive unit tests' });
    }
    features.push({ title: 'TypeScript', description: 'Full TypeScript support with type definitions' });

    return features.map(f => `- **${f.title}**: ${f.description}`).join('\n');
  }

  generateStylingInfo(component) {
    return 'The component uses design system classes and follows the established styling patterns.';
  }

  generateResponsiveInfo(component) {
    return 'The component adapts to different screen sizes using responsive design principles.';
  }

  generateAccessibilityInfo(component) {
    return 'The component follows accessibility best practices and supports screen readers.';
  }

  generatePerformanceInfo(component) {
    return 'The component is optimized for performance with efficient rendering and minimal re-renders.';
  }

  generateIntegrationExamples(component) {
    return 'See the usage examples above for integration patterns.';
  }

  generateBrowserSupport(component) {
    return '- Modern browsers with React support\n- Mobile browsers\n- Progressive enhancement for older browsers';
  }

  generateRelatedComponents(component) {
    return 'Check the component category overview for related components.';
  }

  generateTestingExamples(component) {
    if (component.hasTests) {
      return `Unit tests are available in the component's test file.`;
    }
    return 'Consider adding unit tests for this component.';
  }

  generateFutureEnhancements(component) {
    return '- Enhanced accessibility features\n- Additional customization options\n- Performance optimizations';
  }

  generateDocumentation() {
    console.log('🔄 Generating component documentation...');

    const outputDir = path.resolve(this.config.documentation.output_directory);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    let totalGenerated = 0;

    // Generate documentation for each category
    Object.entries(this.components).forEach(([category, components]) => {
      const categoryDir = path.join(outputDir, 'components', category);

      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }

      components.forEach(component => {
        const doc = this.generateComponentDoc(component);
        if (doc) {
          const outputPath = path.join(categoryDir, `${component.name}.md`);
          fs.writeFileSync(outputPath, doc, 'utf8');
          console.log(`✅ Generated: ${path.relative(process.cwd(), outputPath)}`);
          totalGenerated++;
        }
      });
    });

    console.log(`\n🎉 Documentation generation complete! Generated ${totalGenerated} component docs.`);

    // Generate main README if it doesn't exist
    this.generateMainReadme(outputDir);

    return totalGenerated;
  }

  generateMainReadme(outputDir) {
    const readmePath = path.join(outputDir, 'README.md');

    if (!fs.existsSync(readmePath)) {
      const readme = `# Smart Home Component Library Documentation

Generated documentation for all components in the library.

## Component Categories

${Object.entries(this.components).map(([category, components]) => {
  return `### ${category.charAt(0).toUpperCase() + category.slice(1)} Components

${components.map(comp => `- [${comp.name}](./components/${category}/${comp.name}.md)`).join('\n')}`;
}).join('\n\n')}

---

*Generated on ${new Date().toISOString().split('T')[0]} by Documentation Mechanism v${this.config.version}*
`;

      fs.writeFileSync(readmePath, readme, 'utf8');
      console.log(`📝 Generated main README: ${path.relative(process.cwd(), readmePath)}`);
    }
  }

  validateDocumentation() {
    console.log('🔍 Validating documentation...');

    const outputDir = path.resolve(this.config.documentation.output_directory);
    let issues = [];

    // Check if all components have documentation
    Object.entries(this.components).forEach(([category, components]) => {
      components.forEach(component => {
        const docPath = path.join(outputDir, 'components', category, `${component.name}.md`);
        if (!fs.existsSync(docPath)) {
          issues.push(`Missing documentation: ${component.name}`);
        }
      });
    });

    if (issues.length > 0) {
      console.warn('⚠️  Documentation validation issues:');
      issues.forEach(issue => console.warn(`   - ${issue}`));
    } else {
      console.log('✅ All documentation validated successfully');
    }

    return issues.length === 0;
  }

  run() {
    try {
      const generated = this.generateDocumentation();
      const valid = this.validateDocumentation();

      if (valid) {
        console.log('\n🎉 Documentation mechanism completed successfully!');
        console.log(`📊 Summary: ${generated} components documented`);
      } else {
        console.warn('\n⚠️  Documentation validation found issues');
        process.exit(1);
      }
    } catch (error) {
      console.error('❌ Documentation generation failed:', error.message);
      process.exit(1);
    }
  }
}

// CLI interface
if (require.main === module) {
  const generator = new DocumentationGenerator();
  generator.run();
}

module.exports = DocumentationGenerator;
