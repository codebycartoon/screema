# Contributing to SCREEMA

Thank you for your interest in contributing to SCREEMA! This document provides guidelines and information for contributors.

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/screema.git
   cd screema
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create environment file:
   ```bash
   cp .env.example .env
   # Add your Supabase credentials
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add phone number validation
fix(booking): resolve seat selection conflict
docs(readme): update installation instructions
```

## 🔍 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper types for all props and functions
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React
- Use functional components with hooks
- Follow React best practices for performance
- Use proper prop validation
- Implement error boundaries where appropriate

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theme values

### Code Quality
Before submitting a PR, ensure your code passes:
```bash
npm run type-check    # TypeScript validation
npm run lint          # ESLint checking
npm run format:check  # Prettier formatting
npm run build         # Production build
```

## 🧪 Testing Guidelines

### Writing Tests
- Write unit tests for utility functions
- Add integration tests for complex components
- Include accessibility tests
- Test error scenarios and edge cases

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📝 Pull Request Process

### Before Submitting
1. Ensure your code follows the style guidelines
2. Update documentation if needed
3. Add tests for new functionality
4. Verify all tests pass
5. Update CHANGELOG.md if applicable

### PR Template
When creating a PR, include:
- **Description**: What changes were made and why
- **Type**: Feature, bug fix, documentation, etc.
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes
- **Breaking Changes**: Any breaking changes
- **Checklist**: Completed tasks

### Review Process
1. Automated checks must pass (CI/CD pipeline)
2. Code review by maintainers
3. Address feedback and make necessary changes
4. Final approval and merge

## 🏗️ Architecture Guidelines

### Component Structure
```
src/components/
├── ui/              # Base design system components
├── layout/          # Layout components (Header, Footer)
├── feature/         # Feature-specific components
└── shared/          # Shared utility components
```

### State Management
- Use React Context for global state
- Custom hooks for data fetching
- Local state for component-specific data
- Avoid prop drilling

### File Organization
- Group related files together
- Use index files for clean imports
- Separate types into dedicated files
- Keep components focused and small

## 🔧 Development Tools

### Recommended VS Code Extensions
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- Auto Rename Tag

### Debugging
- Use React Developer Tools
- Browser DevTools for performance
- Console logging for development
- Error boundaries for production

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### Design System
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Radix UI Primitives](https://www.radix-ui.com/)

## 🐛 Reporting Issues

### Bug Reports
Use the bug report template and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

### Feature Requests
Use the feature request template and include:
- Problem statement
- Proposed solution
- Alternative solutions considered
- Acceptance criteria

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: support@screema.com for direct contact

## 🎉 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in project documentation

## 📄 License

By contributing to SCREEMA, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SCREEMA! Your efforts help make this project better for everyone. 🚀