# Auth Module

This module handles all authentication and authorization functionality in the application.

## Purpose

- User authentication (login, logout, registration)
- Password management (reset, change)
- Token management and refresh
- Role-based access control
- Session management

## Structure

### `/components`
- **LoginForm**: User login form with validation
- **RegisterForm**: User registration form
- **ForgotPasswordForm**: Password reset request form
- **ResetPasswordForm**: Password reset form
- **AuthGuard**: Component wrapper for protected routes

### `/hooks`
- **useAuth**: Main authentication hook
- **useLogin**: Login functionality hook
- **useLogout**: Logout functionality hook
- **useRegister**: Registration functionality hook
- **usePasswordReset**: Password reset functionality hook

### `/pages`
- **LoginPage**: Login page component
- **RegisterPage**: Registration page component
- **ForgotPasswordPage**: Forgot password page
- **ResetPasswordPage**: Password reset page
- **UnauthorizedPage**: Access denied page

### `/types.ts`
- **AuthUser**: User data structure
- **LoginCredentials**: Login form data
- **RegisterData**: Registration form data
- **AuthResponse**: API response structure
- **PasswordResetData**: Password reset form data

## Usage Examples

### Using Auth Hook
```typescript
import { useAuth } from '@/modules/auth/hooks/useAuth';

const UserProfile = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Using Login Form
```typescript
import { LoginForm } from '@/modules/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Sign In</h1>
      <LoginForm />
    </div>
  );
};
```

### Protected Routes
```typescript
import { AuthGuard } from '@/modules/auth/components/AuthGuard';

const ProtectedPage = () => {
  return (
    <AuthGuard>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
};
```

## API Integration

The auth module integrates with the following API endpoints:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset

## State Management

The auth module uses React Context for state management:
- User authentication state
- Loading states for async operations
- Error states and messages
- Token management

## Security Features

- JWT token handling
- Automatic token refresh
- Secure token storage
- CSRF protection
- Input validation and sanitization

## Testing

Each component and hook should have comprehensive tests:
- Unit tests for individual components
- Integration tests for auth flows
- Mock API responses
- Error handling tests
