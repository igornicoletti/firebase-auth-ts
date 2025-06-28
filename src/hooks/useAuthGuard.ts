import { useAuth } from '@/contexts/AuthProvider'

export const useAuthGuard = (options?: { requireEmailVerified?: boolean }) => {
  const { user, isLoading } = useAuth()

  const isAuthenticated = !!user
  const isEmailVerified = user?.emailVerified ?? false

  const isAllowed = isAuthenticated && (
    !options?.requireEmailVerified || isEmailVerified
  )

  return {
    user,
    isLoading,
    isAuthenticated,
    isEmailVerified,
    isAllowed,
  }
}
