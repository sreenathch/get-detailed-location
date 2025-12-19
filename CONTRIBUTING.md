# Contributing to get-detailed-location

First off, thank you for considering contributing to get-detailed-location! It's people like you that make this library such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include the version of Node.js you're using.**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most users.

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the JavaScript/TypeScript styleguide
- Include thoughtfully-worded, well-structured tests
- Document new code
- End all files with a newline

## Development Setup

1. Fork the repo and create your branch from `main`:

```bash
git clone https://github.com/your-username/get-detailed-location.git
cd get-detailed-location
git checkout -b feature/your-feature-name
```

2. Install dependencies:

```bash
npm install
```

3. Make your changes and add tests:

```javascript
// test/your-feature.test.js
import { yourFunction } from '../index.js';

describe('yourFunction', () => {
  it('should do something', () => {
    expect(yourFunction(input)).toBe(expectedOutput);
  });
});
```

4. Run tests:

```bash
npm test
```

5. Run linting:

```bash
npm run lint
```

6. Commit your changes:

```bash
git add .
git commit -m "feat: add yourFeature"
```

We use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `test:` for test changes
- `refactor:` for refactoring
- `chore:` for maintenance tasks

7. Push and create a Pull Request:

```bash
git push origin feature/your-feature-name
```

## Styleguide

### JavaScript/TypeScript

- Use ES modules (`import`/`export`)
- Use `const` for all references; avoid `var`
- Use template literals instead of string concatenation
- Use arrow functions where appropriate
- Add JSDoc comments to all public functions
- Keep functions small and focused
- Use meaningful variable names

### Documentation

- Use [JSDoc](https://jsdoc.app/) for function documentation
- Update the README.md if you're adding new features
- Include examples in documentation
- Keep documentation up to date with code changes

### Testing

- Write tests for all new functionality
- Maintain test coverage above 80%
- Use descriptive test names
- Test edge cases

## Project Structure

```
get-detailed-location/
├── index.js          # Main library file
├── index.d.ts        # TypeScript definitions
├── package.json      # Package configuration
├── README.md         # Documentation
├── LICENSE           # MIT License
├── CONTRIBUTING.md   # This file
└── test/             # Test files
    └── *.test.js
```

## Adding New Functions

When adding a new function:

1. Add the implementation to `index.js`
2. Add TypeScript types to `index.d.ts`
3. Add the function to the default export object
4. Write tests
5. Update README.md with documentation and examples

Example:

```javascript
// 1. Implementation in index.js
/**
 * Calculate something useful
 * @param {Object} point - {lat, lng}
 * @returns {number}
 */
export const calculateSomething = (point) => {
  // Implementation
  return result;
};

// 2. Add to default export
export default {
  // ... existing functions
  calculateSomething,
};
```

```typescript
// 3. Add to index.d.ts
export function calculateSomething(point: Point): number;
```

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
