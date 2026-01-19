# Contributing to SammedCode Platform Template

Thank you for your interest in contributing to the SammedCode Platform Template! We welcome contributions from the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/sammedcode-platform-template.git`
3. Add upstream remote: `git remote add upstream https://github.com/madhusamsani/sammedcode-platform-template.git`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## 🤝 How to Contribute

### Reporting Bugs

- Check if the bug has already been reported in [Issues](https://github.com/madhusamsani/sammedcode-platform-template/issues)
- If not, create a new issue with:
  - Clear title and description
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots (if applicable)
  - Environment details

### Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature and its benefits
- Provide examples of how it would be used

### Code Contributions

1. Pick an issue or create one
2. Comment on the issue to let others know you're working on it
3. Follow the development workflow below

## 💻 Development Workflow

1. **Sync your fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Add tests for new functionality
   - Update documentation as needed

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

## 🎨 Coding Standards

### General Guidelines

- Use TypeScript for type safety
- Follow the existing code style
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused

### TypeScript

- Use explicit types instead of `any`
- Prefer interfaces over types for object shapes
- Use enums for fixed sets of values

### Naming Conventions

- **Files**: kebab-case (e.g., `user-service.ts`)
- **Classes**: PascalCase (e.g., `UserService`)
- **Functions/Variables**: camelCase (e.g., `getUserById`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### Code Organization

- Group related functionality
- Use barrel exports (index.ts files)
- Keep components/modules small and reusable

## 📝 Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add JWT authentication

Implement JWT-based authentication system with:
- Token generation and validation
- Refresh token mechanism
- User session management

Closes #123
```

```
fix(api): handle null response from database

Add null checks before processing database results
to prevent application crashes.

Fixes #456
```

## 🔄 Pull Request Process

1. **Before submitting**
   - Ensure all tests pass
   - Update documentation
   - Add yourself to CONTRIBUTORS.md (if first contribution)

2. **PR Description**
   - Clearly describe what changes you made
   - Reference related issues
   - Include screenshots for UI changes
   - List any breaking changes

3. **Review Process**
   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, your PR will be merged

4. **After merge**
   - Delete your feature branch
   - Update your fork

## 🧪 Testing

- Write unit tests for new features
- Ensure existing tests pass
- Aim for high code coverage
- Test edge cases

## 📚 Documentation

- Update README.md if needed
- Add JSDoc comments to functions
- Update API documentation
- Include examples for new features

## 🆘 Getting Help

If you need help:
- Check existing documentation
- Search closed issues
- Ask in issue comments
- Reach out to maintainers

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in the project

Thank you for contributing to SammedCode Platform Template!
