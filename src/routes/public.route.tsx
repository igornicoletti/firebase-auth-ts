// src/lib/routes/public.route.tsx

import { useEffect, type JSX } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '@/auth/contexts'
import { Loading } from '@/routes'

type PublicValue = {
  redirectTo?: string
}

export const Public = ({ redirectTo = '/' }: PublicValue): JSX.Element => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user?.emailVerified) {
      navigate(redirectTo, { replace: true })
    }
  }, [loading, user, navigate, redirectTo])

  if (loading) {
    return <Loading message='Verifying your session...' />
  }

  return <Outlet />
}
