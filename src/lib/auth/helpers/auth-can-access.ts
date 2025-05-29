// src/lib/auth/helpers/auth-can-access.ts

import { type User } from 'firebase/auth'

interface CanAccessType {
  requireEmailVerified?: boolean
}

export const canAccess = (user: User | null, { requireEmailVerified = true }: CanAccessType = {}): boolean => {
  if (!user) return false
  if (requireEmailVerified && !user.emailVerified) return false
  return true
}
