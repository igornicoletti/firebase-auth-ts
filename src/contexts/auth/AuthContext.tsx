import { auth } from '@/lib/firebase'
import {
  GoogleAuthProvider,
  type User,
  applyActionCode,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

interface AuthContextProps {
  user: User | null
  loading: boolean
  loginWithEmail: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  registerUser: (email: string, password: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (oobCode: string, newPassword: string) => Promise<void>
  verifyEmail: (oobCode: string) => Promise<void> // Método para verificar email com código
  logout: () => Promise<void>
  sendVerificationEmail: () => Promise<void> // Método para enviar o link de verificação
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    // Observer para o estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setIsLoading(false)
    })

    // Limpa o observer quando o componente é desmontado
    return () => unsubscribe()
  }, [])

  // --- Métodos de Autenticação ---

  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // O observer onAuthStateChanged acima atualizará o estado do usuário
    } catch (error) {
      throw error // Rejeita a promise para que o componente chamador possa lidar com o erro (ex: desabilitar botão)
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      // O observer cuidará do estado
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }


  const registerUser = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Após o cadastro, envie o email de verificação automaticamente
      await sendEmailVerification(userCredential.user)
      // O observer cuidará do estado, mas o usuário ainda não estará verificado
      // Você pode adicionar uma mensagem de sucesso aqui ou na UI após o registro
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string) => {
    setIsLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      // Mensagem de sucesso para o usuário
      // Você pode adicionar um toast ou modal aqui
      console.log("Password reset email sent!") // Exemplo simples
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Método para resetar a senha usando o código OOB
  const resetPassword = async (oobCode: string) => {
    setIsLoading(true)
    try {
      await applyActionCode(auth, oobCode)
      // Mensagem de sucesso
      console.log("Password has been reset successfully!")
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Método para verificar o email usando o código OOB
  const verifyEmail = async (oobCode: string) => {
    setIsLoading(true)
    try {
      await applyActionCode(auth, oobCode)
      // Mensagem de sucesso
      console.log("Email verified successfully!")
      // O usuário pode precisar recarregar a página ou ser redirecionado para atualizar o estado de verificação
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Método para reenviar o link de verificação de email
  const sendVerificationEmail = async () => {
    setIsLoading(true) // Opcional, dependendo de como você gerencia o loading para esta ação
    try {
      if (user) { // Só envia se houver um usuário logado
        await sendEmailVerification(user)
        console.log("Verification email sent!") // Mensagem de sucesso
      } else {
        console.warn("No user logged in to send verification email.")
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false) // Opcional
    }
  }


  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut(auth)
      // O observer cuidará da limpeza do estado do usuário
    } catch (error) {
      throw error
    } finally {
      // Não defina loading para false aqui se você estiver redirecionando para uma página
      // que também usa o useAuth e tem seu próprio loading.
      // Deixe o onAuthStateChanged definir o usuário para null e o loading para false.
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        loginWithGoogle,
        registerUser,
        forgotPassword,
        resetPassword,
        verifyEmail,
        logout,
        sendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
