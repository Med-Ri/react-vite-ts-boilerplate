# Pages Folder

This folder contains all page-level components that represent different routes and views in the application.

## Purpose

- Define the main views and routes of the application
- Organize pages by access level (public vs protected)
- Provide page-level layout and structure
- Handle page-specific state and data fetching

## Structure

### `/public`
- **Purpose**: Pages accessible without authentication
- **Examples**: Landing page, login, register, forgot password, about
- **Access**: No authentication required
- **Layout**: Public layout with minimal navigation

### `/protected`
- **Purpose**: Pages that require user authentication
- **Examples**: Dashboard, profile, settings, user management
- **Access**: Authentication required
- **Layout**: Protected layout with full navigation and user menu

### `/UnauthorizedPage.tsx`
- **Purpose**: Access denied page for unauthorized users
- **Usage**: Shown when user lacks required permissions
- **Content**: Error message and navigation options

## Page Component Structure

```typescript
// Example page component
import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { usePageData } from '@/hooks/usePageData';

interface PageProps {
  // Page-specific props
}

export const ExamplePage: React.FC<PageProps> = () => {
  const { data, loading, error } = usePageData();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <PageLayout>
      <PageHeader title="Page Title" />
      <div className="page-content">
        {/* Page content */}
      </div>
    </PageLayout>
  );
};
```

## Public Pages

### Landing Page
- Hero section with call-to-action
- Features overview
- Pricing information
- Contact information

### Authentication Pages
- Login page with form validation
- Registration page with user onboarding
- Forgot password page
- Password reset page

### Information Pages
- About page with company information
- Privacy policy page
- Terms of service page
- Contact page with form

## Protected Pages

### Dashboard
- User overview and statistics
- Quick actions and shortcuts
- Recent activity feed
- Personalized content

### Profile Pages
- User profile display
- Profile editing form
- Account settings
- Security settings

### Management Pages
- User management (admin)
- Content management
- System settings
- Reports and analytics

## Page Best Practices

### 1. Layout Consistency
```typescript
// Use consistent page layout
const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Header />
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
    <Footer />
  </div>
);
```

### 2. Loading States
```typescript
// Handle loading states consistently
const PageWithLoading: React.FC = () => {
  const { data, loading } = usePageData();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }
  
  return <div>{/* Page content */}</div>;
};
```

### 3. Error Handling
```typescript
// Handle errors gracefully
const PageWithErrorHandling: React.FC = () => {
  const { data, error } = usePageData();
  
  if (error) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-red-600 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }
  
  return <div>{/* Page content */}</div>;
};
```

### 4. SEO and Meta Tags
```typescript
// Add SEO meta tags
import { Helmet } from 'react-helmet-async';

const SEOPage: React.FC = () => (
  <>
    <Helmet>
      <title>Page Title | MyEasyDiet</title>
      <meta name="description" content="Page description" />
      <meta name="keywords" content="keyword1, keyword2" />
    </Helmet>
    <div>{/* Page content */}</div>
  </>
);
```

## Page Organization

### File Naming
- Use PascalCase for page components
- Include "Page" suffix (e.g., `LoginPage.tsx`)
- Use descriptive names that match the route

### Folder Structure
```
pages/
├── public/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── AboutPage.tsx
├── protected/
│   ├── DashboardPage.tsx
│   ├── ProfilePage.tsx
│   ├── SettingsPage.tsx
│   └── UserManagementPage.tsx
└── UnauthorizedPage.tsx
```

## Routing Integration

Pages are connected to routes in the routing configuration:

```typescript
// In AppRoutes.tsx
const routes = [
  {
    path: '/',
    element: <LandingPage />,
    public: true
  },
  {
    path: '/login',
    element: <LoginPage />,
    public: true
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    protected: true
  }
];
```

## Testing Pages

```typescript
// Page testing example
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

test('renders login page', () => {
  renderWithRouter(<LoginPage />);
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});
```
