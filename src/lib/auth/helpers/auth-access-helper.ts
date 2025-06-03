// src/lib/auth/helpers/auth-access.helper.ts

import { type User } from 'firebase/auth'

type AuthAccess = {
  requireEmailVerified?: boolean
}

export const authAccess = (user: User | null, options: AuthAccess = {}): boolean => {
  const { requireEmailVerified = true } = options

  if (!user) return false

  if (requireEmailVerified && !user.emailVerified) return false

  return true
}
