// src/lib/auth/config/auth-success.config.ts

import { AuthSuccessCodes } from '@/lib/auth/constants'

interface AuthSuccessType {
  title: string
  description: string
}

export const authSuccessMap: Record<string, AuthSuccessType> = {
  [AuthSuccessCodes.LOGIN_SUCCESS]: {
    title: 'Logged In Successfully',
    description: 'Welcome back! You’re now signed in.',
  },
  [AuthSuccessCodes.REGISTER_SUCCESS]: {
    title: 'Account Created',
    description: 'Your account has been created successfully.',
  },
  [AuthSuccessCodes.LOGOUT_SUCCESS]: {
    title: 'Logged Out Successfully',
    description: 'You have been logged out safely.',
  },
  [AuthSuccessCodes.FORGOT_PASSWORD_SENT]: {
    title: 'Password Reset Email Sent',
    description: 'Password reset instructions have been sent to your email.',
  },
  [AuthSuccessCodes.PASSWORD_RESET_SUCCESS]: {
    title: 'Password Updated',
    description: 'Your password has been updated successfully.',
  },
  [AuthSuccessCodes.VERIFY_EMAIL_SENT]: {
    title: 'Verification Email Sent',
    description: 'Check your inbox to verify your email address.',
  },
  [AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS]: {
    title: 'Email Verified',
    description: 'Your email address has been successfully verified.',
  },
}
