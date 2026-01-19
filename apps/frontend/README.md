# Frontend Application

This directory contains the frontend application.

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
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API service layer
│   ├── utils/        # Utility functions
│   ├── types/        # TypeScript types
│   ├── styles/       # Global styles
│   └── App.tsx       # Main application component
├── public/           # Static assets
└── package.json
```

## 🛠️ Tech Stack

- React 18+
- TypeScript
- CSS/Styling solution (to be chosen)
- React Router (for routing)
- Axios (for API calls)

## 📝 Development Guidelines

- Follow the component structure in `src/components/`
- Use TypeScript for type safety
- Write tests for components
- Follow ESLint and Prettier rules

## 🔗 API Integration

API calls are centralized in `src/services/api.ts`:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
});

export default api;
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```
