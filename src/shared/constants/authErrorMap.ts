// src/shared/constants/authErrorMap.ts

import { AuthErrorCodes } from 'firebase/auth'

export const AUTH_ERROR_MAP: Record<string, { title: string, description: string }> = {
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: {
    title: 'Invalid Credentials',
    description: 'The email or password you entered is incorrect or not registered. Please check and try again.',
  },
  [AuthErrorCodes.INVALID_EMAIL]: {
    title: 'Wrong Email',
    description: 'The email you entered is incorrect. Please try again.',
  },
  [AuthErrorCodes.EMAIL_EXISTS]: {
    title: 'Email already in use',
    description: 'This email is already registered. Please use a different one or log in.',
  },
  [AuthErrorCodes.INVALID_PASSWORD]: {
    title: 'Wrong password',
    description: 'The password you entered is incorrect. Please try again.',
  },
  [AuthErrorCodes.USER_DISABLED]: {
    title: 'Account disabled',
    description: 'This account has been disabled. Please contact support.',
  },
  [AuthErrorCodes.USER_DELETED]: {
    title: 'Account not found',
    description: 'No account found with this email. Please check or sign up.',
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
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: {
    title: 'Credential in use',
    description: 'This credential is already associated with another account.',
  },
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: {
    title: 'Re-authentication required',
    description: 'For your security, please log in again to continue.',
  },
  [AuthErrorCodes.OPERATION_NOT_SUPPORTED]: {
    title: 'Operation not supported',
    description: 'This operation is not supported in this environment.',
  },
  [AuthErrorCodes.TIMEOUT]: {
    title: 'Request timed out',
    description: 'The connection took too long. Please try again.',
  },
  'unknown': {
    title: 'Unknown error',
    description: 'An unexpected error occurred. Please try again.',
  },
} as const
