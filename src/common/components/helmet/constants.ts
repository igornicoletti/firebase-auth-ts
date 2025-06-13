// src/common/components/helmet/constants.ts

import type { SeoMeta, SeoPageKey } from '@/common/components/helmet'

export const SEO_METADATA_EN: Record<SeoPageKey, SeoMeta> = {
  home: {
    title: 'Welcome to Our App',
    description: 'Explore the best features of our application. Start your journey now!',
  },
  dashboard: {
    title: 'Dashboard - Your Overview',
    description: 'Access your personalized dashboard, view statistics, and manage your account.',
  },
  profile: {
    title: 'User Profile - Manage Your Account',
    description: 'Edit your personal information, change password, and customize your profile settings.',
  },
  login: {
    title: 'Login to Your Account',
    description: 'Sign in to access all the exclusive features of our application.',
  },
  register: {
    title: 'Sign Up - Create Your Account',
    description: 'Join our community! Create a new account to get started with our services.',
  },
  forgotPassword: {
    title: 'Forgot Password?',
    description: 'Reset your password. Enter your email to receive a password reset link.',
  },
  resetPassword: {
    title: 'Reset Your Password',
    description: 'Set a new password for your account to regain access.',
  },
  verifyEmail: {
    title: 'Verify Your Email',
    description: 'Confirm your email address to activate your account.',
  },
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist.',
  },
}
