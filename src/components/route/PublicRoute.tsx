import { useAuth } from '@/contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const PublicRoute = () => {
  const { currentUser } = useAuth()

  if (currentUser) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
