// src/features/auth/contexts/AuthProvider.tsx

import { Loading } from '@/common/components'
import { authService } from '@/features/auth/services'
import type { AuthContextValue } from '@/features/auth/types'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(authService.getCurrentUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    logout: () => authService.signOut().then(() => setUser(null)),
  }), [user, loading])

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
