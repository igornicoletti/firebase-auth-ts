// src/features/auth/constants/authErrorMap.ts

import { AuthErrorCodes } from 'firebase/auth'

type AuthErrorCodes = typeof AuthErrorCodes[keyof typeof AuthErrorCodes]

type AuthErrorValues = {
  title: string
  description: string
}

export const AUTH_ERROR_MAP: Record<string, AuthErrorValues> = {
  [AuthErrorCodes.INVALID_EMAIL]: {
    title: 'Invalid Email',
    description: 'The email address provided is not valid.',
  },
  [AuthErrorCodes.EMAIL_EXISTS]: {
    title: 'Email Already In Use',
    description: 'This email address is already associated with another account.',
  },
  [AuthErrorCodes.INVALID_PASSWORD]: {
    title: 'Incorrect Password',
    description: 'The password entered is incorrect.',
  },
  [AuthErrorCodes.USER_MISMATCH]: {
    title: 'User Not Found',
    description: 'No account found with this email.',
  },
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: {
    title: 'Invalid Credentials',
    description: 'The email or password entered is incorrect.',
  },
  [AuthErrorCodes.USER_DISABLED]: {
    title: 'Account Disabled',
    description: 'This user account has been disabled by an administrator.',
  },
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: {
    title: 'Too Many Attempts',
    description: 'Too many login attempts. Please try again later.',
  },
  [AuthErrorCodes.WEAK_PASSWORD]: {
    title: 'Weak Password',
    description: 'The password provided is too weak. Please choose a stronger password.',
  },
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: {
    title: 'Operation Not Allowed',
    description: 'This authentication method is not enabled in Firebase.',
  },
  [AuthErrorCodes.EXPIRED_OOB_CODE]: {
    title: 'Link Expired',
    description: 'The action link (reset/verification) has expired. Please request a new one.',
  },
  [AuthErrorCodes.INVALID_OOB_CODE]: {
    title: 'Invalid Link',
    description: 'The action link is invalid or has already been used.',
  },
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: {
    title: 'Credential Already In Use',
    description: 'This credential (email/provider) is already associated with another account.',
  },
  [AuthErrorCodes.PROVIDER_ALREADY_LINKED]: {
    title: 'Provider Already Linked',
    description: 'This provider is already linked to your account.',
  },
  [AuthErrorCodes.NO_SUCH_PROVIDER]: {
    title: 'Provider Not Linked',
    description: 'This provider is not linked to your account.',
  },
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: {
    title: 'Re-authentication Required',
    description: 'Please log in again to perform this action.',
  },
  [AuthErrorCodes.POPUP_BLOCKED]: {
    title: 'Popup Blocked',
    description: 'The browser blocked the authentication popup. Please allow popups.',
  },
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: {
    title: 'Popup Closed',
    description: 'The authentication popup was closed before completing the login.',
  },
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: {
    title: 'Network Error',
    description: 'Internet connection failed. Please check your connection and try again.',
  },
  [AuthErrorCodes.APP_NOT_AUTHORIZED]: {
    title: 'App Not Authorized',
    description: 'This app is not authorized to perform the requested operation.',
  },
  [AuthErrorCodes.INTERNAL_ERROR]: {
    title: 'Internal Error',
    description: 'An unexpected error occurred. Please try again later.',
  },
  [AuthErrorCodes.UNVERIFIED_EMAIL]: {
    title: 'Unverified Email',
    description: 'Your email has not been verified yet. Please check your inbox.',
  },
}
