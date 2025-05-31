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
    title: 'Too Many Requests',
    description: 'Too many attempts. Please try again later.',
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
  [AuthErrorCodes.ADMIN_ONLY_OPERATION]: {
    title: 'Admin Only Operation',
    description: 'This operation is restricted to administrators.',
  },
  [AuthErrorCodes.ARGUMENT_ERROR]: {
    title: 'Argument Error',
    description: 'Invalid argument provided.',
  },
  [AuthErrorCodes.APP_NOT_AUTHORIZED]: {
    title: 'App Not Authorized',
    description: 'This app is not authorized to perform the operation.',
  },
  [AuthErrorCodes.CAPTCHA_CHECK_FAILED]: {
    title: 'Captcha Failed',
    description: 'Captcha verification failed.',
  },
  [AuthErrorCodes.EXPIRED_POPUP_REQUEST]: {
    title: 'Popup Request Expired',
    description: 'The popup request expired. Please try again.',
  },
  [AuthErrorCodes.INVALID_API_KEY]: {
    title: 'Invalid API Key',
    description: 'The API key provided is invalid.',
  },
  [AuthErrorCodes.INVALID_CUSTOM_TOKEN]: {
    title: 'Invalid Custom Token',
    description: 'The custom token format is incorrect.',
  },
  [AuthErrorCodes.INVALID_OAUTH_CLIENT_ID]: {
    title: 'Invalid OAuth Client ID',
    description: 'The OAuth client ID is invalid.',
  },
  [AuthErrorCodes.MISSING_CODE]: {
    title: 'Missing Code',
    description: 'The required verification code is missing.',
  },
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: {
    title: 'Network Request Failed',
    description: 'Network error occurred. Check your connection.',
  },
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: {
    title: 'Operation Not Allowed',
    description: 'This operation is not allowed.',
  },
  [AuthErrorCodes.POPUP_BLOCKED]: {
    title: 'Popup Blocked',
    description: 'The popup was blocked by the browser.',
  },
  [AuthErrorCodes.QUOTA_EXCEEDED]: {
    title: 'Quota Exceeded',
    description: 'Quota for this operation has been exceeded.',
  },
  [AuthErrorCodes.USER_MISMATCH]: {
    title: 'User Mismatch',
    description: 'The provided user does not match the current user.',
  },
  [AuthErrorCodes.WEAK_PASSWORD]: {
    title: 'Weak Password',
    description: 'The password is too weak.',
  },
  [AuthErrorCodes.UNVERIFIED_EMAIL]: {
    title: 'Unverified Email',
    description: 'Email is not verified.',
  },
}
