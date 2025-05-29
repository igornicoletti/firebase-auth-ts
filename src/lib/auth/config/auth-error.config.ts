// src/lib/auth/config/auth-error.config.ts

import { AuthErrorCodes } from 'firebase/auth'

interface AuthErrorType {
  title: string
  description: string
}

export const authErrorMap: Record<string, AuthErrorType> = {
  [AuthErrorCodes.INVALID_EMAIL]: {
    title: 'Invalid Email',
    description: 'The email address is not valid.',
  },
  [AuthErrorCodes.EMAIL_EXISTS]: {
    title: 'Email Already In Use',
    description: 'This email address is already associated with an account.',
  },
  [AuthErrorCodes.INVALID_PASSWORD]: {
    title: 'Invalid Password',
    description: 'The password entered is incorrect.',
  },
  [AuthErrorCodes.USER_DELETED]: {
    title: 'User Not Found',
    description: 'No account found with this email.',
  },
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: {
    title: 'Too Many Attempts',
    description: 'Please wait and try again later.',
  },
  [AuthErrorCodes.EXPIRED_OOB_CODE]: {
    title: 'Link Expired',
    description: 'The action link has expired. Please try again.',
  },
  [AuthErrorCodes.INVALID_OOB_CODE]: {
    title: 'Invalid Link',
    description: 'The action link is invalid or already used.',
  },
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: {
    title: 'Invalid Credential',
    description: 'This credential entered is incorrect.',
  },
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: {
    title: 'Credential Already In Use',
    description: 'This credential is already associated with another account.',
  },
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: {
    title: 'Re-authentication Required',
    description: 'Please log in again to perform this action.',
  },
  [AuthErrorCodes.INTERNAL_ERROR]: {
    title: 'Internal Error',
    description: 'An unexpected error occurred. Please try again later.',
  },
  [AuthErrorCodes.USER_DISABLED]: {
    title: 'Account Disabled',
    description: 'This user account has been disabled by an administrator.',
  },
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: {
    title: 'Popup Closed',
    description: 'The sign-in popup was closed before completing the login.',
  },
}
