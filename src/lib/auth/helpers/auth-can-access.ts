// src/lib/auth/helpers/auth-can-access.ts

import { type User } from 'firebase/auth'

interface CanAccessType {
  requireEmailVerified?: boolean
}

export const canAccess = (user: User | null, options: CanAccessType = {}): boolean => {
  const { requireEmailVerified = true } = options

  if (!user) return false

  if (requireEmailVerified && user.emailVerified !== true) return false

  return true
}
