// src/shared/constants/authDataMap.ts
import { AuthDataCodes } from '@/shared/constants'

export const AUTH_DATA_MAP = {
  [AuthDataCodes.LOGIN]: {
    formTitle: 'Sign in to your account',
    formSubtitle: 'Welcome back! Please sign in to continue.',
    ask: 'Don’t have an account?',
    source: 'Sign up',
    linkTo: '/register',
  },
  [AuthDataCodes.REGISTER]: {
    formTitle: 'Create your account',
    formSubtitle: 'Welcome! Please fill in the details to get started.',
    ask: 'Already have an account?',
    source: 'Sign in',
    linkTo: '/login',
  },
  [AuthDataCodes.FORGOT_PASSWORD]: {
    formTitle: 'Forgot your password?',
    formSubtitle: 'We’ll send you a link to reset it.',
    ask: 'Back to',
    source: 'Sign in',
    linkTo: '/login',
  },
  [AuthDataCodes.RESET_PASSWORD]: {
    formTitle: 'Reset your password',
    formSubtitle: 'Set a new password for your account.',
    ask: 'Back to',
    source: 'Sign in',
    linkTo: '/login',
  },
} as const
