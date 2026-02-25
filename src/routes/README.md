# Routes Folder

This folder contains all routing configuration and route protection components for the application.

## Purpose

- Define application routes and navigation structure
- Implement route protection and access control
- Handle public and protected route logic
- Manage role-based route access
- Provide route-level authentication checks

## File Structure

### `/AppRoutes.tsx`
- **Purpose**: Main routing configuration and route definitions
- **Content**: Route paths, components, and navigation structure
- **Features**: Route nesting, lazy loading, route guards

### `/ProtectedRoute.tsx`
- **Purpose**: Route wrapper for authenticated users only
- **Content**: Authentication check and redirect logic
- **Usage**: Wrap routes that require user login

### `/PublicRoute.tsx`
- **Purpose**: Route wrapper for public access
- **Content**: Redirect logic for already authenticated users
- **Usage**: Wrap routes accessible without login

### `/RoleRoute.tsx`
- **Purpose**: Route wrapper for role-based access control
- **Content**: Role checking and permission validation
- **Usage**: Wrap routes that require specific user roles

## Route Configuration

### Basic Route Structure
```typescript
// AppRoutes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { RoleRoute } from './RoleRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicRoute><LandingPage /></PublicRoute>
  },
  {
    path: '/login',
    element: <PublicRoute><LoginPage /></PublicRoute>
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={['admin']}>
          <AdminPage />
        </RoleRoute>
      </ProtectedRoute>
    )
  }
]);
```

### Route Protection Components

#### ProtectedRoute
```typescript
// ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};
```

#### PublicRoute
```typescript
// PublicRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};
```

#### RoleRoute
```typescript
// RoleRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UnauthorizedPage } from '@/pages/UnauthorizedPage';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const RoleRoute: React.FC<RoleRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <UnauthorizedPage />;
  }
  
  return <>{children}</>;
};
```

## Route Organization

### Route Categories

#### Public Routes
- Landing page
- Authentication pages (login, register, forgot password)
- Information pages (about, contact, privacy)
- Error pages (404, 500)

#### Protected Routes
- Dashboard and main application
- User profile and settings
- Feature-specific pages
- User-generated content

#### Admin Routes
- User management
- System administration
- Reports and analytics
- Configuration settings

### Nested Routes
```typescript
// Nested route structure
{
  path: '/dashboard',
  element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
  children: [
    {
      path: '',
      element: <DashboardHome />
    },
    {
      path: 'profile',
      element: <ProfilePage />
    },
    {
      path: 'settings',
      element: <SettingsPage />
    }
  ]
}
```

## Route Guards and Middleware

### Authentication Guard
- Check if user is authenticated
- Redirect to login if not authenticated
- Preserve intended destination

### Authorization Guard
- Check user permissions and roles
- Redirect to unauthorized page if insufficient permissions
- Log access attempts for security

### Route Validation
- Validate route parameters
- Check route accessibility
- Handle invalid routes gracefully

## Lazy Loading

```typescript
// Lazy load components for better performance
import { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('@/pages/protected/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/protected/ProfilePage'));

// Wrap with Suspense for loading states
<Suspense fallback={<div>Loading...</div>}>
  <DashboardPage />
</Suspense>
```

## Route Parameters and Query Strings

```typescript
// Handle route parameters
import { useParams, useSearchParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  
  return <div>User: {userId}, Tab: {tab}</div>;
};
```

## Navigation Utilities

```typescript
// Navigation helper functions
import { useNavigate } from 'react-router-dom';

const useNavigation = () => {
  const navigate = useNavigate();
  
  const goToLogin = () => navigate('/login');
  const goToDashboard = () => navigate('/dashboard');
  const goBack = () => navigate(-1);
  
  return { goToLogin, goToDashboard, goBack };
};
```

## Best Practices

1. **Route Protection**: Always protect sensitive routes
2. **Role-Based Access**: Implement proper role checking
3. **Error Handling**: Handle invalid routes gracefully
4. **Loading States**: Show loading indicators for lazy-loaded routes
5. **URL Structure**: Use clean, descriptive URLs
6. **Deep Linking**: Support direct URL access
7. **Breadcrumbs**: Implement navigation breadcrumbs for complex routes

## Testing Routes

```typescript
// Route testing example
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

test('renders login page for unauthenticated user', () => {
  renderWithRouter(<AppRoutes />);
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});
```
