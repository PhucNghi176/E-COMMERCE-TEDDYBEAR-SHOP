'use client';

import { Github, Icon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@/contexts/UserContext';

import ThemeToggle from './ThemeToggle';

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user, signOut } = useUser();

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background)]/[0.85] backdrop-blur-lg border-b border-[var(--border)] shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 max-w-full">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold font-poppins bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
            Test
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/posts"
            className="text-md font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200 flex items-center gap-1"
          >
            Gấu bông
            {/* <img src="/teddy-bear.svg" alt="Gấu bông" width={20} height={20} className="inline-block" /> */}
          </Link>
          <Link
            href="/dashboard"
            className="text-md font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
          >
            Móc khoá
          </Link>
          <Link
            href="/"
            className="text-md font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
          >
            Liên hệ
          </Link>
          <ThemeToggle />
        </nav>

        <button
          type="button"
          className="md:hidden text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
          onClick={handleToggle}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 z-50 bg-[var(--background)] border-b border-[var(--border)] shadow-lg md:hidden animate-in slide-in-from-top duration-300 max-w-full">
            <div className="container py-6 flex flex-col space-y-4 px-4 sm:px-6 max-w-full">
              <Link
                href="/posts"
                className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                onClick={handleToggle}
              >
                Gấu bông
              </Link>

              <Link
                href="/dashboard"
                className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                onClick={handleToggle}
              >
                Móc khoá
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                onClick={handleToggle}
              >
                Liên hệ
              </Link>

              <div className="flex items-center justify-between">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
