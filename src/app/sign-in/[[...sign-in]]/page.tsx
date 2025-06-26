// app/sign-in/[[...sign-in]]/page.tsx

'use client';

import FloatingIcon from '@/components/floatingIcon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authorizeService } from '@/services/authorizeService';
import { ILogin, IToken, User } from '@/types';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { decodeJwt } from '@/utils/JwtDecode';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from 'next-themes';


// Teddy Bear SVG Component
const TeddyBearIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Teddy bear ears */}
    <circle cx="20" cy="18" r="8" fill="#8B4513" />
    <circle cx="44" cy="18" r="8" fill="#8B4513" />
    <circle cx="20" cy="18" r="5" fill="#DEB887" />
    <circle cx="44" cy="18" r="5" fill="#DEB887" />

    {/* Main head */}
    <circle cx="32" cy="28" r="16" fill="#8B4513" />
    <circle cx="32" cy="28" r="13" fill="#DEB887" />

    {/* Eyes */}
    <circle cx="28" cy="25" r="2" fill="#000" />
    <circle cx="36" cy="25" r="2" fill="#000" />
    <circle cx="28.5" cy="24.5" r="0.5" fill="#FFF" />
    <circle cx="36.5" cy="24.5" r="0.5" fill="#FFF" />

    {/* Nose */}
    <ellipse cx="32" cy="30" rx="1.5" ry="1" fill="#000" />

    {/* Mouth */}
    <path d="M 30 32 Q 32 34 34 32" stroke="#000" strokeWidth="1" fill="none" />

    {/* Body */}
    <ellipse cx="32" cy="50" rx="12" ry="10" fill="#8B4513" />
    <ellipse cx="32" cy="50" rx="9" ry="7" fill="#DEB887" />

    {/* Arms */}
    <circle cx="18" cy="45" r="6" fill="#8B4513" />
    <circle cx="46" cy="45" r="6" fill="#8B4513" />
    <circle cx="18" cy="45" r="4" fill="#DEB887" />
    <circle cx="46" cy="45" r="4" fill="#DEB887" />
  </svg>
);

export default function SignInPage() {
  const { user, setUser, setToken } = useUser();
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = async (data: ILogin) => {
    setIsLoading(true);

    try {
      // Use the actual authorize service to login
      const token = await authorizeService.login(data);
      
      // Set token using UserContext (this will also set cookies automatically)
      setToken(token);
      
      const decodedUser = decodeJwt(token);
      const newUser: User = {
        email: decodedUser?.email || '',
        name: decodedUser?.name || '',
      }
      setUser(newUser);
      
      toast.success('Welcome back to our cozy teddy bear family! 🧸', {
        icon: '🧸',
        style: {
          borderRadius: '12px',
          background: 'oklch(var(--accent))',
          color: 'oklch(var(--accent-foreground))',
        },
      });
      
      // Redirect to original destination or dashboard
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.push(redirect);

    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic background based on theme
  const backgroundStyle = theme === 'dark'
    ? 'bg-gradient-to-br from-slate-900 via-amber-900/20 to-orange-900/30'
    : 'bg-gradient-to-br from-amber-50 via-orange-100 to-yellow-50';

  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 ${backgroundStyle}`}
    >
      {/* Show welcome if user is signed in */}
      {user && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[var(--card)] border border-[var(--border)] text-[var(--card-foreground)] px-6 py-2 rounded-xl shadow font-semibold z-50">
          Welcome, {user.name || user.email}!
        </div>
      )}
      {/* Floating teddy bear decorations */}
      <FloatingIcon />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-lg"
          >
            <TeddyBearIcon className="h-12 w-12 text-[var(--primary-foreground)]" />
          </motion.div>
          <motion.h2
            className="mt-6 text-3xl font-bold tracking-tight text-[var(--foreground)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome Back! 🧸
          </motion.h2>
          <motion.p
            className="mt-2 text-sm text-[var(--muted-foreground)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Sign in to find your perfect cuddly companion
          </motion.p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-2xl border-2 border-[var(--border)] p-8 shadow-2xl backdrop-blur-sm bg-[var(--card)]/95"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">
                Email address 📧
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-[var(--muted-foreground)]" />
                </div>
                <Input
                  id="email"
                  type="text"
                  autoComplete="email"
                  className="pl-10 border-2 border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] rounded-xl focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)]"
                  placeholder="your.email@example.com"
                  withAnimation
                  {...register('email', {
                    required: 'Please enter your email to find your teddy bear account! 🐻',
                  })}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[var(--foreground)]">
                Password 🔐
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Heart className="h-4 w-4 text-[var(--muted-foreground)]" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="pl-10 pr-10 border-2 border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] rounded-xl focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)]"
                  placeholder="Enter your secret password"
                  withAnimation
                  {...register('password', {
                    required: 'Please enter your password to access your teddy bear collection! 🧸',
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors text-[var(--muted-foreground)] hover:text-[var(--accent)]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium hover:underline transition-colors"
                style={{
                  color: theme === 'dark' ? '#FCD34D' : '#2563EB',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme === 'dark' ? '#FB923C' : '#9333EA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme === 'dark' ? '#FCD34D' : '#2563EB';
                }}
                onClick={() => toast('Don\'t worry! Our teddy bears will help you reset your password soon! 🐻💕', {
                  icon: '🔑',
                  style: {
                    borderRadius: '12px',
                    background: 'oklch(var(--card))',
                    color: 'oklch(var(--card-foreground))',
                  },
                })}
              >
                Forgot your password? 🤔
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-xl text-[var(--primary-foreground)] font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:from-[var(--primary)]/90 hover:to-[var(--accent)]/90 border-none"
              size="lg"
              disabled={isLoading}
              withAnimation
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                  />
                  Finding your teddy bears... 🔍
                </>
              ) : (
                <>
                  Sign in to Teddy Bear Paradise 🧸✨
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            New to our teddy bear family? 🐻{' '}
            <button
              type="button"
              className="font-medium hover:underline transition-colors"
              style={{
                color: theme === 'dark' ? '#FCD34D' : '#1D4ED8',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme === 'dark' ? '#FB923C' : '#4338CA';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme === 'dark' ? '#FCD34D' : '#1D4ED8';
              }}
              onClick={() => toast('Welcome! Contact our friendly team to join the teddy bear family! 🧸💕', {
                icon: '🤗',
                style: {
                  borderRadius: '12px',
                  background: 'oklch(var(--card))',
                  color: 'oklch(var(--card-foreground))',
                },
              })}
            >
              Contact our teddy bear team! 💕
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
