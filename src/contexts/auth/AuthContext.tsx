// AuthContext.tsx
import { sendEmailVerification, updateProfile, type AuthError, type User as FirebaseUser } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// Importa os serviços e helpers
import {
  forgotPassword,
  loginWithEmail,
  loginWithGoogle,
  logout,
  onAuthStateChangedObserver,
  resetPassword,
  signupWithEmail
} from '@/services/auth'

import { getFriendlyErrorMessage } from '@/services/auth' // O helper para mensagens de erro

// --- TIPAGEM ---

// Define a estrutura do contexto
interface AuthContextType {
  user: FirebaseUser | null // O usuário logado do Firebase (ou null)
  isLoading: boolean // Indica se o estado de autenticação está sendo carregado inicialmente
  error: string | null // Mensagem de erro para exibir na UI
  // Funções de autenticação
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void> // Adicionado name e confirmePassword para o form, mas signupWithEmail só usa email/password
  login: (email: string, password: string) => Promise<void>
  loginGoogle: () => Promise<void>
  forgotPasswordRequest: (email: string) => Promise<void>
  resetPasswordConfirm: (actionCode: string, newPassword: string, confirmNewPassword: string) => Promise<void> // Adicionado confirmNewPassword
  logoutUser: () => Promise<void> // Renomeado para evitar conflito com a função importada
  clearError: () => void // Para limpar a mensagem de erro
}

// Cria o Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// --- PROVEDOR DO CONTEXTO ---

interface AuthProviderProps {
  children: ReactNode // Os componentes filhos que terão acesso ao contexto
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Começa como true, pois o estado inicial está sendo carregado
  const [error, setError] = useState<string | null>(null)

  // Efeito para ligar o observador quando o componente monta
  useEffect(() => {
    // onAuthStateChangedObserver retorna a função de unsubscribe
    const unsubscribe = onAuthStateChangedObserver((firebaseUser) => {
      setUser(firebaseUser)
      setIsLoading(false) // O estado inicial foi carregado
      // Nota: O redirecionamento baseado no user (null, verificado, não verificado)
      // geralmente é feito nas rotas ou em um componente superior que usa este contexto.
      // Ex: Um componente de "AuthWrapper" ou no seu sistema de roteamento.
    })

    // Função de cleanup para desligar o observador quando o componente desmonta
    return () => unsubscribe()
  }, []) // Array de dependências vazio significa que roda apenas na montagem/desmontagem

  // --- IMPLEMENTAÇÃO DAS FUNÇÕES DE AUTENTICAÇÃO EXPOSTAS PELO CONTEXTO ---

  const handleError = (err: any) => {
    // Usamos o helper para obter a mensagem amigável
    const friendlyMessage = getFriendlyErrorMessage(err as AuthError)
    setError(friendlyMessage)
    console.error("Erro AuthContext:", err) // Logar o erro original no console para debug
  }

  const clearError = () => {
    setError(null)
  }


  const signup = async (email: string, password: string, confirmPassword: string, username: string) => {
    setError(null) // Limpa erros anteriores
    setIsLoading(true) // Opcional: indicar carregamento
    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem.")
      }
      // No fluxo pedido, após criar, vai pro login.
      // A função signupWithEmail já cria o usuário e o loga *temporariamente*.
      // No entanto, para seguir o fluxo "create -> login" E A REGRA DE EMAIL NÃO VALIDADO -> LOGIN,
      // não precisamos manter o usuário logado após a criação aqui.
      // O fluxo `loginWithEmail` é que validará e logará E/OU bloqueará.
      // Vamos apenas chamar a criação e, se sucesso, supor que o componente que chamou
      // vai redirecionar para a tela de login.
      // Importante: Você deve enviar o email de verificação aqui ou logo após a criação!
      const user = await signupWithEmail(email, password)
      await updateProfile(user, { displayName: username })
      await sendEmailVerification(user)
      // await user.sendEmailVerification(); // <--- CHAME ISSO AQUI!
      console.log("Usuário criado com sucesso. Por favor, verifique seu email.", user)
      // Não atualiza o user state aqui, pois o fluxo pede para ir pro login.
      // O onAuthStateChanged detectaria o login temporário, mas queremos forçar o fluxo via login screen.
      // Se você quer seguir ESTREITAMENTE o fluxo "create -> login", o ideal é:
      // 1. Chamar signupWithEmail
      // 2. Chamar sendEmailVerification
      // 3. Chamar signOut imediatamente (para que o observador não defina o usuário logado)
      // 4. Redirecionar para a tela de login.

