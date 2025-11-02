/**
 * Documentation Mechanism
 * Automated component and page documentation generation system
 * Part of the Smart Home v3 Memory Bank
 */

const path = require('path');
const { DocumentationGenerator } = require('./generate-docs');

class DocumentationMechanism {
  constructor(memoryBank) {
    this.memoryBank = memoryBank;
    this.config = this.loadConfig();
    this.generator = new DocumentationGenerator();
  }

  loadConfig() {
    const configPath = path.join(__dirname, 'config.json');
    return require(configPath);
  }

  async initialize() {
    console.log('📚 Documentation Mechanism initialized');

    // Set up watchers for auto-generation if enabled
    if (this.config.documentation.auto_generate.on_component_change) {
      this.setupFileWatcher();
    }

    return true;
  }

  setupFileWatcher() {
    // This would typically use chokidar or similar for file watching
    // For now, we'll just log that it would be set up
    console.log('👀 File watcher would be set up for auto-generation');
  }

  async generateDocumentation(options = {}) {
    console.log('🔄 Starting documentation generation...');

    try {
      const result = await this.generator.generateDocumentation();

      // Log to memory bank progress
      await this.memoryBank.logProgress('documentation', {
        action: 'generate',
        components: result,
        timestamp: new Date().toISOString(),
        options
      });

      return result;
    } catch (error) {
      console.error('❌ Documentation generation failed:', error);
      await this.memoryBank.logError('documentation', error);
      throw error;
    }
  }

  async validateDocumentation() {
    console.log('🔍 Validating documentation...');

    const isValid = this.generator.validateDocumentation();

    await this.memoryBank.logProgress('documentation', {
      action: 'validate',
      result: isValid,
      timestamp: new Date().toISOString()
    });

    return isValid;
  }

  async syncToConfluence() {
    if (!this.config.confluence_integration.enabled) {
      console.log('📄 Confluence sync disabled');
      return;
    }

    console.log('🔄 Syncing documentation to Confluence...');

    // This would implement Confluence API integration
    // For now, just log the intent
    console.log('📝 Confluence sync would upload documentation');

    await this.memoryBank.logProgress('documentation', {
      action: 'confluence_sync',
      timestamp: new Date().toISOString()
    });
  }

  async getDocumentationStats() {
    const stats = {
      components: 0,
      categories: 0,
      lastGenerated: null,
      coverage: 0
    };

    // Calculate stats from generated docs
    const docsDir = path.resolve(this.config.documentation.output_directory);

    if (require('fs').existsSync(docsDir)) {
      const categories = require('fs').readdirSync(path.join(docsDir, 'components'));

      stats.categories = categories.length;

      categories.forEach(category => {
        const categoryPath = path.join(docsDir, 'components', category);
        if (require('fs').statSync(categoryPath).isDirectory()) {
          const files = require('fs').readdirSync(categoryPath);
          stats.components += files.filter(f => f.endsWith('.md')).length;
        }
      });
    }

    return stats;
  }

  // Mechanism interface methods
  async onComponentCreated(componentPath, componentName) {
    if (this.config.documentation.auto_generate.on_component_change) {
      console.log(`📝 Auto-generating docs for new component: ${componentName}`);
      await this.generateDocumentation({ trigger: 'component_created', component: componentName });
    }
  }

  async onComponentModified(componentPath, componentName) {
    if (this.config.documentation.auto_generate.on_component_change) {
      console.log(`📝 Auto-updating docs for modified component: ${componentName}`);
      await this.generateDocumentation({ trigger: 'component_modified', component: componentName });
    }
  }

  async onPageCreated(pagePath, pageName) {
    if (this.config.documentation.auto_generate.on_page_change) {
      console.log(`📝 Auto-generating docs for new page: ${pageName}`);
      // Future: implement page documentation generation
    }
  }

  async suggestImprovements() {
    const suggestions = [];

    const stats = await this.getDocumentationStats();

    if (stats.components === 0) {
      suggestions.push({
        type: 'critical',
        message: 'No component documentation found. Run documentation generation.',
        action: 'generate'
      });
    }

    if (!this.config.documentation.auto_generate.on_component_change) {
      suggestions.push({
        type: 'optimization',
        message: 'Consider enabling auto-generation on component changes.',
        action: 'enable_auto_gen'
      });
    }

    return suggestions;
  }
}

module.exports = DocumentationMechanism;
