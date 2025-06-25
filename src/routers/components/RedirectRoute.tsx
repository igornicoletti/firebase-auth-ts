// src/routers/components/RedirectRoute.tsx

import { Navigate } from 'react-router-dom'

import { LoadingSpinner } from '@/components/common'
import { useAuth } from '@/hooks'

export const RedirectRoute = () => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return user?.emailVerified
    ? <Navigate to='/dashboard' replace />
    : <Navigate to='/login' replace />
}
