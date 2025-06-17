// src/shared/utils/formatCode.ts

import { AUTH_ERROR_MAP, AUTH_SUCCESS_MAP } from '@/shared/constants'
import { prettifyCode } from '@/shared/utils'

export const formatCode = {
  error: (codeKey: string) => {
    const fallback = {
      title: prettifyCode(codeKey),
      description: 'Please try again or contact support if the problem persists.'
    }
    return AUTH_ERROR_MAP[codeKey] ?? fallback
  },
  success: (codeKey: string) => {
    const fallback = {
      title: prettifyCode(codeKey),
      description: 'If you have any questions, feel free to contact us.'
    }
    return AUTH_SUCCESS_MAP[codeKey] ?? fallback
  }
}
