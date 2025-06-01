// src/lib/auth/components/auth-protected.route.tsx

import type { JSX } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/lib/auth/contexts'
import { authAccess } from '@/lib/auth/helpers'
import { LoadingDots } from '@/lib/routes'

type AuthProtected = {
  requireEmailVerified?: boolean
  redirectTo?: string
}

export const AuthProtected = ({ requireEmailVerified = true, redirectTo = '/login' }: AuthProtected): JSX.Element => {
  const { user, loading } = useAuth()
  const isAllowed = authAccess(user, { requireEmailVerified })

  if (loading) return <LoadingDots />
  if (!isAllowed) return <Navigate to={redirectTo} replace />

  return <Outlet />
}
