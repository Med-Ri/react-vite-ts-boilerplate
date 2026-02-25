# Utils Folder

This folder contains utility functions and helper methods that provide common functionality used throughout the application.

## Purpose

- Provide reusable utility functions
- Handle common data transformations
- Implement validation and formatting logic
- Offer helper methods for complex operations
- Centralize shared utility functionality

## Common Utility Categories

### String Utilities
- Text formatting and manipulation
- Validation and sanitization
- Case conversion and normalization
- String parsing and extraction

### Date and Time Utilities
- Date formatting and parsing
- Time calculations and comparisons
- Timezone handling
- Relative time formatting

### Number Utilities
- Number formatting and parsing
- Mathematical calculations
- Currency formatting
- Percentage calculations

### Array and Object Utilities
- Array manipulation and filtering
- Object merging and cloning
- Data transformation
- Search and sorting functions

### Validation Utilities
- Input validation functions
- Email and phone validation
- Password strength checking
- Form validation helpers

### Formatting Utilities
- Text formatting functions
- Data display formatting
- File size formatting
- URL and path utilities

## Utility Function Examples

### String Utilities
```typescript
// string.utils.ts
export const stringUtils = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  truncate: (str: string, length: number, suffix = '...'): string => {
    if (str.length <= length) return str;
    return str.substring(0, length - suffix.length) + suffix;
  },
  
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
  
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};
```

### Date Utilities
```typescript
// date.utils.ts
export const dateUtils = {
  formatDate: (date: Date | string, format = 'YYYY-MM-DD'): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year.toString())
      .replace('MM', month)
      .replace('DD', day);
  },
  
  getRelativeTime: (date: Date | string): string => {
    const now = new Date();
    const target = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  },
  
  isToday: (date: Date | string): boolean => {
    const today = new Date();
    const target = new Date(date);
    return today.toDateString() === target.toDateString();
  }
};
```

### Number Utilities
```typescript
// number.utils.ts
export const numberUtils = {
  formatCurrency: (amount: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  },
  
  formatNumber: (num: number, decimals = 0): string => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num);
  },
  
  formatFileSize: (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  },
  
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  }
};
```

### Array Utilities
```typescript
// array.utils.ts
export const arrayUtils = {
  unique: <T>(array: T[]): T[] => {
    return [...new Set(array)];
  },
  
  groupBy: <T, K extends string | number>(
    array: T[],
    key: (item: T) => K
  ): Record<K, T[]> => {
    return array.reduce((groups, item) => {
      const groupKey = key(item);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {} as Record<K, T[]>);
  },
  
  sortBy: <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
    return [...array].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },
  
  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
};
```

### Object Utilities
```typescript
// object.utils.ts
export const objectUtils = {
  deepClone: <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  },
  
  merge: <T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T => {
    return sources.reduce((acc, source) => {
      return { ...acc, ...source };
    }, target);
  },
  
  pick: <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
      if (key in obj) {
        result[key] = obj[key];
      }
    });
    return result;
  },
  
  omit: <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
    const result = { ...obj };
    keys.forEach(key => {
      delete result[key];
    });
    return result;
  }
};
```

### Validation Utilities
```typescript
// validation.utils.ts
export const validationUtils = {
  isRequired: (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  },
  
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isPhoneNumber: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },
  
  isStrongPassword: (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
  }
};
```

## Utility Best Practices

### 1. Pure Functions
- Avoid side effects
- Return consistent results for same inputs
- Don't modify input parameters

### 2. Type Safety
```typescript
// Use proper TypeScript types
export const formatUser = (user: User): FormattedUser => {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email.toLowerCase(),
    initials: `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
  };
};
```

### 3. Error Handling
```typescript
// Handle errors gracefully
export const safeParseJSON = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
};
```

### 4. Documentation
```typescript
/**
 * Formats a date string into a human-readable format
 * @param date - The date to format
 * @param format - The output format (default: 'MMM DD, YYYY')
 * @returns Formatted date string
 * @example
 * formatDate('2023-12-25', 'MMM DD, YYYY') // 'Dec 25, 2023'
 */
export const formatDate = (date: string, format = 'MMM DD, YYYY'): string => {
  // Implementation
};
```

## Testing Utilities

```typescript
// Utility testing example
import { stringUtils } from './string.utils';

describe('stringUtils', () => {
  test('capitalize should capitalize first letter', () => {
    expect(stringUtils.capitalize('hello')).toBe('Hello');
    expect(stringUtils.capitalize('HELLO')).toBe('Hello');
  });
  
  test('truncate should truncate long strings', () => {
    expect(stringUtils.truncate('Hello World', 5)).toBe('He...');
    expect(stringUtils.truncate('Hello', 10)).toBe('Hello');
  });
});
```

## Usage in Components

```typescript
// Using utilities in components
import { stringUtils, dateUtils, numberUtils } from '@/utils';

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h3>{stringUtils.capitalize(user.name)}</h3>
      <p>Joined: {dateUtils.getRelativeTime(user.createdAt)}</p>
      <p>Posts: {numberUtils.formatNumber(user.postCount)}</p>
    </div>
  );
};
```
