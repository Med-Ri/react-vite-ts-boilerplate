# Services Folder

This folder contains business logic services that handle complex operations, data processing, and integration with external services.

## Purpose

- Encapsulate business logic and complex operations
- Handle data transformation and processing
- Manage external service integrations
- Provide reusable service functions
- Separate business logic from UI components

## File Structure

### `/auth.service.ts`
- **Purpose**: Authentication business logic and token management
- **Content**: Login/logout logic, token validation, session management
- **Features**: Token refresh, secure storage, authentication state

### `/token.service.ts`
- **Purpose**: Token management and validation utilities
- **Content**: JWT token handling, token storage, token validation
- **Features**: Token parsing, expiration checking, secure storage

## Service Architecture

### Service Class Pattern
```typescript
// Example service class
export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  
  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.login(credentials);
      this.setToken(response.token);
      return response;
    } catch (error) {
      throw new AuthError('Login failed', error);
    }
  }
  
  private setToken(token: string): void {
    this.token = token;
    SecureStorage.setItem('authToken', token);
  }
}
```

### Functional Service Pattern
```typescript
// Example functional service
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.login(credentials);
      tokenService.setToken(response.token);
      return response;
    } catch (error) {
      throw new AuthError('Login failed', error);
    }
  },
  
  async logout(): Promise<void> {
    try {
      await authApi.logout();
      tokenService.clearToken();
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};
```

## Common Service Types

### Authentication Services
- User authentication and authorization
- Token management and refresh
- Session handling
- Password management

### Data Processing Services
- Data transformation and formatting
- Validation and sanitization
- Caching and optimization
- Error handling and recovery

### External Integration Services
- Third-party API integrations
- Payment processing
- Email and notification services
- File upload and storage

### Utility Services
- Date and time utilities
- String manipulation
- Number formatting
- Data conversion

## Service Implementation Examples

### Authentication Service
```typescript
// auth.service.ts
export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await authApi.login(credentials);
      
      // Store tokens securely
      tokenService.setAccessToken(response.accessToken);
      tokenService.setRefreshToken(response.refreshToken);
      
      // Update auth context
      authContext.setUser(response.user);
      authContext.setAuthenticated(true);
      
      return response;
    } catch (error) {
      throw new AuthError('Login failed', error);
    }
  }
  
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new AuthError('No refresh token available');
      }
      
      const response = await authApi.refreshToken(refreshToken);
      tokenService.setAccessToken(response.accessToken);
      
      return response.accessToken;
    } catch (error) {
      this.logout();
      throw new AuthError('Token refresh failed', error);
    }
  }
}
```

### Token Service
```typescript
// token.service.ts
export class TokenService {
  private static ACCESS_TOKEN_KEY = 'accessToken';
  private static REFRESH_TOKEN_KEY = 'refreshToken';
  
  setAccessToken(token: string): void {
    SecureStorage.setItem(TokenService.ACCESS_TOKEN_KEY, token);
  }
  
  getAccessToken(): string | null {
    return SecureStorage.getItem<string>(TokenService.ACCESS_TOKEN_KEY);
  }
  
  setRefreshToken(token: string): void {
    SecureStorage.setItem(TokenService.REFRESH_TOKEN_KEY, token);
  }
  
  getRefreshToken(): string | null {
    return SecureStorage.getItem<string>(TokenService.REFRESH_TOKEN_KEY);
  }
  
  clearTokens(): void {
    SecureStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
    SecureStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }
}
```

## Service Best Practices

### 1. Single Responsibility
- Each service should handle one specific domain
- Keep services focused and cohesive
- Avoid mixing unrelated functionality

### 2. Error Handling
```typescript
// Consistent error handling
export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export const handleServiceError = (error: any): ServiceError => {
  if (error instanceof ServiceError) {
    return error;
  }
  
  return new ServiceError(
    error.message || 'An unexpected error occurred',
    'UNKNOWN_ERROR',
    500
  );
};
```

### 3. Dependency Injection
```typescript
// Use dependency injection for better testability
export class UserService {
  constructor(
    private apiService: ApiService,
    private cacheService: CacheService
  ) {}
  
  async getUser(id: string): Promise<User> {
    // Check cache first
    const cached = this.cacheService.get(`user:${id}`);
    if (cached) return cached;
    
    // Fetch from API
    const user = await this.apiService.getUser(id);
    
    // Cache the result
    this.cacheService.set(`user:${id}`, user);
    
    return user;
  }
}
```

### 4. Async/Await Pattern
```typescript
// Use async/await for better error handling
export const dataService = {
  async processData(data: any[]): Promise<ProcessedData[]> {
    try {
      const validated = await validationService.validate(data);
      const transformed = await transformationService.transform(validated);
      const enriched = await enrichmentService.enrich(transformed);
      
      return enriched;
    } catch (error) {
      throw new ServiceError('Data processing failed', 'PROCESSING_ERROR');
    }
  }
};
```

## Service Testing

```typescript
// Service testing example
import { AuthService } from './auth.service';
import { mockAuthApi } from '../__mocks__/auth.api';

describe('AuthService', () => {
  let authService: AuthService;
  
  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });
  
  test('should login successfully', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const expectedResponse = { token: 'mock-token', user: { id: '1', email: 'test@example.com' } };
    
    mockAuthApi.login.mockResolvedValue(expectedResponse);
    
    const result = await authService.login(credentials);
    
    expect(result).toEqual(expectedResponse);
    expect(mockAuthApi.login).toHaveBeenCalledWith(credentials);
  });
});
```

## Service Integration

### With Hooks
```typescript
// Use services in custom hooks
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return { user, login, loading };
};
```

### With Context
```typescript
// Use services in context providers
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setAuthState({ user: response.user, isAuthenticated: true });
    } catch (error) {
      setAuthState({ user: null, isAuthenticated: false, error: error.message });
    }
  };
  
  return (
    <AuthContext.Provider value={{ ...authState, login }}>
      {children}
    </AuthContext.Provider>
  );
};
```
