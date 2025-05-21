import { useAuth } from '@/contexts/auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

type ProtectedRouteProps = {
  requireAuth?: boolean
  requireVerification?: boolean
}

export const ProtectedRoute = ({ requireAuth = true, requireVerification }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        navigate('/login')
      } else if (requireAuth && requireVerification && !isEmailVerified) {
        navigate('/verify-email')
      }
    }
  }, [isLoading, isAuthenticated, isEmailVerified, navigate, requireAuth, requireVerification])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (
    (!requireAuth) ||
    (requireAuth && isAuthenticated && !requireVerification) ||
    (requireAuth && isAuthenticated && requireVerification && isEmailVerified)
  ) {
    return <Outlet />
  }

  return <div>Redirecting...</div>
}
