// src/lib/auth/config/auth-data.config.ts

import { AuthDataCodes, type AuthDataCode } from '@/lib/auth/constants'

export type AuthData = {
  title: string
  description: string
  ask: string
  source: string
  pathname: string
}

export const authDataMap: Record<AuthDataCode, AuthData> = {
  [AuthDataCodes.LOGIN]: {
    title: 'Sign in to your account',
    description: 'Welcome back! Please sign in to continue',
    ask: 'Don’t have an account?',
    source: 'Sign up',
    pathname: '/register',
  },
  [AuthDataCodes.REGISTER]: {
    title: 'Create your account',
    description: 'Welcome! Please fill in the details to get started',
    ask: 'Already have an account?',
    source: 'Sign in',
    pathname: '/login',
  },
  [AuthDataCodes.FORGOT_PASSWORD]: {
    title: 'Forgot your password?',
    description: 'We’ll send you a link to reset it.',
    ask: 'Back to',
    source: 'Sign in',
    pathname: '/login',
  },
  [AuthDataCodes.RESET_PASSWORD]: {
    title: 'Reset your password',
    description: 'Set a new password for your account.',
    ask: 'Back to',
    source: 'Sign in',
    pathname: '/login',
  },
}
