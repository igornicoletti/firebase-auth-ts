// src/lib/auth/components/auth-protected-route.tsx

import { LoadingSpinner } from '@/components/custom'
import { useAuth } from '@/lib/auth/contexts'
import { canAccess } from '@/lib/auth/helpers/auth-can-access'
import { Navigate, Outlet } from 'react-router-dom'

type AuthProtected = {
  requireEmailVerified?: boolean
  redirectTo?: string
}

/**
 * A protected route component that checks if the user is authenticated and optionally if their email is verified.
 * If the conditions are not met, the user is redirected to the specified route.
 * @param {AuthProtected} props - The component props.
 * @param {boolean} [props.requireEmailVerified=true] - Whether the user's email must be verified to access the route.
 * @param {string} [props.redirectTo='/login'] - The path to redirect to if the user is not authorized.
 * @returns {React.ReactElement} - Either the child routes (`Outlet`) if authorized, or a `Navigate` component for redirection.
 */
export const AuthProtectedRoute = ({
  requireEmailVerified = true,
  redirectTo = '/login',
}: AuthProtected) => {
  const { user, loading } = useAuth()

  // Display a loading spinner while checking the authentication state.
  if (loading) {
    return <LoadingSpinner />
  }

  // Determine if the user has the necessary permissions.
  const isAllowed = canAccess(user, { requireEmailVerified })

  // If the user is not allowed, redirect them.
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />
  }

  // If the user is allowed, render the child routes.
  return <Outlet />
}
