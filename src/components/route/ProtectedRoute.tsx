import { useAuth } from '@/contexts/auth/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const location = useLocation()
  const { currentUser } = useAuth()

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className='min-h-screen grid place-items-center'>
      <Outlet />
    </div>
  )
}
