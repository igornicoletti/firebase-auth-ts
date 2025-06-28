import { useAuth } from '@/contexts/AuthProvider'

export const useGuestGuard = () => {
  const { user, isLoading } = useAuth()

  const isAuthenticated = !!user
  const isEmailVerified = user?.emailVerified ?? false

  return {
    user,
    isLoading,
    isAuthenticated,
    isEmailVerified,
  }
}
