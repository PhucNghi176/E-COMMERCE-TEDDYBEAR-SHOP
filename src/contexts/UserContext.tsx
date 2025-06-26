'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { User } from '@/types';



interface UserContextType {
  user: User | null;
  isSignedIn: boolean;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const signOut = () => {
    setUser(null);
    console.log('Sign out clicked');
  };

  return (
    <UserContext.Provider value={{
      user: user,
      isSignedIn: !!user,
      setUser,
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