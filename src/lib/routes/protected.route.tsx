// src/lib/routes/protected.route.tsx

import { useEffect, type JSX } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth/contexts'
import { authAccess } from '@/lib/auth/helpers'
import { Loading } from '@/lib/routes'

type Protected = {
  requireEmailVerified?: boolean
  redirectTo?: string
}

export const Protected = ({ requireEmailVerified = true, redirectTo = '/login' }: Protected): JSX.Element => {
  const { user, loading } = useAuth()
  const isAllowed = authAccess(user, { requireEmailVerified })

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      if (!isAllowed) {
        navigate(redirectTo, { replace: true })
      }
    }

  }, [loading, isAllowed, navigate, redirectTo])

  if (loading) {
    return <Loading />
  }

  return <Outlet />
}
