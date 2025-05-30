// src/lib/auth/components/auth-protected-route.tsx

import { Navigate, Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components/custom'
import { useAuth } from '@/lib/auth/contexts'
import { canAccess } from '@/lib/auth/helpers'

export const AuthProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  const isAllowed = canAccess(user)
  if (!isAllowed) return <Navigate to="/login" replace />

  return <Outlet />
}
