// Common utility functions
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Note: For production use, import crypto module and use crypto.randomUUID()
// This is a placeholder implementation for the template
export const generateId = (): string => {
  // In a real implementation, use: import { randomUUID } from 'crypto'; return randomUUID();
  return Math.random().toString(36).substring(2, 15);
};
