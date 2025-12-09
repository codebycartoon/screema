# Contributing to SCREEMA

First off, thank you for considering contributing to SCREEMA! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and courteous.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why is this enhancement useful?
- **Possible implementation** approach

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Follow the coding standards below
3. Test your changes thoroughly
4. Update documentation if needed
5. Write clear commit messages following our convention

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/screema.git
cd screema

# Install dependencies
npm install

# Create a branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

## Coding Standards

### TypeScript
- Use TypeScript for all new files
- Define proper types/interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable names

### React Components
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

### Styling
- Use Tailwind CSS utility classes
- Follow existing component patterns
- Ensure responsive design (mobile-first)
- Use shadcn/ui components when possible

### File Structure
```
src/
├── components/
│   └── feature-name/
│       └── ComponentName.tsx
├── hooks/
│   └── useFeatureName.tsx
├── types/
│   └── feature.ts
└── pages/
    └── PageName.tsx
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add seat selection animation
fix: resolve booking confirmation bug
docs: update installation instructions
style: format code with prettier
refactor: simplify payment logic
test: add unit tests for SeatMap
chore: update dependencies
```

## Testing

Before submitting a PR:

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test in browser
npm run preview
```

## Questions?

Feel free to open an issue with the `question` label or reach out to [franklineonguti4@gmail.com](mailto:franklineonguti4@gmail.com).

Thank you for contributing! 🎉
