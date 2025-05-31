// src/lib/auth/config/auth-success.config.ts

import { AuthSuccessCodes, type AuthSuccessCode } from '@/lib/auth/constants'

type AuthSuccess = {
  title: string
  description: string
}

/**
 * A mapping of authentication success codes to user-friendly success messages.
 * Each key corresponds to an `AuthSuccessCodes` value, and the value is an object
 * containing a title and a description of the successful operation.
 */
export const authSuccessMap: Record<AuthSuccessCode, AuthSuccess> = {
  [AuthSuccessCodes.SIGNIN_SUCCESS]: {
    title: 'Welcome!',
    description: 'You have successfully signed in.',
  },
  [AuthSuccessCodes.SIGNUP_SUCCESS]: {
    title: 'Account Created!',
    description:
      "Your account has been created successfully. We've sent a verification email, please check your inbox to activate your account.",
  },
  [AuthSuccessCodes.SIGNOUT_SUCCESS]: {
    title: 'Goodbye!',
    description: 'You have successfully signed out.',
  },
  [AuthSuccessCodes.REAUTH_SUCCESS]: {
    title: 'Verification Complete',
    description: 'Your identity was successfully verified.',
  },
  [AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT]: {
    title: 'Check Your Email',
    description: 'We sent a link to reset your password to your email address.',
  },
  [AuthSuccessCodes.EMAIL_VERIFICATION_LINK_SENT]: {
    title: 'Check Your Email',
    description: 'We sent a verification link to your email address. Please check your inbox.',
  },
  [AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS]: {
    title: 'Email Verified!',
    description: 'Your email address has been successfully verified.',
  },
  [AuthSuccessCodes.PASSWORD_RESET_SUCCESS]: {
    title: 'Password Reset!',
    description: 'Your password has been successfully reset. You can now log in with your new password.',
  },
  [AuthSuccessCodes.PROFILE_UPDATE_SUCCESS]: {
    title: 'Profile Updated',
    description: 'Your information has been successfully saved.',
  },
  [AuthSuccessCodes.EMAIL_UPDATE_SUCCESS]: {
    title: 'Email Updated',
    description: 'Your email address has been updated.',
  },
  [AuthSuccessCodes.PASSWORD_UPDATE_SUCCESS]: {
    title: 'Password Updated',
    description: 'Your password has been successfully updated.',
  },
  [AuthSuccessCodes.LINK_SUCCESS]: {
    title: 'Account Linked!',
    description: 'Your account has been successfully linked.',
  },
  [AuthSuccessCodes.UNLINK_SUCCESS]: {
    title: 'Account Unlinked',
    description: 'The provider has been unlinked from your account.',
  },
  [AuthSuccessCodes.GENERIC_SUCCESS]: {
    title: 'Success!',
    description: 'Operation completed successfully.',
  },
}
