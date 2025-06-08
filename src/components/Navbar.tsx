'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--background)]/[0.85] backdrop-blur-lg border-b border-[var(--border)] shadow-sm">
      <div className="container flex h-20 items-center justify-between px-4 sm:px-6 max-w-full">
        <Link href="/">

          <img src="/logo.png" alt="logo" className="w-20 h-20" />

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
          className="md:hidden p-2 rounded-md text-[var(--foreground)] hover:text-[var(--primary)] hover:bg-[var(--accent)] transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          onClick={handleToggle}
        >
          <div className="relative w-6 h-6">
            <Menu
              className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
            />
            <X
              className={`h-6 w-6 absolute transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
            />
          </div>
        </button>

        <div className={`fixed inset-x-0 top-19 z-50 bg-[var(--background)] border-b border-[var(--border)] shadow-lg md:hidden overflow-hidden transition-all duration-500 ease-in-out max-w-full ${mobileMenuOpen
            ? 'max-h-screen opacity-100 transform translate-y-0'
            : 'max-h-0 opacity-0 transform -translate-y-4'
          }`}>
          <div className={`container py-6 flex flex-col space-y-4 px-4 sm:px-6 max-w-full transition-all duration-300 ease-in-out delay-100 ${mobileMenuOpen ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
            }`}>
            <Link
              href="/posts"
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-all duration-200 hover:translate-x-2"
              onClick={handleToggle}
            >
              Gấu bông
            </Link>

            <Link
              href="/dashboard"
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-all duration-200 hover:translate-x-2"
              onClick={handleToggle}
            >
              Móc khoá
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-all duration-200 hover:translate-x-2"
              onClick={handleToggle}
            >
              Liên hệ
            </Link>

            <div className="flex items-center justify-between">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}