// src/shared/constants/authDataMap.ts

import { AuthDataCodes } from '@/shared/constants'

export type AuthDataValues = {
  title: string
  subtitle: string
  ask: string
  source: string
  linkTo: string
}

export const AUTH_DATA_MAP: Record<(typeof AuthDataCodes)[keyof typeof AuthDataCodes], AuthDataValues> = {
  [AuthDataCodes.LOGIN]: {
    title: 'Sign in to your account',
    subtitle: 'Welcome back! Please sign in to continue.',
    ask: 'Don’t have an account?',
    source: 'Sign up',
    linkTo: '/register',
  },
  [AuthDataCodes.REGISTER]: {
    title: 'Create your account',
    subtitle: 'Welcome! Please fill in the details to get started.',
    ask: 'Already have an account?',
    source: 'Sign in',
    linkTo: '/login',
  },
  [AuthDataCodes.FORGOT_PASSWORD]: {
    title: 'Forgot your password?',
    subtitle: 'We’ll send you a link to reset it.',
    ask: 'Back to',
    source: 'Sign in',
    linkTo: '/login',
  },
  [AuthDataCodes.RESET_PASSWORD]: {
    title: 'Reset your password',
    subtitle: 'Set a new password for your account.',
    ask: 'Back to',
    source: 'Sign in',
    linkTo: '/login',
  }
} as const
