// src/lib/auth/helpers/auth-access.helper.ts

import { type User } from 'firebase/auth'

type AuthAccess = {
  requireEmailVerified?: boolean
}

/**
 * Determines if a user is allowed to access a protected resource based on authentication status and email verification.
 * @param {User | null} user The current Firebase user object, or null if no user is signed in.
 * @param {AuthAccess} [options] An optional object with configuration options.
 * @param {boolean} [options.requireEmailVerified] If true, the user's email must be verified to allow access. Defaults to true.
 * @returns {boolean} True if the user is allowed to access the resource, false otherwise.
 */
export const authAccess = (user: User | null, options: AuthAccess = {}): boolean => {
  const { requireEmailVerified = true } = options

  if (!user) return false

  if (requireEmailVerified && !user.emailVerified) return false

  return true
}
