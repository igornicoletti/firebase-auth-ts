// src/shared/utils/extractCode.ts

import { FirebaseError } from 'firebase/app'

export const extractCode = (codeKey: unknown): string => {
  if (typeof codeKey === 'string') return codeKey
  if (codeKey instanceof FirebaseError) return codeKey.code
  if (codeKey instanceof Error) return codeKey.message
  if (codeKey && typeof codeKey === 'object' && 'code' in codeKey) {
    return String((codeKey as any).code)
  }
  return 'unknown'
}
