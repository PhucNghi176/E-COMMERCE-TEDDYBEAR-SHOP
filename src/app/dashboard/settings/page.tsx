'use client';

import { useUser } from '@/contexts/UserContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, User as UserIcon, Shield, Bell } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, signOut } = useUser();

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const settingsItems = [
    {
      icon: UserIcon,
      title: 'Profile Settings',
      description: 'Update your personal information and preferences',
      onClick: () => {},
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your privacy settings and security options',
      onClick: () => {},
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure how you receive notifications',
      onClick: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 lg:p-8">
      <motion.div
        className="max-w-4xl mx-auto"
        {...fadeIn}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-[var(--primary)] rounded-full">
            <Settings className="h-6 w-6 text-[var(--primary-foreground)]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[var(--foreground)]">Settings</h1>
            <p className="text-[var(--muted-foreground)]">
              Manage your account settings and preferences
            </p>
          </div>
        </div>

        {/* User Info Card */}
        <motion.div
          className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm mb-8"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">
            Account Information
          </h2>
          <div className="space-y-2">
            <p className="text-[var(--muted-foreground)]">
              <span className="font-medium text-[var(--foreground)]">Name:</span> {user?.name}
            </p>
            <p className="text-[var(--muted-foreground)]">
              <span className="font-medium text-[var(--foreground)]">Email:</span> {user?.email}
            </p>
          </div>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={item.onClick}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-[var(--primary)]/10 rounded-full">
                  <item.icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  {item.title}
                </h3>
              </div>
              <p className="text-[var(--muted-foreground)] text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Danger Zone */}
        <motion.div
          className="bg-[var(--card)] p-6 rounded-lg border border-red-200 dark:border-red-800 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            Danger Zone
          </h2>
          <p className="text-[var(--muted-foreground)] mb-4">
            Once you sign out, you'll need to sign back in to access your dashboard.
          </p>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
          >
            Sign Out
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
} 