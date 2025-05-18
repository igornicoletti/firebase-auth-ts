import { useAuth } from '@/contexts/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const location = useLocation()
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const isVerifyEmailPage = location.pathname === '/verify-email'

  if (!currentUser.emailVerified && !isVerifyEmailPage) {
    return <Navigate to="/verify-email" replace />
  }

  return <Outlet />
}
