# Shared Libraries

This directory contains shared libraries and utilities used across the platform.

## 📁 Structure

```
libs/
├── common/           # Common utilities
│   ├── logger/       # Logging utilities
│   ├── config/       # Configuration helpers
│   └── utils/        # General utilities
├── types/            # TypeScript type definitions
│   ├── user.ts       # User types
│   ├── api.ts        # API types
│   └── index.ts      # Type exports
└── validation/       # Validation schemas
    ├── user.ts       # User validation
    └── index.ts      # Validation exports
```

## 🎯 Purpose

Shared libraries promote code reuse and consistency across frontend and backend applications.

## 📝 Guidelines

- Keep libraries framework-agnostic
- Write comprehensive tests
- Document all exported functions
- Use TypeScript for type safety

## 🔧 Usage

Import shared libraries in your applications:

```typescript
// In frontend or backend
import { logger } from '@libs/common/logger';
import { UserType } from '@libs/types';
import { validateUser } from '@libs/validation';
```
