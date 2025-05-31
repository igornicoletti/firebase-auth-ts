// src/lib/auth/constants/auth-constant.ts

/**
 * Defines the possible action codes received in authentication callbacks.
 */
export const AuthActionCodes = {
  VERIFY_EMAIL: 'verifyEmail',
  RESET_PASSWORD: 'resetPassword',
} as const

/**
 * Defines codes for different authentication data configurations (e.g., login, register).
 */
export const AuthDataCodes = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
} as const

/**
 * Type for the authentication data codes.
 */
export type AuthDataCode = typeof AuthDataCodes[keyof typeof AuthDataCodes]

/**
 * Defines codes for various successful authentication operations.
 */
export const AuthSuccessCodes = {
  SIGNIN_SUCCESS: 'signin-success',
  SIGNUP_SUCCESS: 'signup-success',
  SIGNOUT_SUCCESS: 'signout-success',
  REAUTH_SUCCESS: 'reauth-success',
  PASSWORD_RESET_EMAIL_SENT: 'password-reset-email-sent',
  EMAIL_VERIFICATION_LINK_SENT: 'email-verification-link-sent',
  EMAIL_VERIFIED_SUCCESS: 'email-verified-success',
  PASSWORD_RESET_SUCCESS: 'password-reset-success',
  PROFILE_UPDATE_SUCCESS: 'profile-update-success',
  EMAIL_UPDATE_SUCCESS: 'email-update-success',
  PASSWORD_UPDATE_SUCCESS: 'password-update-success',
  LINK_SUCCESS: 'link-success',
  UNLINK_SUCCESS: 'unlink-success',
  GENERIC_SUCCESS: 'generic-success',
} as const

/**
 * Type for the authentication success codes.
 */
export type AuthSuccessCode = typeof AuthSuccessCodes[keyof typeof AuthSuccessCodes]
