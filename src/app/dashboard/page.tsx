'use client';
import { useUser } from '@/contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Settings, User, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const { signOut } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Mobile overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`
          w-64 bg-[var(--card)] border-r border-[var(--border)] flex flex-col z-50
          fixed lg:relative h-full lg:h-auto
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          transition-transform duration-300 ease-in-out lg:transition-none
        `}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Dashboard</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-[var(--muted)] text-[var(--foreground)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] rounded-md transition-colors duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2 p-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] rounded-md transition-colors duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <button
            className="flex items-center gap-2 p-2 w-full text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] rounded-md transition-colors duration-200"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8">
        {/* Mobile header with hamburger menu */}
        <div className="lg:hidden mb-6">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          {...fadeIn}
        >
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Welcome, Ngân Phạm!
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-8">
            This is your dashboard. Use the sidebar to navigate through your
            profile and settings.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Account Stats</h3>
              <p className="text-[var(--muted-foreground)]">View your account activity and statistics.</p>
            </motion.div>

            <motion.div
              className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">Recent Activity</h3>
              <p className="text-[var(--muted-foreground)]">Check your recent actions and updates.</p>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}