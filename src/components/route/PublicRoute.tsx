import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PublicRoute = () => {
  const navigate = useNavigate()
  const { openDialog } = useDialog()
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (isEmailVerified) {
        navigate('/dashboard')
      } else {
        navigate('/login')
        openDialog({
          title: 'Check your email',
          description: `A verification link has been sent. Please check your inbox and confirm your email to complete your registration.`,
        })
      }
    }
  }, [isLoading, isAuthenticated, isEmailVerified, navigate])

  return <Outlet />
}
