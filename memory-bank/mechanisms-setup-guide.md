# Mechanisms Setup Guide - Complete Development Workflow

## Overview
This guide documents the complete process for enabling Git Commit System, Test Driven Development, and Documentation mechanisms in Next.js projects. This setup provides automated quality gates, conventional commit enforcement, TDD workflow support, and comprehensive documentation generation.

## Prerequisites
- Next.js project with TypeScript
- Git repository initialized
- Node.js and npm installed

## 1. Enable Mechanisms in Memory Bank

First, update the mechanism configuration files:

### memory-bank/mechanisms/commit-system/config.json
```json
{
  "name": "Git Commit System",
  "description": "Enforces proper git commit practices and workflow",
  "enabled": true,
  "version": "1.0.0",
  "rules": [
    "commit-system.mdc"
  ],
  "dependencies": [
    "git-workflow"
  ],
  "configuration": {
    "conventional_commits": true,
    "selective_staging": true,
    "pre_commit_verification": true,
    "commit_message_format": "type(scope): description",
    "max_commit_size_lines": 200,
    "max_commit_files": 5,
    "require_verification": true,
    "enforce_feature_branches": true
  },
  "enforcement": {
    "pre_commit_hook": true,
    "commitizen_integration": false,
    "lint_staged": true
  }
}
```

### memory-bank/mechanisms/test-driven-development/config.json
```json
{
  "name": "Test Driven Development",
  "description": "Enforces TDD practices with RED-GREEN-REFACTOR cycle",
  "enabled": true,
  "version": "1.0.0",
  "rules": [
    "test-driven-development.mdc"
  ],
  "dependencies": [],
  "configuration": {
    "require_tests_first": true,
    "minimum_coverage": 80,
    "enforce_red_green_refactor": true,
    "allow_spike_exceptions": true,
    "testing_framework": "jest",
    "coverage_tool": "jest",
    "integration_testing": "jest",
    "e2e_testing": "playwright"
  },
  "enforcement": {
    "pre_commit_hook": true,
    "ci_checks": true,
    "pr_requirements": true
  }
}
```

### memory-bank/mechanisms/documentation/config.json
```json
{
  "version": "1.0.0",
  "description": "Documentation Mechanism - Automated component and page documentation generation",
  "enabled": true,
  "documentation": {
    "output_directory": "./docs",
    "component_categories": [
      "layout",
      "ui",
      "data-viz",
      "devices",
      "pages"
    ],
    "auto_generate": {
      "on_component_change": true,
      "on_page_change": false,
      "schedule": "weekly"
    },
    "templates": {
      "component_template": "./memory-bank/mechanisms/documentation/templates/component.md",
      "page_template": "./memory-bank/mechanisms/documentation/templates/page.md",
      "readme_template": "./memory-bank/mechanisms/documentation/templates/readme.md"
    },
    "metadata": {
      "include_api_reference": true,
      "include_usage_examples": true,
      "include_accessibility": true,
      "include_responsive": true,
      "include_performance": true
    }
  },
  "confluence_integration": {
    "enabled": false,
    "endpoint": "",
    "authentication": {
      "type": "basic",
      "credentials": {}
    },
    "sync_schedule": "daily",
    "space_key": "COOKGPT",
    "parent_page": "Component Library"
  },
  "quality_gates": {
    "require_documentation": false,
    "validate_links": true,
    "check_completeness": true,
    "enforce_naming": true
  }
}
```

## 2. Install Dependencies

Install all required packages for both mechanisms:

```bash
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  @testing-library/user-event \
  jest-environment-jsdom \
  @types/jest \
  husky \
  lint-staged \
  @commitlint/cli \
  @commitlint/config-conventional \
  commitizen \
  cz-conventional-changelog \
  prettier
```

## 3. Configure Jest Testing Framework

### jest.config.js
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!jest.setup.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
}

