import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const PublicRoute = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { openDialog } = useDialog()
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (isEmailVerified) {
        navigate('/dashboard')
      } else {
        if (location.pathname !== '/login') {
          navigate('/login')
        }
        openDialog({
          title: 'Check your email',
          description: 'Please check your inbox and confirm your email to activate your account.',
        })
      }
    }
  }, [isLoading, isAuthenticated, isEmailVerified, location.pathname, navigate])

  return <Outlet />
}
