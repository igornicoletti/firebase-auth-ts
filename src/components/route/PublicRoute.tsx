import { useAuth } from '@/contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoute = () => {
  const { currentUser } = useAuth()

  if (currentUser?.emailVerified) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
