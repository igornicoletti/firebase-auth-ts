// src/lib/auth/hooks/use-auth-toast.ts

import { FirebaseError } from 'firebase/app'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { AuthSuccessCodes, type AuthSuccessCode } from '@/lib/auth/constants'
import { authFormatCodes } from '@/lib/auth/helpers'

/**
 * A custom hook to display styled success and error toasts for authentication related events.
 * It uses the 'sonner' library for toast notifications and the `authFormatCodes` utility
 * to get user-friendly messages based on authentication codes.
 * @returns {{ toastError: (error: unknown) => void; toastSuccess: (successKey?: AuthSuccessCode) => void }}
 * An object containing functions to display error and success toasts.
 */
export const useAuthToast = () => {
  /**
   * Displays an error toast. It extracts the error code, formats the error message,
   * and then shows the toast with a destructive style.
   * @param {unknown} error - The error object or string.
   */
  const toastError = useCallback((error: unknown) => {
    const code = extractCode(error)
    const { title, description } = authFormatCodes.error(code)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-destructive',
        description: '!text-foreground',
      },
    })
  }, [])

  /**
   * Displays a success toast. It formats the success message based on the provided success code
   * and then shows the toast with a success style. Defaults to a generic success message if no code is provided.
   * @param {AuthSuccessCode} [successKey=AuthSuccessCodes.GENERIC_SUCCESS] - The authentication success code.
   */
  const toastSuccess = useCallback((successKey: AuthSuccessCode = AuthSuccessCodes.GENERIC_SUCCESS) => {
    const { title, description } = authFormatCodes.success(successKey)

    toast.dismiss()
    toast.message(title, {
      description,
      classNames: {
        title: '!text-green-500',
        description: '!text-foreground',
      },
    })
  }, [])

  return { toastError, toastSuccess }
}

/**
 * Extracts the error code from a given input.
 * It handles string codes, FirebaseError objects, and generic objects with a 'code' property.
 * @param {unknown} input - The input from which to extract the error code.
 * @returns {string} The extracted error code, or 'unknown' if extraction fails.
 */
const extractCode = (input: unknown): string => {
  if (typeof input === 'string') return input
  if (input instanceof FirebaseError) return input.code
  if (input && typeof input === 'object' && 'code' in input) return String((input as any).code)
  return 'unknown'
}
