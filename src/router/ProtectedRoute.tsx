// src/router/ProtectedRoute.tsx

import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/features'
import { LoadingProgress } from '@/shared/components'

type ProtectedRouteOptions = {
  requireEmailVerified?: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({
  requireEmailVerified = true,
  redirectTo = '/login'
}: ProtectedRouteOptions = {}) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isAllowed = user && (!requireEmailVerified || user.emailVerified)

  useEffect(() => {
    if (!loading && !isAllowed) {
      navigate(redirectTo, {
        replace: true,
        state: {
          from: location.pathname
        }
      })
    }
  }, [loading, isAllowed, navigate, location.pathname, redirectTo])

  if (loading) {
    return <LoadingProgress message='Verifying your session...' />
  }

  return isAllowed ? <Outlet /> : null
}
