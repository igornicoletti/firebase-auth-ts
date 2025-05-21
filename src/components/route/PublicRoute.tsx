import { useAuth } from '@/contexts/auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export const PublicRoute = () => {
  const { isAuthenticated, isEmailVerified, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated && isEmailVerified) {
      navigate('/dashboard')
    } else if (!isLoading && isAuthenticated && !isEmailVerified) {
      navigate('/login')
    } else if (!isLoading && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isLoading, isAuthenticated, isEmailVerified, navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <Outlet />
}
