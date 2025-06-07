// src/auth/context/auth-provider.context.tsx

import { type User } from 'firebase/auth'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { auth } from '@/firebase'
import { Loading } from '@/routes'

type AuthProviderValues = {
  user: User | null
  loading: boolean
}

const AuthProviderContext = createContext<AuthProviderValues | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <AuthProviderContext.Provider value={value}>
      {loading && <Loading message="Initializing authentication..." />}
      {!loading && children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthProviderContext)

  if (context === undefined)
    throw new Error('useAuth must be used within a AuthProvider')

  return context
}
