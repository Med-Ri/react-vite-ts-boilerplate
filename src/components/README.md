# Components Folder

This folder contains all reusable React components organized by category and purpose.

## Structure

### `/common`
- **Purpose**: Generic, reusable components used across the application
- **Examples**: Buttons, Inputs, Modals, Cards, Tables, Forms
- **Naming**: Use PascalCase (e.g., `PrimaryButton.tsx`)
- **Props**: Define clear TypeScript interfaces for all props

### `/feedback`
- **Purpose**: Components that provide user feedback
- **Examples**: ErrorBoundary, Loader, Toast, Alerts, Notifications
- **Features**: Error handling, loading states, success/error messages

### `/layout`
- **Purpose**: Layout-related components that structure the page
- **Examples**: Header, Footer, Sidebar, Navigation, Layout wrappers
- **Responsive**: Should be mobile-friendly and responsive

## Component Guidelines

### File Structure
```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.test.tsx     # Unit tests
├── ComponentName.stories.tsx  # Storybook stories (optional)
├── index.ts                   # Export file
└── types.ts                   # Component-specific types
```

### Naming Conventions
- **Files**: PascalCase (e.g., `UserProfile.tsx`)
- **Components**: PascalCase (e.g., `const UserProfile = () => {}`)
- **Props**: camelCase (e.g., `isLoading`, `onSubmit`)

### Best Practices
1. **Single Responsibility**: Each component should have one clear purpose
2. **Reusability**: Design components to be reusable across the app
3. **Props Interface**: Always define TypeScript interfaces for props
4. **Default Props**: Use default props for optional parameters
5. **Error Boundaries**: Wrap components that might fail
6. **Accessibility**: Include proper ARIA attributes
7. **Testing**: Write unit tests for complex components

## Example Component Structure

```typescript
// Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  // Component implementation
};
```
