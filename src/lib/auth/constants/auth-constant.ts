// src/lib/auth/constants/auth-constant.ts

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

export const AuthSuccessCodes = {
  LOGIN_SUCCESS: 'auth/login-success',
  REGISTER_SUCCESS: 'auth/register-success',
  LOGOUT_SUCCESS: 'auth/logout-success',
  FORGOT_PASSWORD_SENT: 'auth/forgot-password-sent',
  PASSWORD_RESET_SUCCESS: 'auth/password-reset-success',
  VERIFY_EMAIL_SENT: 'auth/verify-email-sent',
  EMAIL_VERIFIED_SUCCESS: 'auth/email-verified-success',
} as const
