// src/routers/ProtectedRoute.tsx

import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/features'
import { LoadingScreen } from '@/shared/components'

type ProtectedRouteOptions = {
  requireEmailVerified?: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({
  requireEmailVerified = true,
  redirectTo = '/login'
}: ProtectedRouteOptions = {}) => {
  const { user, loading } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isAllowed = user && (!requireEmailVerified || user.emailVerified)

  useEffect(() => {
    if (!loading && !isAllowed) {
      navigate(redirectTo, {
        replace: true, state: {
          from: pathname
        }
      })
    }
  }, [loading, isAllowed, pathname, navigate, redirectTo])

  if (loading) return <LoadingScreen message='Verifying your session...' />

  return isAllowed ? <Outlet /> : null
}
