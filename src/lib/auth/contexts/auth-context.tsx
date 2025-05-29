// src/lib/auth/context/auth-context.tsx

import { auth } from '@/lib/firebase'
import { type User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Use o hook para obter o estado de autenticação do Firebase
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // Começa como true pois o Firebase leva um tempo para inicializar e verificar o estado

  useEffect(() => {
    // onAuthStateChanged é o listener do Firebase para o estado de autenticação
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setLoading(false) // A autenticação inicial terminou de carregar
    })

    // Cleanup function: remove o listener quando o componente é desmontado
    return () => unsubscribe()
  }, [])
  // Renderiza os filhos APENAS depois que o estado inicial do FirebaseAuth for carregado
  // Isso evita renderizar partes da UI que dependem do usuário antes de saber se há um usuário
  if (loading) {
    // Opcional: Mostrar um spinner de carregamento global
    return <div>Carregando autenticação...</div>
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children} {/* Renderiza children apenas depois de carregar o estado inicial */}
      {loading && <div>Carregando...</div>} {/* Opcional: um loader */}
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
