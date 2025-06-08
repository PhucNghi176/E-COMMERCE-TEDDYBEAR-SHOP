'use client';

import { createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  emailAddresses: Array<{
    emailAddress: string;
    verified?: boolean;
  }>;
  profileImageUrl?: string;
  fullName?: string;
}

interface UserContextType {
  user: User | null;
  isSignedIn: boolean;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // Temporary user data
  const tempUser: User = {
    id: 'temp-user-123',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    emailAddresses: [
      {
        emailAddress: 'john.doe@example.com',
        verified: true
      }
    ],
    profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  };

  const signOut = () => {
    // TODO: Implement your own sign out logic
    console.log('Sign out clicked');
  };

  return (
    <UserContext.Provider value={{
      user: tempUser,
      isSignedIn: true, // Change to false to test signed-out state
      signOut
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 