// src/constants/authauthCodes.ts

export const AuthDataCodes = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot-password',
  RESET_PASSWORD: 'reset-password',
} as const

export type AuthDataCode = keyof typeof AuthDataCodes

export const AuthCallbackCodes = {
  RESET_PASSWORD: 'resetPassword',
  VERIFY_PASSWORD: 'verifyEmail',
} as const

export type AuthCallbackCode = keyof typeof AuthCallbackCodes

export const AuthSuccessCodes = {
  EMAIL_RESEND_SUCCESS: 'email-resend-success',
  EMAIL_SIGNIN_SUCCESS: 'email-signin-success',
  EMAIL_UPDATE_SUCCESS: 'email-update-success',
  EMAIL_VERIFIED_SUCCESS: 'email-verified-success',
  EMAIL_VERIFICATION_LINK_SENT: 'email-verification-link-sent',
  GENERIC_SUCCESS: 'generic-success',
  GOOGLE_SIGNIN_SUCCESS: 'google-signin-success',
  LINK_SUCCESS: 'link-success',
  PASSWORD_RESET_EMAIL_SENT: 'password-reset-email-sent',
  PASSWORD_RESET_SUCCESS: 'password-reset-success',
  PASSWORD_UPDATE_SUCCESS: 'password-update-success',
  PROFILE_UPDATE_SUCCESS: 'profile-update-success',
  REAUTH_SUCCESS: 'reauth-success',
  SIGNIN_SUCCESS: 'signin-success',
  SIGNOUT_SUCCESS: 'signout-success',
  SIGNUP_SUCCESS: 'signup-success',
  UNLINK_SUCCESS: 'unlink-success',
} as const

export type AuthSuccessCode = keyof typeof AuthSuccessCodes
