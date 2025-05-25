import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { useEffect, useRef } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const PublicRoute = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { openDialog } = useDialog()
  const dialogShown = useRef(false)

  useEffect(() => {
    if (loading) return

    const isAuthenticated = !!user
    const isEmailVerified = user?.emailVerified

    if (isAuthenticated && isEmailVerified) {
      navigate('/dashboard', { replace: true })
    } else if (isAuthenticated && !isEmailVerified) {
      if (!dialogShown.current) {
        openDialog({
          title: 'Check your email',
          description: 'Please check your inbox and confirm your email to activate your account.',
        })
        dialogShown.current = true
      }
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true })
      }
    }
  }, [user, loading, navigate, location.pathname, openDialog])

  return <Outlet />
}
