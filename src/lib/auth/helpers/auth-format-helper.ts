// src/lib/auth/helpers/auth-format.helper.ts

import { authErrorMap, authSuccessMap } from '@/lib/auth/config'
import type { AuthSuccessCode } from '@/lib/auth/constants'

export const authFormat = {
  error: (code: string): { title: string; description: string } => {
    const fallback = {
      title: prettifyCode(code),
      description: 'Something went wrong. Please try again.',
    }
    return authErrorMap[code] ?? fallback
  },

  success: (successKey: AuthSuccessCode): { title: string; description: string } => {
    const fallback = {
      title: prettifyCode(successKey),
      description: 'Operation completed successfully.',
    }
    return authSuccessMap[successKey] ?? fallback
  },
}

const prettifyCode = (code: string): string => {
  return code
    .replace(/^auth\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
