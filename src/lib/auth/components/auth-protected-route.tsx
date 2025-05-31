// src/lib/auth/components/auth-protected-route.tsx

import { Navigate, Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components/custom'
import { useAuth } from '@/lib/auth/contexts'
import { canAccess } from '@/lib/auth/helpers'

interface AuthProtectedRouteProps {
  requireEmailVerified?: boolean
  redirectTo?: string
}

export const AuthProtectedRoute = ({
  requireEmailVerified = true,
  redirectTo = '/login'
}: AuthProtectedRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  const isAllowed = canAccess(user, { requireEmailVerified })

  if (!isAllowed) return <Navigate to={redirectTo} replace />

  return <Outlet />
}
