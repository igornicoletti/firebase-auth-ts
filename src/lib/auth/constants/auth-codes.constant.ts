// src/lib/auth/constants/auth-codes.constant.ts

export const AuthActionCodes = {
  VERIFY_EMAIL: 'verifyEmail',
  RESET_PASSWORD: 'resetPassword',
} as const

export const AuthDataCodes = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
} as const

export type AuthDataCode = typeof AuthDataCodes[keyof typeof AuthDataCodes]

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

export type AuthSuccessCode = typeof AuthSuccessCodes[keyof typeof AuthSuccessCodes]
