# Modules Folder

This folder contains feature-based modules that organize related functionality into self-contained units.

## Purpose

- Organize code by feature/domain rather than by technical concerns
- Create self-contained modules with their own components, hooks, pages, and types
- Improve code maintainability and scalability
- Enable team members to work on different features independently

## Module Structure

Each module should follow this consistent structure:

```
module-name/
├── components/          # Module-specific components
├── hooks/              # Module-specific custom hooks
├── pages/              # Module-specific pages/views
├── types.ts            # Module-specific TypeScript types
├── api/                # Module-specific API calls (optional)
├── services/           # Module-specific business logic (optional)
├── utils/              # Module-specific utility functions (optional)
└── README.md           # Module documentation
```

## Current Modules

### `/auth`
- **Purpose**: Authentication and authorization functionality
- **Components**: Login forms, registration forms, password reset
- **Hooks**: useAuth, useLogin, useLogout
- **Pages**: Login, Register, ForgotPassword, ResetPassword
- **Types**: AuthUser, LoginCredentials, AuthResponse

### `/users`
- **Purpose**: User management and profile functionality
- **Components**: UserProfile, UserList, UserForm
- **Hooks**: useUsers, useUserProfile, useUserUpdate
- **Pages**: UserList, UserProfile, EditProfile
- **Types**: User, UserProfile, UserUpdateData

## Module Development Guidelines

### 1. Self-Contained Modules
- Each module should be as independent as possible
- Minimize dependencies between modules
- Use shared utilities from `/lib` and `/utils` when needed

### 2. Consistent File Organization
```typescript
// types.ts - Module-specific types
export interface User {
  id: string;
  name: string;
  email: string;
}

// components/UserCard.tsx - Module components
export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  // Component implementation
};

// hooks/useUsers.ts - Module hooks
export const useUsers = () => {
  // Hook implementation
};

// pages/UserList.tsx - Module pages
export const UserList: React.FC = () => {
  // Page implementation
};
```

### 3. Module Communication
- Use shared context for cross-module communication
- Implement event-based communication when needed
- Avoid direct imports between modules

### 4. API Integration
```typescript
// api/user.api.ts - Module-specific API calls
export const userApi = {
  getUsers: () => api.get('/users'),
  getUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: UserUpdateData) => api.put(`/users/${id}`, data)
};
```

## Best Practices

1. **Single Responsibility**: Each module should handle one business domain
2. **Clear Boundaries**: Define clear interfaces between modules
3. **Reusability**: Design components and hooks to be reusable
4. **Testing**: Include tests for each module's functionality
5. **Documentation**: Document each module's purpose and usage
6. **Type Safety**: Use TypeScript for all module interfaces
7. **Error Handling**: Implement proper error handling within modules

## Module Example Structure

```typescript
// Example: Product module
products/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── ProductForm.tsx
│   └── ProductFilter.tsx
├── hooks/
│   ├── useProducts.ts
│   ├── useProduct.ts
│   └── useProductSearch.ts
├── pages/
│   ├── ProductListPage.tsx
│   ├── ProductDetailPage.tsx
│   └── ProductCreatePage.tsx
├── types.ts
├── api/
│   └── product.api.ts
└── README.md
```

## Adding New Modules

1. Create the module folder with the standard structure
2. Implement the core functionality (types, components, hooks, pages)
3. Add module-specific API calls if needed
4. Create comprehensive tests
5. Document the module in its README.md
6. Update the main modules README with the new module

## Module Dependencies

- **Shared Dependencies**: Use `/lib`, `/utils`, `/types/common` for shared functionality
- **Context**: Use global context providers for cross-module state
- **Routing**: Define module routes in the main routing configuration
- **API**: Use the shared API instance from `/api/axiosInstance`

## Testing Modules

```typescript
// Module testing example
import { render, screen } from '@testing-library/react';
import { UserCard } from '../components/UserCard';
import { User } from '../types';

const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

test('renders user card with user data', () => {
  render(<UserCard user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});
```
