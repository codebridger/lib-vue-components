# Test Coverage Setup

This document explains how to use the test coverage setup for the Lib Vue Components library.

## Overview

The project uses **Vitest** with **@vitest/coverage-v8** for generating comprehensive test coverage reports. Coverage helps identify untested code and ensures code quality.

## Quick Start

### Run Coverage
```bash
# Generate coverage report
yarn test:coverage

# Run tests with coverage in watch mode
yarn test:watch --coverage
```

### View Coverage Reports
After running coverage, you can view the reports in the `coverage/` directory:

- **HTML Report**: Open `coverage/index.html` in your browser for an interactive report
- **LCOV Report**: `coverage/lcov.info` for CI/CD integration
- **JSON Report**: `coverage/coverage-final.json` for programmatic access

## Configuration

The coverage configuration is defined in `vitest.config.ts`:

### Coverage Provider
```typescript
coverage: {
  provider: "v8", // Uses V8's built-in coverage
}
```

### Reporters
```typescript
reporter: [
  "text",        // Console output
  "json",        // JSON format
  "html",        // Interactive HTML report
  "lcov",        // LCOV format for CI/CD
  "text-summary" // Summary in console
]
```

### Coverage Thresholds
```typescript
thresholds: {
  global: {
    branches: 80,    // Branch coverage must be ≥80%
    functions: 80,   // Function coverage must be ≥80%
    lines: 80,       // Line coverage must be ≥80%
    statements: 80   // Statement coverage must be ≥80%
  }
}
```

### File Inclusion/Exclusion
```typescript
include: [
  "src/**/*.{js,ts,vue}",           // Include all source files
  "!src/**/*.stories.{js,ts}",      // Exclude Storybook files
  "!src/**/*.test.{js,ts}",         // Exclude test files
  "!src/**/*.spec.{js,ts}"          // Exclude spec files
],
exclude: [
  "node_modules/",
  "dist/",
  "coverage/",
  "**/*.d.ts",
  "**/*.config.*",
  "**/__snapshots__/**",
  // ... other exclusions
]
```

## Coverage Metrics

### Statement Coverage
Measures the percentage of statements that have been executed.

### Branch Coverage
Measures the percentage of branches (if/else, switch cases) that have been executed.

### Function Coverage
Measures the percentage of functions that have been called.

### Line Coverage
Measures the percentage of lines that have been executed.

## Current Coverage Status

As of the latest run:
- **Statements**: 3.77% (116/3072)
- **Branches**: 92.18% (59/64)
- **Functions**: 90.32% (28/31)
- **Lines**: 3.77% (116/3072)

### Well-Tested Components
- `Button.vue`: 98.3% statement coverage

### Components Needing Tests
Most components currently have 0% coverage and need test files:
- `Avatar.vue`
- `Card.vue`
- `CheckboxInput.vue`
- `Dropdown.vue`
- `Input.vue`
- `Modal.vue`
- `Pagination.vue`
- And many others...

## Adding Tests for Better Coverage

### 1. Create Test Files
Create test files in the `__tests__` directory:
```
src/elements/__tests__/
├── Button.test.ts
├── Avatar.test.ts
├── Card.test.ts
└── ...
```

### 2. Test Structure
Follow the existing pattern from `Button.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from '../ComponentName.vue'

describe('ComponentName', () => {
  it('renders properly', () => {
    const wrapper = mount(ComponentName)
    expect(wrapper.exists()).toBe(true)
  })

  it('handles props correctly', () => {
    const wrapper = mount(ComponentName, {
      props: {
        // your props
      }
    })
    // assertions
  })

  it('emits events correctly', async () => {
    const wrapper = mount(ComponentName)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

### 3. Accessibility Tests
Include accessibility tests following the pattern from `Button.accessibility.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { axe } from 'jest-axe'
import ComponentName from '../ComponentName.vue'

describe('ComponentName Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const wrapper = mount(ComponentName)
    const results = await axe(wrapper.element)
    expect(results).toHaveNoViolations()
  })
})
```

## CI/CD Integration

### GitHub Actions
Add coverage reporting to your CI pipeline:

```yaml
- name: Run tests with coverage
  run: yarn test:coverage

- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  with:
    file: ./coverage/lcov.info
    flags: unittests
    name: codecov-umbrella
```

### Coverage Badges
Add coverage badges to your README:

```markdown
[![Coverage](https://codecov.io/gh/your-repo/branch/main/graph/badge.svg)](https://codecov.io/gh/your-repo)
```

## Troubleshooting

### Common Issues

1. **Coverage not generating**: Ensure `@vitest/coverage-v8` is installed
2. **Version conflicts**: Make sure Vitest and coverage package versions are compatible
3. **Missing files**: Check the `include`/`exclude` patterns in the config
4. **Low coverage**: Add more test cases for untested components

### Debug Mode
Run with verbose output:
```bash
yarn test:coverage --reporter=verbose
```

## Best Practices

1. **Aim for 80%+ coverage** across all metrics
2. **Test edge cases** and error conditions
3. **Include accessibility tests** for all components
4. **Test both props and events** thoroughly
5. **Use meaningful test descriptions**
6. **Keep tests focused** and isolated
7. **Mock external dependencies** appropriately

## Resources

- [Vitest Coverage Documentation](https://vitest.dev/guide/coverage.html)
- [Vue Test Utils Guide](https://test-utils.vuejs.org/)
- [Testing Vue Components](https://vuejs.org/guide/scaling-up/testing.html) 