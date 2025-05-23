import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  requireAuth?: boolean
  requireVerification?: boolean
}

export const ProtectedRoute = ({ requireAuth = true, requireVerification = false }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const { openDialog } = useDialog()
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      navigate('/login')
    } else if (requireAuth && requireVerification && !isEmailVerified) {
      openDialog({
        title: 'Check your email',
        description: `A verification link has been sent. Please check your inbox and confirm your email to complete your registration.`,
      })
    }
  }, [isLoading, isAuthenticated, isEmailVerified, requireAuth, requireVerification, navigate])

  return <Outlet />
}
