// src/features/auth/constants/authMessages.ts

export type AuthDataCode =
  'login' |
  'register' |
  'forgot-password' |
  'reset-password'


export type AuthPageData = {
  formTitle: string
  formSubtitle: string
  ask: string
  source: string
  linkTo: string
}

export const AuthDataCodes = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
} as const

export const AUTH_DATA_MAP: Record<AuthDataCode, AuthPageData> = {
  [AuthDataCodes.LOGIN]: {
    formTitle: 'Welcome Back',
    formSubtitle: 'Enter your email below to login to your account',
    ask: 'Don\'t have an account?',
    source: 'Register',
    linkTo: '/register',
  },
  [AuthDataCodes.REGISTER]: {
    formTitle: 'Create an account',
    formSubtitle: 'Enter your email below to create your account',
    ask: 'Already have an account?',
    source: 'Login',
    linkTo: '/login',
  },
  [AuthDataCodes.FORGOT_PASSWORD]: {
    formTitle: 'Forgot Password?',
    formSubtitle: 'Enter your email below to reset your password',
    ask: 'Remembered your password?',
    source: 'Login',
    linkTo: '/login',
  },
  [AuthDataCodes.RESET_PASSWORD]: {
    formTitle: 'Set New Password',
    formSubtitle: 'Enter your new password below',
    ask: 'Back to login?',
    source: 'Login',
    linkTo: '/login',
  },
}
