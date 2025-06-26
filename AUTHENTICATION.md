# Authentication Middleware Documentation

## Overview

This project now includes a comprehensive authentication middleware system that protects routes requiring user authentication and manages redirect flows.

## How It Works

### 1. Middleware (`middleware.ts`)

The middleware runs on the server-side and checks authentication status before allowing access to protected routes.

**Protected Routes:**
- `/dashboard` - User dashboard
- `/dashboard/settings` - Settings page
- Any sub-routes under `/dashboard/*`

**Auth Routes:**
- `/sign-in` - Sign in page
- `/sign-up` - Sign up page

### 2. Authentication Flow

1. **User visits a protected route** (e.g., `/dashboard`)
   - Middleware checks for `token` and `user` cookies
   - If not authenticated: redirects to `/sign-in?redirect=/dashboard`
   - If authenticated: allows access

2. **User visits auth routes while authenticated**
   - Middleware checks authentication status
   - If authenticated: redirects to `/dashboard`
   - If not authenticated: allows access to sign-in/sign-up

3. **User signs in successfully**
   - Token and user data stored in localStorage + cookies
   - Redirected to original destination or `/dashboard`

### 3. Enhanced UserContext

The `UserContext` now automatically syncs authentication data between:
- **localStorage** (for client-side access)
- **Cookies** (for server-side middleware access)

**Key Functions:**
- `setUser()` - Sets user data in localStorage and cookies
- `setToken()` - Sets auth token in localStorage and cookies  
- `signOut()` - Clears all auth data and redirects to sign-in

### 4. Cookie Management

- **Security**: Uses `SameSite=Strict` for CSRF protection
- **Expiration**: Cookies expire after 7 days by default
- **Path**: Set to `/` for application-wide access

## Usage Examples

### Protecting a New Route

To protect a new route, simply add it to the `protectedRoutes` array in `middleware.ts`:

```typescript
const protectedRoutes = [
  '/dashboard',
  '/dashboard/settings',
  '/admin',        // New protected route
  '/profile'       // Another protected route
];
```

### Checking Auth Status in Components

```typescript
import { useUser } from '@/contexts/UserContext';

function MyComponent() {
  const { user, isSignedIn, signOut } = useUser();
  
  if (!isSignedIn) {
    return <div>Please sign in</div>;
  }
  
  return <div>Welcome, {user.name}!</div>;
}
```

### Manual Sign Out

```typescript
const { signOut } = useUser();

// This will clear all auth data and redirect to sign-in
signOut();
```

## Security Features

1. **Server-side Protection**: Middleware runs on the server, preventing client-side bypassing
2. **Automatic Redirects**: Seamless redirect flow preserves user intent
3. **Cookie Security**: Secure cookie settings prevent common attacks
4. **Dual Storage**: localStorage + cookies ensure both client and server can access auth state

## Testing the Middleware

1. **Try accessing `/dashboard` without signing in**
   - Should redirect to `/sign-in?redirect=/dashboard`

2. **Sign in and get redirected back**
   - Should return to original destination

3. **Try accessing `/sign-in` while authenticated**
   - Should redirect to `/dashboard`

4. **Try accessing `/dashboard/settings`**
   - Should be protected by middleware if not authenticated

## File Structure

```
middleware.ts                    # Main authentication middleware
src/contexts/UserContext.tsx    # Enhanced context with cookie sync
src/app/sign-in/[...]/page.tsx # Updated sign-in with redirect support
src/app/dashboard/page.tsx      # Protected dashboard page
src/app/dashboard/settings/page.tsx # Protected settings page
``` 