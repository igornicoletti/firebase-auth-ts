// src/shared/constants/authErrorMap.ts

import { AuthErrorCodes } from 'firebase/auth'

export const AUTH_ERROR_MAP: Record<string, { title: string, description: string }> = {
  [AuthErrorCodes.EMAIL_EXISTS]: {
    title: 'Email already in use',
    description: 'This email is already registered. Please use a different one or log in.',
  },
  [AuthErrorCodes.INVALID_EMAIL]: {
    title: 'Invalid email',
    description: 'Please enter a valid email address.',
  },
  [AuthErrorCodes.INVALID_PASSWORD]: {
    title: 'Wrong password',
    description: 'The password you entered is incorrect. Please try again.',
  },
  [AuthErrorCodes.USER_DISABLED]: {
    title: 'User not found',
    description: 'No account found with this email. Please register or check your email.',
  },
  [AuthErrorCodes.WEAK_PASSWORD]: {
    title: 'Weak password',
    description: 'Your password must be at least 6 characters long.',
  },
  [AuthErrorCodes.EXPIRED_OOB_CODE]: {
    title: 'Expired code',
    description: 'The verification link has expired. Please request a new one.',
  },
  [AuthErrorCodes.INVALID_OOB_CODE]: {
    title: 'Invalid code',
    description: 'The verification code is invalid. Please check the link or request a new one.',
  },
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: {
    title: 'Too many attempts',
    description: 'Too many unsuccessful attempts. Please try again later.',
  },
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: {
    title: 'Network error',
    description: 'Please check your internet connection and try again.',
  },
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: {
    title: 'Operation not allowed',
    description: 'Email/password sign-in is disabled. Please contact support.',
  },
  [AuthErrorCodes.POPUP_BLOCKED]: {
    title: 'Popup blocked',
    description: 'Please allow popups for this site to continue with Google sign-in.',
  },
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: {
    title: 'Popup closed',
    description: 'Google sign-in was canceled. Please try again.',
  },
  [AuthErrorCodes.UNAUTHORIZED_DOMAIN]: {
    title: 'Unauthorized domain',
    description: 'This domain is not authorized for Google sign-in. Contact support.',
  },
  'unknown': {
    title: 'Unknown error',
    description: 'An unexpected error occurred. Please try again.',
  },
}
