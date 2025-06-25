// src/shared/utils/formatCode.ts

import { AUTH_ERROR_MAP, AUTH_SUCCESS_MAP } from '@/constants/auth'

const prettify = (codeKey: string): string => {
  return codeKey
    .replace(/^auth\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export const formatCode = {
  error: (codeKey: string) => {
    const fallback = {
      title: prettify(codeKey),
      description: 'Please try again or contact support if the problem persists.'
    }
    return AUTH_ERROR_MAP[codeKey] ?? fallback
  },
  success: (codeKey: string) => {
    const fallback = {
      title: prettify(codeKey),
      description: 'If you have any questions, feel free to contact us.'
    }
    return AUTH_SUCCESS_MAP[codeKey] ?? fallback
  }
}
