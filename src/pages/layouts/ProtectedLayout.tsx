import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LoadingSpinner } from '@/components/feedback'
import { useAuthGuard } from '@/hooks/useAuthGuard'
import { PATHS } from '@/routers/paths'

export const ProtectedLayout = () => {
  const { isLoading, isAllowed } = useAuthGuard({ requireEmailVerified: true })
  const location = useLocation()

  if (isLoading) return <LoadingSpinner />

  if (!isAllowed) {
    return (
      <Navigate
        to={PATHS.auth.login}
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}
