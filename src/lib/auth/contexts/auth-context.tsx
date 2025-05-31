// src/lib/auth/context/auth-context.tsx

import { type User } from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { LoadingSpinner } from '@/components/custom'
import { auth } from '@/lib/firebase'

type AuthContextValue = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Provides the authentication context to its children.
 * It tracks the current Firebase user and the loading state of the authentication status.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Subscribe to Firebase's authentication state changes.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    // Unsubscribe from the listener when the component unmounts.
    return unsubscribe
  }, [])

  // Memoize the context value to avoid unnecessary re-renders.
  const value = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {/* Display a loading spinner while the authentication state is being determined. */}
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  )
}

/**
 * A custom hook to access the authentication context values (user and loading state).
 * @returns {AuthContextValue} - An object containing the current user and the loading state.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
