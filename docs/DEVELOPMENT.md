# Development Guide

This guide will help you set up your development environment and understand the development workflow.

## 🔧 Prerequisites

### Required Software

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn** (v1.22+) or **pnpm** (v8+)
- **Git** (v2.30+)
- **Docker** (v20+ for containerized development)
- **PostgreSQL** (v14+ if running locally)

### Recommended Tools

- **VS Code** with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Language Features
  - Docker
  - GitLens
- **Postman** or **Insomnia** for API testing
- **pgAdmin** or **DBeaver** for database management

## 🚀 Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/madhusamsani/sammedcode-platform-template.git
cd sammedcode-platform-template
```

### 2. Install Dependencies

```bash
# Install all dependencies for monorepo
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Set Up Environment Variables

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Set Up Database

#### Option A: Using Docker

```bash
docker-compose up -d db
```

#### Option B: Local PostgreSQL

```bash
# Create database
createdb sammedcode

# Run migrations (once implemented)
npm run migrate
```

## 💻 Development Workflow

### Starting Development Servers

```bash
# Start all services
npm run dev

# Start only frontend
npm run dev:frontend

# Start only backend
npm run dev:backend
```

### Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type checking
npm run type-check
```

### Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test path/to/test.spec.ts
```

### Building

```bash
# Build all applications
npm run build

# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend
```

## 📁 Project Structure Explained

### Frontend Structure

```
apps/frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── pages/           # Route pages
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API service layer
│   ├── utils/           # Utility functions
│   ├── types/           # TypeScript types
│   └── styles/          # Global styles
└── public/              # Static assets
```

### Backend Structure

```
apps/backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── models/          # Data models
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript types
└── tests/               # Test files
```

## 🎨 Coding Standards

### TypeScript

```typescript
// ✅ Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// ❌ Bad: Implicit any
function getUser(id) {
  // implementation
}
```

### Components

```typescript
// ✅ Good: Functional component with props interface
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  disabled = false 
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

// ❌ Bad: No type safety
export const Button = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### API Routes

```typescript
// ✅ Good: Proper error handling and types
import { Request, Response, NextFunction } from 'express';

interface CreateUserRequest {
  name: string;
  email: string;
}

export const createUser = async (
  req: Request<{}, {}, CreateUserRequest>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const user = await userService.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// ❌ Bad: No types, poor error handling
export const createUser = async (req, res) => {
  const user = await userService.create(req.body);
  res.json(user);
};
```

## 🔄 Git Workflow

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation updates

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(auth): add login endpoint
fix(user): correct email validation
docs(readme): update setup instructions
refactor(api): simplify error handling
```

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit
3. Push to your fork
4. Create Pull Request
5. Wait for review and address feedback
6. Merge after approval

## 🐛 Debugging

### Frontend Debugging

```bash
# Enable React Developer Tools in browser
# Add debugger statements in code
debugger;

# Use console.log for quick debugging
console.log('Debug:', { variable });
```

### Backend Debugging

```bash
# Use VS Code debugger with launch.json
# Add breakpoints in code
# Start debugging session (F5)

# Or use node inspector
node --inspect src/index.ts
```

### Docker Debugging

```bash
# View logs
docker-compose logs -f backend

# Execute commands in container
docker-compose exec backend sh

# Rebuild specific service
docker-compose up -d --build backend
```

## 🧪 Testing Best Practices

### Unit Tests

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### API Tests

```typescript
import request from 'supertest';
import app from '../app';

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });
});
```

## 📊 Database Management

### Migrations

```bash
# Create new migration
npm run migration:create -- AddUserTable

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Seeding

```bash
# Seed database with test data
npm run seed

# Reset database
npm run db:reset
```

## 🔍 Common Issues

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Database Connection Issues

```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in .env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Architecture Guide](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 🆘 Getting Help

- Check existing documentation
- Search GitHub issues
- Ask in team chat
- Contact maintainers
