// src/lib/routes/public.route.tsx

import { useEffect, type JSX } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth/contexts'
import { Loading } from '@/lib/routes'

type Public = {
  redirectTo?: string
}

export const Public = ({ redirectTo = '/dashboard' }: Public): JSX.Element => {
  const { user, loading } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate(redirectTo, { replace: true })
      }
    }
  }, [loading, user, navigate, redirectTo])

  if (loading) {
    return <Loading />
  }

  return <Outlet />
}
