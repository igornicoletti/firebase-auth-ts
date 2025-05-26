// AuthContext.tsx
import { LoadingSpinner } from '@/components/custom'
import { forgotPassword, getFriendlyErrorMessage, loginWithEmail, loginWithGoogle, logout, onAuthStateChangedObserver, resetPassword, signupWithEmail } from '@/services/auth'
import { sendEmailVerification, updateProfile, type AuthError, type User as FirebaseUser } from 'firebase/auth'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type AuthContextType = {
  user: FirebaseUser | null
  isLoading: boolean
  error: string | null
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  loginGoogle: () => Promise<void>
  forgotPasswordRequest: (email: string) => Promise<void>
  resetPasswordConfirm: (actionCode: string, newPassword: string, confirmNewPassword: string) => Promise<void>
  logoutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedObserver((firebaseUser) => {
      setUser(firebaseUser)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleError = (err: any) => {
    setError(null)
    const friendlyMessage = getFriendlyErrorMessage(err as AuthError)
    setError(friendlyMessage)
    console.log("Erro AuthContext:", err)
  }

  const signup = async (email: string, password: string, confirmPassword: string, username: string) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem.")
      }
      const user = await signupWithEmail(email, password)
      await updateProfile(user, { displayName: username })
      await sendEmailVerification(user)
      await logout()
    } catch (err: any) {
      handleError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await loginWithEmail(email, password)
    } catch (err: any) {
      handleError(err)
      throw err
    }
  }

  const loginGoogle = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const user = await loginWithGoogle()
      console.log("Login com Google bem-sucedido:", user)
    } catch (err: any) {
      handleError(err)
      throw err
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
    } catch (err: any) {
      handleError(err)
      throw err
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
      await resetPassword(actionCode, newPassword)
      console.log("Senha redefinida com sucesso.")
    } catch (err: any) {
      handleError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logoutUser = async () => {
    setError(null)
    setIsLoading(true)
    try {
      await logout()
      console.log("Usuário deslogado.")
    } catch (err: any) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const contextValue: AuthContextType = {
    user, isLoading, error,
    signup, login, loginGoogle, logoutUser,
    forgotPasswordRequest, resetPasswordConfirm
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
      {isLoading && <LoadingSpinner />}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
