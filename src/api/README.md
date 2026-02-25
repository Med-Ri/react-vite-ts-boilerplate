# API Folder

This folder contains all API-related files for making HTTP requests to the backend.

## Purpose

- Centralize all API calls and HTTP requests
- Provide consistent error handling and response formatting
- Manage authentication tokens and request/response interceptors
- Type-safe API communication with the backend

## File Structure

### `/axiosInstance.ts`
- **Purpose**: Axios configuration and global interceptors
- **Content**: Base URL, timeout, request/response interceptors
- **Features**: Token attachment, error handling, loading states

### `/auth.api.ts`
- **Purpose**: Authentication-related API calls
- **Examples**: login, register, logout, refresh token, password reset
- **Returns**: Typed responses for auth operations

### `/users.api.ts`
- **Purpose**: User management API calls
- **Examples**: get users, create user, update profile, delete user
- **Returns**: Typed user data and responses

## API Function Structure

```typescript
// Example API function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new ApiError(error.response?.data?.message || 'Login failed');
  }
};
```

## Best Practices

1. **Error Handling**: Consistent error handling across all API calls
2. **Type Safety**: Use TypeScript interfaces for request/response types
3. **Interceptors**: Use axios interceptors for common functionality
4. **Base URL**: Configure base URL in axios instance
5. **Timeout**: Set appropriate timeout values
6. **Retry Logic**: Implement retry logic for failed requests
7. **Loading States**: Handle loading states consistently

## Usage Examples

```typescript
// In components or services
import { login, register } from '@/api/auth.api';
import { getUsers, updateUser } from '@/api/users.api';

// Authentication
const handleLogin = async (credentials) => {
  try {
    const response = await login(credentials);
    // Handle success
  } catch (error) {
    // Handle error
  }
};

// User management
const fetchUsers = async () => {
  try {
    const users = await getUsers();
    // Handle users data
  } catch (error) {
    // Handle error
  }
};
```

## Error Handling

```typescript
// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
```
