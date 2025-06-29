import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthGuard } from '@/hooks/useAuthGuard'
import { PATHS } from '@/routers/paths'

export const RedirectPage = () => {
  const { isLoading, isAuthenticated, isEmailVerified } = useAuthGuard()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return

    const target = isAuthenticated
      ? isEmailVerified
        ? PATHS.app.dashboard
        : PATHS.auth.login
      : PATHS.auth.login

    navigate(target, { replace: true })
  }, [isLoading, isAuthenticated, isEmailVerified, navigate])

  return null
}
