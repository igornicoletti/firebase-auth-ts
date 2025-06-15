// src/shared/utils/formatCode.ts

import { AUTH_ERROR_MAP, AUTH_SUCCESS_MAP } from '@/shared/constants'
import { prettifyCode } from '@/shared/utils'

export const formatCode = {
  error: (codeKey: string) => {
    const fallback = {
      title: prettifyCode(codeKey),
      description: 'Something went wrong. Please try again.',
    }
    return AUTH_ERROR_MAP[codeKey] ?? fallback
  },

  success: (codeKey: string) => {
    const fallback = {
      title: prettifyCode(codeKey),
      description: 'Operation completed successfully.',
    }
    return AUTH_SUCCESS_MAP[codeKey] ?? fallback
  },
}
