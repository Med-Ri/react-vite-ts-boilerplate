# Context Folder

This folder contains React Context providers for global state management and data sharing across the application.

## Purpose

- Manage global application state
- Share data between components without prop drilling
- Provide centralized state management for complex applications
- Handle authentication state, user data, and theme preferences

## File Structure

### `/AuthContext.tsx`
- **Purpose**: Authentication state management
- **State**: User authentication status, user data, tokens
- **Methods**: Login, logout, token refresh, role management
- **Usage**: Wrap the app to provide auth state globally

## Context Pattern

```typescript
// Example context structure
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Context implementation
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

## Common Context Types

### Authentication Context
- User authentication state
- Login/logout functionality
- Token management
- Role-based access control

### Theme Context
- Dark/light mode toggle
- Theme preferences
- Custom theme configurations

### Notification Context
- Global notification state
- Toast messages
- Alert management

### Loading Context
- Global loading states
- Spinner management
- Progress indicators

## Best Practices

1. **Single Responsibility**: Each context should handle one specific concern
2. **Type Safety**: Define proper TypeScript interfaces for context values
3. **Error Handling**: Include error boundaries and error states
4. **Performance**: Use useMemo and useCallback to prevent unnecessary re-renders
5. **Provider Composition**: Compose multiple providers when needed
6. **Custom Hooks**: Create custom hooks for consuming context
7. **Default Values**: Provide sensible default values for context

## Context Provider Structure

```typescript
// ContextProvider.tsx
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
```

## Usage in Components

```typescript
// Using context in components
import { useAuth } from '@/context/AuthContext';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
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

## Testing Context

```typescript
// Context testing
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '@/context/AuthContext';

const renderWithAuth = (ui: React.ReactElement, { user = null } = {}) => {
  return render(
    <AuthProvider value={{ user, isAuthenticated: !!user }}>
      {ui}
    </AuthProvider>
  );
};
```
