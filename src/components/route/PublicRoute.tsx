import { useAuth } from '@/contexts/auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PublicRoute = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated && isEmailVerified) {
      navigate('/dashboard')
    } else if (!isLoading && isAuthenticated && !isEmailVerified) {
      navigate('/login')
    } else if (!isLoading && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isLoading, isAuthenticated, isEmailVerified, navigate])

  return <Outlet />
}
