'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { IToken, User } from '@/types';
import { useRouter } from 'next/navigation';

// Helper functions to manage cookies
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  // URL encode the value to handle special characters in JSON
  const encodedValue = encodeURIComponent(value);
  document.cookie = `${name}=${encodedValue}; expires=${expires.toUTCString()}; path=/; SameSite=Strict`;
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🍪 Setting cookie:', { name, value: value.substring(0, 50) + '...', encodedValue: encodedValue.substring(0, 50) + '...' });
  }
};

const deleteCookie = (name: string) => {
  // Set multiple variations to ensure deletion
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Strict`;
  document.cookie = `${name}=; Max-Age=0; path=/`;
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🗑️ Deleting cookie:', name);
  }
};

interface UserContextType {
  user: User | null;
  isSignedIn: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: IToken | null) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserLocalStorage] = useLocalStorage<User | null>("user", null);
  const [token, setTokenLocalStorage] = useLocalStorage<IToken | null>("token", null);
  const router = useRouter();

  // Enhanced setUser function that syncs with cookies
  const setUser = (newUser: User | null) => {
    setUserLocalStorage(newUser);
    
    if (newUser) {
      // Set user cookie when user is set
      setCookie('user', JSON.stringify(newUser));
    } else {
      // Remove user cookie when user is cleared
      deleteCookie('user');
    }
  };

  // Enhanced setToken function that syncs with cookies
  const setToken = (newToken: IToken | null) => {
    setTokenLocalStorage(newToken);
    
    if (newToken) {
      // Set token cookie when token is set
      setCookie('token', JSON.stringify(newToken));
    } else {
      // Remove token cookie when token is cleared
      deleteCookie('token');
    }
  };

  const signOut = () => {
    // Clear localStorage first
    setUser(null);
    setToken(null);
    
    // Clear cookies
    deleteCookie('user');
    deleteCookie('token');
    
    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚪 Signing out user');
    }
    
    // Force a hard navigation to sign-in to ensure middleware runs
    window.location.href = '/sign-in';
  };

  return (
    <UserContext.Provider value={{
      user: user,
      isSignedIn: !!user,
      setUser,
      setToken,
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