'use client';

import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TestAuthPage() {
  const { user, isSignedIn, signOut } = useUser();
  const [cookies, setCookies] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Get all cookies for debugging
    const cookieString = document.cookie;
    const cookieObj: { [key: string]: string } = {};
    
    cookieString.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name) {
        cookieObj[name] = value || '';
      }
    });
    
    setCookies(cookieObj);
  }, [user]);

  const testRoutes = [
    { path: '/dashboard', name: 'Dashboard (Protected)' },
    { path: '/dashboard/settings', name: 'Settings (Protected)' },
    { path: '/sign-in', name: 'Sign In (Auth Route)' },
    { path: '/', name: 'Home (Public)' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Authentication Middleware Test
        </h1>

        {/* Authentication Status */}
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            Authentication Status
          </h2>
          <div className="space-y-2">
            <p className="text-[var(--muted-foreground)]">
              <span className="font-medium">Signed In:</span>{' '}
              <span className={isSignedIn ? 'text-green-500' : 'text-red-500'}>
                {isSignedIn ? '✅ Yes' : '❌ No'}
              </span>
            </p>
            {user && (
              <>
                <p className="text-[var(--muted-foreground)]">
                  <span className="font-medium">User Name:</span> {user.name}
                </p>
                <p className="text-[var(--muted-foreground)]">
                  <span className="font-medium">User Email:</span> {user.email}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Cookie Debug Info */}
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            Cookie Debug Info
          </h2>
          <div className="space-y-2">
            <p className="text-[var(--muted-foreground)]">
              <span className="font-medium">Token Cookie:</span>{' '}
              <span className={cookies.token ? 'text-green-500' : 'text-red-500'}>
                {cookies.token ? '✅ Present' : '❌ Missing'}
              </span>
            </p>
            <p className="text-[var(--muted-foreground)]">
              <span className="font-medium">User Cookie:</span>{' '}
              <span className={cookies.user ? 'text-green-500' : 'text-red-500'}>
                {cookies.user ? '✅ Present' : '❌ Missing'}
              </span>
            </p>
            {cookies.token && (
              <p className="text-[var(--muted-foreground)] text-xs break-all">
                <span className="font-medium">Token Value:</span> {cookies.token.substring(0, 100)}...
              </p>
            )}
            {cookies.user && (
              <p className="text-[var(--muted-foreground)] text-xs break-all">
                <span className="font-medium">User Value:</span> {cookies.user.substring(0, 100)}...
              </p>
            )}
          </div>
        </div>

        {/* Test Routes */}
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            Test Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="block p-4 bg-[var(--muted)] hover:bg-[var(--accent)] rounded-md transition-colors"
              >
                <span className="font-medium text-[var(--foreground)]">{route.name}</span>
                <br />
                <span className="text-sm text-[var(--muted-foreground)]">{route.path}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
            Actions
          </h2>
          <div className="space-x-4">
            {isSignedIn ? (
              <button
                onClick={signOut}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/sign-in"
                className="inline-block px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] rounded-md transition-colors"
              >
                Go to Sign In
              </Link>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
            Testing Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700 dark:text-yellow-300">
            <li>If not signed in, try clicking "Dashboard (Protected)" - should redirect to sign-in</li>
            <li>Sign in, then try clicking "Sign In (Auth Route)" - should redirect to dashboard</li>
            <li>When signed in, try "Settings (Protected)" - should work</li>
            <li>Sign out and verify all cookies are cleared</li>
            <li>Check browser console for middleware debug logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 