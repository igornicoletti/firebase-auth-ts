// src/lib/auth/context/auth-context.tsx

// Importa o tipo User do SDK do Firebase Authentication
import { type User } from 'firebase/auth'
// Importa hooks do React e funções para criar contexto
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

// Importa um componente de spinner para o estado de carregamento
import { LoadingSpinner } from '@/components/custom'
// Importa a instância do Firebase Auth inicializada
import { auth } from '@/lib/firebase'

/**
 * Define a forma do valor que será fornecido pelo Contexto de Autenticação.
 */
type AuthContextValue = {
  user: User | null // O objeto User autenticado ou null se não houver usuário logado.
  loading: boolean // Um booleano indicando se o estado de autenticação ainda está sendo carregado.
}

// Cria o Contexto de Autenticação com um valor inicial undefined.
// Será populado pelo AuthProvider.
const AuthContext = createContext<AuthContextValue | undefined>(undefined)

/**
 * Componente Provedor de Autenticação.
 * Gerencia o estado de autenticação globalmente usando o listener onAuthStateChanged do Firebase
 * e fornece esse estado para a árvore de componentes via Context API.
 *
 * @param {object} props - Props do componente.
 * @param {ReactNode} props.children - Os elementos filhos que terão acesso ao contexto.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado para armazenar o objeto User autenticado. Inicializa como null.
  const [user, setUser] = useState<User | null>(null)
  // Estado para controlar se o estado de autenticação está carregando inicialmente.
  // Começa como true porque onAuthStateChanged é assíncrono.
  const [loading, setLoading] = useState(true)

  // Efeito colateral para subscrever ao listener de estado de autenticação do Firebase.
  // Este useEffect roda apenas uma vez no montagem inicial do componente.
  useEffect(() => {
    // auth.onAuthStateChanged: Adiciona um listener que é chamado sempre que
    // o estado de autenticação do usuário muda (login, logout, inicialização).
    // Retorna uma função de "unsubscribe".
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // O callback recebe o usuário atual (ou null).
      setUser(currentUser)
      // Uma vez que onAuthStateChanged é chamado pela primeira vez, o estado
      // inicial de carregamento de autenticação terminou.
      setLoading(false)
    })

    // Cleanup function: É chamada quando o componente é desmontado.
    // Isso remove o listener onAuthStateChanged, prevenindo memory leaks.
    return unsubscribe
  }, []) // Array de dependências vazio significa que este efeito roda apenas uma vez.

  // Memoiza o valor do contexto para evitar renderizações desnecessárias dos consumidores
  // se user ou loading não mudarem.
  const value = useMemo(() => ({ user, loading }), [user, loading])

  return (
    // AuthContext.Provider: Torna o valor 'value' disponível para todos os
    // componentes descendentes que usarem useContext(AuthContext).
    <AuthContext.Provider value={value}>
      {/* Condicionalmente renderiza um spinner enquanto o estado inicial está carregando,
          ou renderiza os children uma vez que o carregamento inicial terminou. */}
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  )
}

/**
 * Hook customizado para acessar o Contexto de Autenticação.
 * Fornece o objeto User autenticado e o estado de carregamento.
 * Garante que o hook seja usado dentro de um AuthProvider.
 *
 * @returns {AuthContextValue} Um objeto contendo o usuário autenticado (ou null)
 *                             e um booleano indicando se o estado de autenticação está carregando.
 * @throws {Error} Lança um erro se o hook for usado fora do AuthProvider.
 */
export const useAuth = (): AuthContextValue => {
  // Tenta obter o contexto usando useContext.
  const context = useContext(AuthContext)

  // Verifica se o contexto é undefined. Isso acontece se o hook
  // for chamado fora da árvore de componentes envolvida pelo AuthProvider.
  if (!context) {
    // Lança um erro claro para o desenvolvedor corrigir a estrutura da aplicação.
    throw new Error('useAuth must be used within an AuthProvider')
  }

  // Retorna o valor do contexto. TypeScript sabe que não é undefined neste ponto.
  return context
}
