// src/lib/auth/helpers/auth-format.helper.ts

import { authErrorMap, authSuccessMap } from '@/lib/auth/config'
import type { AuthSuccessCode } from '@/lib/auth/constants'

/**
 * Formats authentication codes (both errors and successes) into user-friendly messages.
 */
export const authFormat = {
  /**
   * Formats an authentication error code into a user-friendly error object.
   * If the error code is not found in the `authErrorMap`, it returns a generic fallback.
   * @param {string} code - The Firebase Authentication error code.
   * @returns {{ title: string; description: string }} An object containing the formatted error title and description.
   */
  error: (code: string): { title: string; description: string } => {
    const fallback = {
      title: prettifyCode(code),
      description
        : 'Something went wrong. Please try again.',
    }
    return authErrorMap[code] ?? fallback
  },

  /**
   * Formats an authentication success code into a user-friendly success object.
   * If the success code is not found in the `authSuccessMap`, it returns a generic fallback.
   * @param {AuthSuccessCode} successKey - The authentication success code.
   * @returns {{ title: string; description: string }} An object containing the formatted success title and description.
   */
  success: (successKey: AuthSuccessCode): { title: string; description: string } => {
    const fallback = {
      title: prettifyCode(successKey),
      description: 'Operation completed successfully.',
    }

    return authSuccessMap[successKey] ?? fallback
  },
}

/**
 * Prettifies an authentication code by removing the 'auth/' prefix,
 * replacing hyphens with spaces, and capitalizing the first letter of each word.
 * @param {string} code - The authentication code to prettify.
 * @returns {string} The prettified code.
 */
const prettifyCode = (code: string): string =>
  code
    .replace(/^auth\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