      // Exemplo seguindo estritamente o fluxo create -> login:
      await logout() // Desloga o usuário criado temporariamente
      // O componente que chamou 'signup' DEVE AGORA REDIRECIONAR PARA A ROTA DE LOGIN
      alert("Sua conta foi criada! Por favor, verifique seu email antes de fazer login.") // Feedback ao usuário

    } catch (err: any) {
      handleError(err)
      throw err // Relança o erro para que o componente que chamou possa tratá-lo (ex: exibir toast)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)
    try {
      // A função loginWithEmail já contém a lógica de verificação de email
      const user = await loginWithEmail(email, password)
      console.log("Usuário logado com sucesso:", user)
      // O onAuthStateChanged observará essa mudança e atualizará o estado 'user' aqui no context
      // e o componente/router poderá redirecionar para o dashboard.
      alert("Login bem-sucedido!") // Feedback
    } catch (err: any) {
      handleError(err)
      throw err // Relança o erro
    } finally {
      setIsLoading(false)
    }
  }

  const loginGoogle = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const user = await loginWithGoogle()
      console.log("Login com Google bem-sucedido:", user)
      // O onAuthStateChanged observará essa mudança e atualizará o estado 'user'.
      alert("Login com Google bem-sucedido!") // Feedback
    } catch (err: any) {
      handleError(err)
      throw err // Relança o erro
    } finally {
      setIsLoading(false)
    }
  }


  const forgotPasswordRequest = async (email: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await forgotPassword(email)
      console.log("Email de reset de senha enviado para:", email)
      // O componente que chamou esta função pode exibir uma mensagem de sucesso.
      alert("Um email com instruções para resetar sua senha foi enviado (se o email estiver cadastrado).")
    } catch (err: any) {
      handleError(err)
      // Não relançamos o erro aqui se a intenção é apenas exibir a mensagem de erro ao usuário.
      // Se você precisar que o componente que chamou saiba do sucesso/falha para outra lógica,
      // pode relançar: throw err;
    } finally {
      setIsLoading(false)
    }
  }

  const resetPasswordConfirm = async (actionCode: string, newPassword: string, confirmNewPassword: string) => {
    setError(null)
    setIsLoading(true)
    try {
      if (newPassword !== confirmNewPassword) {
        throw new Error("As novas senhas não coincidem.")
      }
      // A função resetPassword não retorna nada em caso de sucesso
      await resetPassword(actionCode, newPassword)
      console.log("Senha resetada com sucesso.")
      // No fluxo pedido ("resetar senha -> login"), após o reset,
      // o usuário deve ser redirecionado para a tela de login.
      // O componente que chamou 'resetPasswordConfirm' DEVE AGORA REDIRECIONAR PARA A ROTA DE LOGIN
      alert("Sua senha foi redefinida com sucesso. Por favor, faça login com sua nova senha.")

    } catch (err: any) {
      handleError(err)
      throw err // Relança o erro para que o componente que chamou possa tratá-lo
    } finally {
      setIsLoading(false)
    }
  }


  const logoutUser = async () => {
    setError(null)
    setIsLoading(true) // Opcional: pode mostrar um loading rápido
    try {
      await logout() // Chama a função de logout do authServices
      console.log("Usuário deslogado.")
      // O onAuthStateChanged observer irá detectar que o usuário agora é null
      // e o estado 'user' no context será atualizado,
      // o que fará com que o componente/router redirecione para a tela de login.
      alert("Você foi desconectado.") // Feedback
    } catch (err: any) {
      handleError(err)
      // throw err; // Raramente relança em logout, a menos que seja um erro grave
    } finally {
      setIsLoading(false) // Opcional
    }
  }


  // --- VALOR DO CONTEXTO ---

  const contextValue: AuthContextType = {
    user,
    isLoading,
    error,
    signup,
    login,
    loginGoogle,
    forgotPasswordRequest,
    resetPasswordConfirm,
    logoutUser,
    clearError,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children} {/* Renderiza os filhos apenas depois que o estado inicial é carregado */}
      {/* Opcional: pode renderizar um spinner de loading enquanto isLoading é true */}
      {isLoading && <div>Carregando autenticação...</div>}
    </AuthContext.Provider>
  )
}

// --- HOOK CUSTOMIZADO ---

/**
* Hook customizado para acessar o contexto de autenticação.
* Simplifica o uso do useContext em componentes.
* @returns O objeto do contexto de autenticação.
* @throws Error se o hook for usado fora do AuthProvider.
*/
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
