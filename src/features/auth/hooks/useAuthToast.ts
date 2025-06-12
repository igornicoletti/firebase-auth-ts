// src/features/auth/hooks/useAuthToast.ts

import { FirebaseError } from 'firebase/app'
import { useCallback } from 'react'
import { toast } from 'sonner'
import { AuthSuccessCodes, type AuthSuccessCode } from '../types'

export const useAuthToast = () => {
  const toastError = useCallback((error: unknown) => {
    const code = extractCode(error)
    const { title, description } = formatError(code)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }, [])

  const toastSuccess = useCallback((successKey: AuthSuccessCode = AuthSuccessCodes.GENERIC_SUCCESS) => {
    const { title, description } = formatSuccess(successKey)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-primary',
        description: '!text-foreground',
      },
    })
  }, [])

  return { toastError, toastSuccess }
}

const extractCode = (input: unknown): string => {
  if (typeof input === 'string') return input
  if (input instanceof FirebaseError) return input.code
  if (input && typeof input === 'object' && 'code' in input) return String((input as any).code)
  return 'unknown'
}

const formatError = (code: string) => {
  switch (code) {
    case 'auth/user-not-found':
      return {
        title: 'User not found',
        description: 'No user found with this email address.'
      }
    case 'auth/wrong-password':
      return {
        title: 'Invalid password',
        description: 'The password you entered is incorrect.'
      }
    case 'auth/email-already-in-use':
      return {
        title: 'Email already in use',
        description: 'An account with this email already exists.'
      }
    case 'auth/weak-password':
      return {
        title: 'Weak password',
        description: 'Password should be at least 6 characters.'
      }
    case 'auth/invalid-email':
      return {
        title: 'Invalid email',
        description: 'Please enter a valid email address.'
      }
    case 'auth/too-many-requests':
      return {
        title: 'Too many requests',
        description: 'Please wait a moment before trying again.'
      }
    case 'auth/email-not-verified':
      return {
        title: 'Email not verified',
        description: 'Please verify your email address to continue.'
      }
    default:
      return {
        title: 'Authentication Error',
        description: 'An error occurred during authentication. Please try again.'
      }
  }
}

const formatSuccess = (code: AuthSuccessCode) => {
  switch (code) {
    case AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS:
      return {
        title: 'Email verified!',
        description: 'Your email has been successfully verified.'
      }
    case AuthSuccessCodes.EMAIL_VERIFICATION_SENT:
      return {
        title: 'Verification email sent',
        description: 'Please check your email for the verification link.'
      }
    case AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT:
      return {
        title: 'Reset email sent',
        description: 'Please check your email for password reset instructions.'
      }
    case AuthSuccessCodes.SIGNIN_SUCCESS:
      return {
        title: 'Welcome back!',
        description: 'You have been successfully signed in.'
      }
    case AuthSuccessCodes.SIGNUP_SUCCESS:
      return {
        title: 'Account created!',
        description: 'Your account has been created successfully.'
      }
    case AuthSuccessCodes.SIGNOUT_SUCCESS:
      return {
        title: 'Signed out',
        description: 'You have been successfully signed out.'
      }
    default:
      return {
        title: 'Success!',
        description: 'Operation completed successfully.'
      }
  }
}

