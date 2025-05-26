import { LoadingSpinner } from '@/components/custom'
import { useAuth } from '@/contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
