// src/lib/auth/config/auth-data.config.ts

import { AuthDataCodes } from '@/lib/auth/constants'

interface AuthDataType {
  title: string
  description: string
  ask: string
  source: string
  pathname: string
}

export const authDataMap: Record<string, AuthDataType> = {
  [AuthDataCodes.LOGIN]: {
    title: 'Sign in to your account',
    description: 'Welcome back! Please sign in to continue',
    ask: 'Don’t have an account?',
    source: 'Register',
    pathname: '/register',
  },
  [AuthDataCodes.REGISTER]: {
    title: 'Create your account',
    description: 'Please fill in the details to get started',
    ask: 'Already have an account?',
    source: 'Login',
    pathname: '/login',
  },
  [AuthDataCodes.FORGOT_PASSWORD]: {
    title: 'Forgot your password?',
    description: 'We’ll send you a link to reset it.',
    ask: 'Back to',
    source: 'Login',
    pathname: '/login',
  },
  [AuthDataCodes.RESET_PASSWORD]: {
    title: 'Reset your password',
    description: 'Set a new password for your account.',
    ask: 'Back to',
    source: 'Login',
    pathname: '/login',
  },
} as const

export type AuthDataMap = (typeof authDataMap)[keyof typeof authDataMap]
