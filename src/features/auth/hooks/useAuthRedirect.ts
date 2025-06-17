// src/features/auth/hooks/useAuthRedirect.ts

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/shared/hooks'

type UseAuthRedirectOptions = {
  defaultRedirect?: string
  requireEmailVerified?: boolean
}

export const useAuthRedirect = ({
  defaultRedirect = '/dashboard',
  requireEmailVerified = true
}: UseAuthRedirectOptions = {}) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (loading) return

    if (user && (!requireEmailVerified || user.emailVerified)) {
      const from = location.state?.from || defaultRedirect
      navigate(from, { replace: true })
    }
  }, [user, loading, navigate, location.state, defaultRedirect, requireEmailVerified])

  return {
    isRedirecting: !loading && user && (!requireEmailVerified || user.emailVerified)
  }
}
