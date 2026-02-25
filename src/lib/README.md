# Lib Folder

This folder contains library configurations, constants, and utility functions that are used throughout the application.

## Purpose

- Store application-wide constants and configurations
- Provide utility functions and helper methods
- Manage application settings and environment variables
- Define reusable business logic and data structures

## File Structure

### `/constants.ts`
- **Purpose**: Application-wide constants and configuration values
- **Content**: API endpoints, default values, configuration settings
- **Examples**: API_BASE_URL, DEFAULT_PAGE_SIZE, THEME_COLORS

### `/roles.ts`
- **Purpose**: User role definitions and permissions
- **Content**: Role enums, permission mappings, access control logic
- **Examples**: ADMIN, USER, MODERATOR roles and their permissions

### `/secureStorage.ts`
- **Purpose**: Secure storage utilities for sensitive data
- **Content**: Encrypted storage functions, token management
- **Examples**: Store/retrieve JWT tokens, user preferences securely

## Constants Organization

```typescript
// constants.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout'
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    AVATAR: '/users/avatar'
  }
} as const;

export const DEFAULT_CONFIG = {
  PAGE_SIZE: 10,
  DEBOUNCE_DELAY: 300,
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  MAX_FILE_SIZE: 5 * 1024 * 1024 // 5MB
} as const;

export const THEME = {
  COLORS: {
    PRIMARY: '#3b82f6',
    SECONDARY: '#64748b',
    SUCCESS: '#10b981',
    ERROR: '#ef4444',
    WARNING: '#f59e0b'
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px'
  }
} as const;
```

## Role Management

```typescript
// roles.ts
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: [
    'users:read',
    'users:write',
    'users:delete',
    'settings:read',
    'settings:write'
  ],
  [UserRole.USER]: [
    'profile:read',
    'profile:write'
  ],
  [UserRole.MODERATOR]: [
    'users:read',
    'users:write',
    'content:moderate'
  ]
} as const;

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false;
};
```

## Secure Storage

```typescript
// secureStorage.ts
export class SecureStorage {
  private static encrypt(data: string): string {
    // Encryption logic here
    return btoa(data);
  }

  private static decrypt(encryptedData: string): string {
    // Decryption logic here
    return atob(encryptedData);
  }

  static setItem(key: string, value: any): void {
    try {
      const encryptedValue = this.encrypt(JSON.stringify(value));
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      console.error('Failed to store data securely:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      
      const decryptedValue = this.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error('Failed to retrieve data securely:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
```

## Best Practices

1. **Immutability**: Use `as const` for constant objects to ensure immutability
2. **Type Safety**: Define proper TypeScript types for all constants
3. **Organization**: Group related constants together
4. **Naming**: Use descriptive, UPPER_CASE names for constants
5. **Documentation**: Add JSDoc comments for complex constants
6. **Environment**: Use environment variables for sensitive configuration
7. **Validation**: Validate configuration values at startup

## Usage Examples

```typescript
// Using constants in components
import { API_ENDPOINTS, DEFAULT_CONFIG } from '@/lib/constants';
import { UserRole, hasPermission } from '@/lib/roles';
import { SecureStorage } from '@/lib/secureStorage';

// API calls
const response = await fetch(`${API_ENDPOINTS.AUTH.LOGIN}`, {
  method: 'POST',
  body: JSON.stringify(credentials)
});

// Role checking
if (hasPermission(userRole, 'users:write')) {
  // Show edit button
}

// Secure storage
SecureStorage.setItem('authToken', token);
const storedToken = SecureStorage.getItem<string>('authToken');
```

## Configuration Management

```typescript
// Environment-based configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  environment: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
} as const;
```
