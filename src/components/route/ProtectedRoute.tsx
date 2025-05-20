import { useAuth } from '@/contexts/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
