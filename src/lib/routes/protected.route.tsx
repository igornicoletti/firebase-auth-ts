// src/lib/routes/protected.route.tsx

import { useEffect, type JSX } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/lib/auth/contexts'
import { authAccess } from '@/lib/auth/helpers'
import { Loading } from '@/lib/routes'

type ProtectedValue = {
  requireEmailVerified?: boolean
  redirectTo?: string
}

export const Protected = ({
  requireEmailVerified = true,
  redirectTo = '/login'
}: ProtectedValue): JSX.Element => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isAllowed = authAccess(user, { requireEmailVerified })

  useEffect(() => {
    if (!loading) {
      if (!isAllowed) {
        navigate(redirectTo, { replace: true, state: { from: location.pathname } })
      }
    }
  }, [loading, isAllowed, navigate, location.pathname, redirectTo])

  if (loading) {
    return <Loading />
  }

  return isAllowed ? <Outlet /> : <></>
}
