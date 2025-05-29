// src/lib/auth/errors/auth-format-codes.ts

import { authErrorMap } from '@/lib/auth/config'

export const authFormatCodes = (code: string) => {
  const fallback = {
    title: prettifyCode(code),
    description: 'Something went wrong. Please try again.',
  }

  return authErrorMap[code] ?? fallback
}

const prettifyCode = (code: string) => {
  if (!code.includes('/')) return code

  const [_, raw] = code.split('/')

  return raw
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
