// src/common/components/toast/helpers.ts

import { AUTH_ERROR_MAP } from '@/features/auth/constants/authErrorMap'
import { AUTH_SUCCESS_MAP, AuthSuccessCodes } from '@/features/auth/constants/authSuccessMap'

const prettifyCode = (code: string): string =>
  code
    .replace(/^auth\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) =>
      char.toUpperCase())

export const authFormat = {
  error: (code: string): { title: string; description: string } => {
    const fallback = {
      title: prettifyCode(code),
      description: 'Something went wrong. Please try again.',
    }

    return AUTH_ERROR_MAP[code] ?? fallback
  },

  success: (successKey: AuthSuccessCodes): { title: string; description: string } => {
    const fallback = {
      title: prettifyCode(successKey),
      description: 'Operation completed successfully.',
    }

    return AUTH_SUCCESS_MAP[successKey] ?? fallback
  },
}
