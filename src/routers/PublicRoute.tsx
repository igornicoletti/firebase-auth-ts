// src/routers/PublicRoute.tsx

import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { LoadingSpinner } from '@/shared/components'
import { useAuth } from '@/shared/hooks'

type PublicRouteProps = {
  redirectTo?: string
  redirectToEmailVerification?: string
}

export const PublicRoute = ({
  redirectTo = '/dashboard',
  redirectToEmailVerification = '/login',
}: PublicRouteProps = {}) => {
  const navigate = useNavigate()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      if (user.emailVerified) {
        navigate(redirectTo, { replace: true })
      } else {
        navigate(redirectToEmailVerification, { replace: true })
      }
    }
  }, [loading, user, navigate, redirectTo, redirectToEmailVerification])

  if (loading) return <LoadingSpinner message="Verifying your session..." />

  return <Outlet />
}
