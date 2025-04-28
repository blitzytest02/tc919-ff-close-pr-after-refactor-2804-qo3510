# Contributing to Node.js Hello World HTTP Server

Thank you for your interest in contributing to the Node.js Hello World HTTP Server project! This document provides guidelines and instructions for contributing to this project. By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Environment](#development-environment)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Community](#community)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) for details.

## Getting Started

Before you begin contributing, please:

1. Ensure you have a GitHub account
2. Fork the repository on GitHub
3. Clone your fork locally
4. Set up the development environment as described below
5. Familiarize yourself with the project structure and documentation

## Development Environment

### Prerequisites

- Node.js (v18.x LTS or newer)
- npm (v9.x or newer, included with Node.js)
- Git (v2.x or newer)

### Setup

1. Clone your fork of the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/nodejs-hello-world.git
   cd nodejs-hello-world
   ```

2. Add the original repository as an upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/nodejs-hello-world.git
   ```

3. Install dependencies:
   ```bash
   cd src/backend
   npm install
   ```

4. Verify your setup by running tests:
   ```bash
   npm test
   ```

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   ```

2. Make your changes, following the coding standards below

3. Run linting and tests to ensure your changes meet quality standards:
   ```bash
   npm run lint
   npm test
   ```

4. Commit your changes with a descriptive commit message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```

5. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a pull request from your branch to the original repository's main branch

7. Respond to any feedback or requested changes from reviewers

## Coding Standards

This project uses ESLint and Prettier to enforce consistent code style. The configuration files can be found at:

- ESLint: [src/backend/.eslintrc.js](src/backend/.eslintrc.js)
- Prettier: [src/backend/.prettierrc.js](src/backend/.prettierrc.js)

### General Guidelines

- Use modern JavaScript (ES2022) features
- Follow the principle of single responsibility
- Write clear, descriptive variable and function names
- Include JSDoc comments for functions and classes
- Keep functions small and focused
- Avoid unnecessary dependencies

### Formatting and Linting

Before submitting your code, ensure it passes linting:

```bash
npm run lint
```

You can automatically fix many linting issues with:

```bash
npm run lint:fix
```

## Testing Requirements

All code contributions must include appropriate tests. This project uses Jest for testing, configured in [src/backend/jest.config.js](src/backend/jest.config.js).

### Test Guidelines

- Write unit tests for all new functions and classes
- Write integration tests for API endpoints
- Maintain or improve code coverage (minimum 90%)
- Tests should be clear, concise, and focused on a single aspect

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch
```

## Pull Request Process

1. Ensure your code follows the coding standards and passes all tests
2. Update documentation if necessary, including comments, README, and other relevant docs
3. Create a pull request using the [pull request template](.github/PULL_REQUEST_TEMPLATE.md)
4. The pull request will be reviewed by maintainers, who may request changes
5. Once approved, a maintainer will merge your pull request

### Pull Request Checklist

- [ ] Code follows project coding standards
- [ ] Tests have been added or updated for changes
- [ ] All tests pass locally and in CI
- [ ] Documentation has been updated if necessary
- [ ] Commit messages follow the project convention
- [ ] Branch is up to date with the main branch

## Issue Reporting

If you find a bug or have a suggestion for improvement, please create an issue using the appropriate template:

- [Bug Report Template](.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature Request Template](.github/ISSUE_TEMPLATE/feature_request.md)

Before creating an issue, please:

1. Search existing issues to avoid duplicates
2. Collect as much information as possible about the issue
3. If possible, create a minimal reproduction of the problem

## Feature Requests

Feature requests are welcome! Please use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) to submit your ideas.

When proposing a new feature, consider:

- The scope of the feature and how it fits with the project's goals
- Potential implementation approaches
- Whether you're willing to help implement the feature
- How the feature would be tested and documented

## Community

We value the input and contributions of all community members. Here are some ways to get involved:

- Help review pull requests
- Improve documentation
- Answer questions from other users
- Share your experience using the project

### Communication Channels

- GitHub Issues: For bug reports, feature requests, and discussions
- Pull Requests: For code contributions and reviews

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (see [LICENSE](LICENSE) file).

## Acknowledgements

Thank you to all contributors who help improve this project!