import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  requireAuth?: boolean
  requireVerification?: boolean
}

export const ProtectedRoute = ({ requireAuth = true, requireVerification = false }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { openDialog } = useDialog()
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      navigate('/login')
    } else if (requireAuth && requireVerification && !isEmailVerified) {
      if (location.pathname !== '/login') {
        navigate('/login')
      }
      openDialog({
        title: 'Check your email',
        description: 'Please check your inbox and confirm your email to activate your account.',
      })
    }
  }, [isLoading, isAuthenticated, isEmailVerified, requireAuth, requireVerification, location.pathname, navigate])

  return <Outlet />
}
