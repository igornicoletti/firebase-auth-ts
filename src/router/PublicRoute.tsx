// src/router/PublicRoute.tsx

import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Loading } from '@/common'
import { useAuth } from '@/features'

type PublicRouteProps = {
  redirectTo?: string
  redirectToEmailVerification?: string
}

export const PublicRoute = ({
  redirectTo = '/dashboard',
  redirectToEmailVerification = '/login',
}: PublicRouteProps = {}) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      if (user.emailVerified) {
        navigate(redirectTo, { replace: true })
      } else {
        navigate(redirectToEmailVerification, { replace: true })
      }
    }
  }, [loading, user, navigate, redirectTo, redirectToEmailVerification])

  if (loading) {
    return <Loading message="Verifying your session..." />
  }

  return <Outlet />
}
