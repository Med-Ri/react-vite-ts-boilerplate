# Users Module

This module handles all user management and profile functionality in the application.

## Purpose

- User profile management
- User list and search functionality
- User role management
- Avatar and profile image handling
- User settings and preferences

## Structure

### `/components`
- **UserCard**: Individual user display component
- **UserList**: List of users with pagination
- **UserProfile**: User profile display component
- **UserForm**: User creation/editing form
- **UserSearch**: User search and filtering component
- **AvatarUpload**: Profile picture upload component

### `/hooks`
- **useUsers**: Fetch and manage users list
- **useUser**: Fetch individual user data
- **useUserProfile**: Current user profile management
- **useUserUpdate**: Update user information
- **useUserSearch**: Search and filter users
- **useAvatarUpload**: Handle profile picture uploads

### `/pages`
- **UserListPage**: Users listing page
- **UserProfilePage**: Individual user profile page
- **EditProfilePage**: Edit current user profile
- **UserSettingsPage**: User preferences and settings

### `/types.ts`
- **User**: User data structure
- **UserProfile**: Profile information
- **UserUpdateData**: User update form data
- **UserSearchParams**: Search and filter parameters
- **UserListResponse**: Paginated users response

## Usage Examples

### Using Users Hook
```typescript
import { useUsers } from '@/modules/users/hooks/useUsers';

const UserList = () => {
  const { users, loading, error, refetch } = useUsers();
  
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
```

### Using User Profile
```typescript
import { useUserProfile } from '@/modules/users/hooks/useUserProfile';

const ProfilePage = () => {
  const { user, updateProfile, loading } = useUserProfile();
  
  const handleUpdate = async (data: UserUpdateData) => {
    try {
      await updateProfile(data);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <div>
      <h1>Profile</h1>
      <UserProfile user={user} onUpdate={handleUpdate} />
    </div>
  );
};
```

### Using User Search
```typescript
import { useUserSearch } from '@/modules/users/hooks/useUserSearch';

const UserSearch = () => {
  const { searchUsers, results, loading } = useUserSearch();
  
  const handleSearch = (query: string) => {
    searchUsers({ query, limit: 10 });
  };
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search users..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      {loading && <div>Searching...</div>}
      {results.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};
```

## API Integration

The users module integrates with the following API endpoints:
- `GET /users` - Get users list with pagination
- `GET /users/:id` - Get specific user
- `PUT /users/:id` - Update user information
- `DELETE /users/:id` - Delete user (admin only)
- `POST /users/avatar` - Upload profile picture
- `GET /users/search` - Search users

## Features

### User Management
- Create, read, update, delete users
- Pagination and sorting
- Search and filtering
- Role-based access control

### Profile Management
- Profile information editing
- Avatar upload and management
- Settings and preferences
- Activity history

### Search and Filtering
- Real-time search
- Advanced filtering options
- Sort by various criteria
- Pagination support

## State Management

The users module uses:
- React hooks for local state
- Context for global user state
- API integration for data fetching
- Optimistic updates for better UX

## Security Considerations

- Role-based access control
- Input validation and sanitization
- File upload security
- Data privacy protection

## Testing

Each component and hook should have comprehensive tests:
- Unit tests for components
- Integration tests for user flows
- API mocking for data fetching
- Error handling tests
