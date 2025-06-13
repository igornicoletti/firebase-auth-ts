// src/features/auth/contexts/AuthProvider.tsx

import type { User } from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react'

import { Loading } from '@/common/components'
import { authService } from '@/features/auth/services'

type AuthState = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({ user, loading }), [user, loading])

  if (loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={value}>
      {loading && <Loading message="Initializing authentication..." />}
      {!loading && children}
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
