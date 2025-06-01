// src/lib/auth/components/auth-public.route.tsx

import type { JSX } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '@/lib/auth/contexts'
import { LoadingDots } from '@/lib/routes'

type AuthPublic = {
  redirectTo?: string
}

export const AuthPublic = ({ redirectTo = '/dashboard' }: AuthPublic): JSX.Element => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingDots />
  if (user) return <Navigate to={redirectTo} replace />

  return <Outlet />
}