module.exports = createJestConfig(customJestConfig)
```

### jest.setup.js
```javascript
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      pathname: '/',
      query: {},
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Global test utilities
global.fetch = jest.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
```

## 4. Configure Commitlint

### commitlint.config.js
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert'
      ]
    ],
    'type-case': [0], // Disable type case checking
    'type-empty': [2, 'never'],
    'scope-case': [0], // Disable scope case checking
    'subject-case': [0], // Disable subject case checking
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 72],
    'scope-empty': [0, 'never']
  }
}
```

## 5. Initialize Husky and Setup Git Hooks

```bash
npx husky init
```

### .husky/pre-commit
```bash
npx lint-staged
```

### .husky/commit-msg
```bash
npx --no-install commitlint --edit "$1"
```

## 6. Configure Lint-staged

Update package.json:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "jest --findRelatedTests --passWithNoTests"
    ],
    "*.{json,css,md}": [
      "prettier --write"
    ]
  },
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

## 7. Configure ESLint to Ignore Config Files

Update eslint.config.mjs:

```javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Configuration files that use CommonJS:
    "jest.config.js",
    "commitlint.config.js",
    "jest.setup.js",
  ]),
]);

export default eslintConfig;
```

## 8. Update Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "docs:generate": "node memory-bank/mechanisms/documentation/generate-docs.js",
    "docs:validate": "node -e \"const {DocumentationGenerator} = require('./memory-bank/mechanisms/documentation/generate-docs'); const gen = new DocumentationGenerator(); gen.validateDocumentation();\"",
    "prepare": "husky",
    "commit": "cz"
  }
}
```

## 9. Create Test Directory Structure

```bash
mkdir -p __tests__/unit/components/ui
```

## 10. Test the Setup

### Run Tests
```bash
npm test
```

### Test Pre-commit Hooks
```bash
git add .
git commit -m "chore: test mechanisms setup"
```

## Common Issues & Solutions

### Issue: ESLint complains about require() in config files
**Solution:** Add config files to ESLint globalIgnores in eslint.config.mjs

### Issue: Commitlint case validation errors
**Solution:** Disable problematic case rules (type-case, scope-case, subject-case) by setting them to [0]

### Issue: Pre-commit hook fails on config files
**Solution:** Ensure config files are properly ignored by ESLint and lint-staged

### Issue: Path aliases not working in tests
**Solution:** Ensure moduleNameMapper in jest.config.js matches tsconfig.json paths

## Verification Checklist

### Core Mechanisms
- [ ] `npm test` runs successfully
- [ ] `git add . && git commit -m "test: verify setup"` works
- [ ] Pre-commit hooks run ESLint and Jest
- [ ] Commit messages are validated by commitlint
- [ ] Test coverage reporting works
- [ ] Path aliases work in both app and tests

### Documentation Mechanism
- [ ] `npm run docs:generate` creates documentation successfully
- [ ] `npm run docs:validate` passes without errors
- [ ] Documentation files are created in `./docs/` directory
- [ ] Component documentation includes props, usage, and examples
- [ ] All exported components have documentation generated

## Usage Guide

### For Developers

**Writing Tests First (TDD):**
1. Create test file: `component.test.tsx`
2. Write failing test
3. Run `npm run test:watch`
4. Implement code to make test pass
5. Refactor while keeping tests green

**Committing Code:**
```bash
# Interactive commit
npm run commit

# Direct commit
git commit -m "feat(ui): add new button component"
```

**Test Commands:**
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

**Documentation Commands:**
```bash
npm run docs:generate # Generate all documentation
npm run docs:validate # Validate documentation completeness
```

## Performance Impact

- **Pre-commit hooks**: ~3-5 seconds for typical commits
- **Test execution**: Depends on test suite size
- **Coverage reporting**: Minimal impact when not requested

## Maintenance

- Keep dependencies updated
- Review and adjust coverage thresholds as needed
- Update ESLint rules based on team preferences
- Monitor pre-commit hook performance

---

**Version**: 2.0.0
**Last Updated**: 2025-10-22
**Tested With**: Next.js 16, TypeScript 5, Node.js 22
**Mechanisms**: Git Commit System, Test Driven Development, Documentation Generation
