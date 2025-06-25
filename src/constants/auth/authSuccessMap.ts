// src/constants/authauthSuccessMap.ts

import { AuthSuccessCodes } from '@/constants/auth'

export const AUTH_SUCCESS_MAP: Record<string, { title: string, description: string }> = {
  [AuthSuccessCodes.EMAIL_RESEND_SUCCESS]: {
    title: 'Verification Email Sent!',
    description: 'We’ve fired off a new verification email. If it doesn’t show up soon, check your spam folder.',
  },
  [AuthSuccessCodes.EMAIL_SIGNIN_SUCCESS]: {
    title: 'Signed In with Email',
    description: 'Welcome back! You’re all set to dive in.',
  },
  [AuthSuccessCodes.EMAIL_UPDATE_SUCCESS]: {
    title: 'Email Updated',
    description: 'Your email address has been successfully updated.',
  },
  [AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS]: {
    title: 'Email Verified!',
    description: 'Your email address is now verified. You’re good to go!',
  },
  [AuthSuccessCodes.EMAIL_VERIFICATION_LINK_SENT]: {
    title: 'Verification Email Sent',
    description: 'We’ve sent a link to verify your email. Be sure to check your inbox.',
  },
  [AuthSuccessCodes.GENERIC_SUCCESS]: {
    title: 'All Set!',
    description: 'That worked perfectly.',
  },
  [AuthSuccessCodes.GOOGLE_SIGNIN_SUCCESS]: {
    title: 'Signed In with Google',
    description: 'You’re in! Google did the trick.',
  },
  [AuthSuccessCodes.LINK_SUCCESS]: {
    title: 'Account Linked!',
    description: 'Your accounts are now connected. One less password to remember.',
  },
  [AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT]: {
    title: 'Reset Link Sent',
    description: 'We’ve sent a link to reset your password. Check your email when ready.',
  },
  [AuthSuccessCodes.PASSWORD_RESET_SUCCESS]: {
    title: 'Password Reset!',
    description: 'Your password has been updated. You can log in now with the new one.',
  },
  [AuthSuccessCodes.PASSWORD_UPDATE_SUCCESS]: {
    title: 'Password Changed',
    description: 'Your new password has been saved successfully.',
  },
  [AuthSuccessCodes.PROFILE_UPDATE_SUCCESS]: {
    title: 'Profile Updated',
    description: 'Your info looks fresh and updated!',
  },
  [AuthSuccessCodes.REAUTH_SUCCESS]: {
    title: 'Identity Verified',
    description: 'You’ve been successfully reauthenticated.',
  },
  [AuthSuccessCodes.SIGNIN_SUCCESS]: {
    title: 'Welcome!',
    description: 'You’ve signed in successfully.',
  },
  [AuthSuccessCodes.SIGNOUT_SUCCESS]: {
    title: 'Signed Out',
    description: 'You’ve been logged out. See you soon!',
  },
  [AuthSuccessCodes.SIGNUP_SUCCESS]: {
    title: 'Account Created!',
    description: 'Welcome aboard! We’ve sent you a verification email — check your inbox to activate your account.',
  },
  [AuthSuccessCodes.UNLINK_SUCCESS]: {
    title: 'Account Unlinked',
    description: 'That provider is no longer connected to your account.',
  },
} as const
