# Types Folder

This folder contains TypeScript type definitions, interfaces, and type utilities used throughout the application.

## Purpose

- Define shared types and interfaces
- Ensure type safety across the application
- Provide IntelliSense and autocompletion
- Document data structures and API contracts

## File Organization

### `/common.ts`
- **Purpose**: Common types used across multiple modules
- **Examples**: API responses, pagination, common UI states
- **Content**: Base interfaces, utility types, shared enums

### `/global.d.ts`
- **Purpose**: Global type declarations and module augmentations
- **Examples**: Window object extensions, module declarations
- **Content**: Global interfaces, module declarations, ambient types

## Type Categories

### API Types
```typescript
// API Response wrapper
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  status: number;
}

// Pagination
interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
```

### User/Auth Types
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}
```

### Component Props Types
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}
```

### Form Types
```typescript
interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}
```

## Naming Conventions

- **Interfaces**: PascalCase (e.g., `UserProfile`, `ApiResponse`)
- **Types**: PascalCase (e.g., `UserRole`, `ButtonVariant`)
- **Enums**: PascalCase (e.g., `UserRole`, `HttpStatus`)
- **Generic Types**: Single uppercase letter (e.g., `T`, `K`, `V`)

## Best Practices

1. **Descriptive Names**: Use clear, descriptive names for types
2. **Consistency**: Follow consistent naming patterns
3. **Documentation**: Add JSDoc comments for complex types
4. **Reusability**: Create generic types for reusable patterns
5. **Strictness**: Use strict TypeScript configuration
6. **Exports**: Export types that might be used elsewhere
7. **Grouping**: Group related types together in the same file

## Type Utilities

```typescript
// Utility types
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;

// Mapped types
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## Example File Structure

```typescript
// common.ts
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, any>;
}
```
