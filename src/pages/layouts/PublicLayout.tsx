import { Navigate, Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components/feedback'
import { useGuestGuard } from '@/hooks/useGuestGuard'
import { PATHS } from '@/routers/paths'

export const PublicLayout = () => {
  const { isLoading, isAuthenticated, isEmailVerified } = useGuestGuard()

  if (isLoading) return <LoadingSpinner />

  if (isAuthenticated) {
    return isEmailVerified
      ? <Navigate to={PATHS.app.dashboard} replace />
      : <Navigate to={PATHS.auth.login} replace />
  }

  return <Outlet />
}
