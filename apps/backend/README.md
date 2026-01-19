# Backend API

This directory contains the backend API service.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## 📁 Structure

```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── services/      # Business logic
│   ├── models/        # Data models
│   ├── middleware/    # Express middleware
│   ├── routes/        # API routes
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript types
│   └── index.ts       # Application entry point
├── tests/            # Test files
└── package.json
```

## 🛠️ Tech Stack

- Node.js 18+
- Express.js
- TypeScript
- PostgreSQL
- Prisma/TypeORM (ORM)
- JWT (authentication)

## 📝 Development Guidelines

- Follow RESTful API conventions
- Use TypeScript for type safety
- Write tests for endpoints
- Follow ESLint and Prettier rules
- Use middleware for common functionality

## 🔒 Authentication

API uses JWT tokens for authentication:

```typescript
// Protect routes with auth middleware
router.get('/protected', authMiddleware, controller);
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 🗄️ Database

### Migrations

```bash
# Create migration
npm run migration:create

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
```

### Seeding

```bash
# Seed database
npm run seed
```
