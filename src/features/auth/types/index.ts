// src/features/auth/types/index.ts

import type { User } from 'firebase/auth'

export type AuthUser = User | null

export type AuthState = {
  user: AuthUser
  loading: boolean
}

export type AuthContextValue = AuthState & {
  logout: () => Promise<void>
}

export type AuthOptions = {
  requireEmailVerified?: boolean
  redirectTo?: string
}
