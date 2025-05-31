// src/lib/auth/errors/auth-format-codes.ts

import { authErrorMap, authSuccessMap } from '@/lib/auth/config'

export const authFormatCodes = {
  error: (code: string) => {
    const fallback = {
      title: prettifyCode(code),
      description: 'Something went wrong. Please try again.',
    }

    return authErrorMap[code] ?? fallback
  },

  success: (code: string) => {
    const fallback = {
      title: prettifyCode(code),
      description: 'Action completed successfully.',
    }

    return authSuccessMap[code] ?? fallback
  }
}

const prettifyCode = (code: string) => {
  return code
    .replace(/^auth\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}
