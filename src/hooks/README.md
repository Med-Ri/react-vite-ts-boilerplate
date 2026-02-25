# Hooks Folder

This folder contains custom React hooks that encapsulate reusable stateful logic and side effects.

## Purpose

Custom hooks allow you to:
- Extract component logic into reusable functions
- Share stateful logic between components
- Keep components clean and focused on rendering
- Test logic independently from components

## Naming Convention

- **Files**: camelCase starting with 'use' (e.g., `useAuth.ts`)
- **Hooks**: camelCase starting with 'use' (e.g., `const useAuth = () => {}`)

## Common Hook Patterns

### State Management Hooks
- `useLocalStorage` - Persist state to localStorage
- `useSessionStorage` - Persist state to sessionStorage
- `useToggle` - Toggle boolean state
- `useCounter` - Counter state with increment/decrement

### API/Data Hooks
- `useApi` - Generic API call hook
- `useFetch` - Data fetching with loading/error states
- `useMutation` - Handle POST/PUT/DELETE operations
- `usePagination` - Pagination logic

### UI/Interaction Hooks
- `useClickOutside` - Detect clicks outside element
- `useDebounce` - Debounce values
- `useThrottle` - Throttle function calls
- `useMediaQuery` - Responsive design logic

### Authentication Hooks
- `useAuth` - Authentication state and methods
- `useRole` - User role management
- `usePermissions` - Permission checking

## Hook Structure Template

```typescript
// useExample.ts
import { useState, useEffect, useCallback } from 'react';

interface UseExampleReturn {
  data: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useExample = (param: string): UseExampleReturn => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // API call or logic here
      const result = await apiCall(param);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [param]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
```

## Best Practices

1. **Single Responsibility**: Each hook should have one clear purpose
2. **Return Object**: Return an object with named properties for clarity
3. **Dependencies**: Properly handle dependencies in useEffect
4. **Error Handling**: Include error states and handling
5. **Loading States**: Provide loading indicators
6. **Cleanup**: Clean up subscriptions and timers
7. **Testing**: Write tests for custom hooks using React Testing Library
8. **Documentation**: Document parameters and return values

## Testing Hooks

```typescript
// useExample.test.ts
import { renderHook, act } from '@testing-library/react';
import { useExample } from './useExample';

test('should fetch data successfully', async () => {
  const { result } = renderHook(() => useExample('test-param'));
  
  expect(result.current.loading).toBe(true);
  
  await act(async () => {
    // Wait for async operations
  });
  
  expect(result.current.data).toBeDefined();
  expect(result.current.loading).toBe(false);
});
```
