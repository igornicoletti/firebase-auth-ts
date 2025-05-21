import { auth } from '@/services/firebase'
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  currentUser: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isEmailVerified: boolean
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<UserCredential | undefined>
  signInWithEmailPassword: (email: string, password: string) => Promise<UserCredential>
  signUpWithEmailPassword: (email: string, password: string, username?: string) => Promise<{ success: boolean; requiresVerification: boolean }>
  sendVerificationEmail: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  confirmNewPassword: (oobCode: string, newPassword: string) => Promise<void>
}

const handleAuthError = (error: unknown): never => {
  const code = (error as { code?: string })?.code ?? 'AUTH/UNKNOWN'
  console.error('[Auth Error]', code)
  throw { code }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      handleAuthError(error)
    }
  }

  const signInWithGoogle = async (): Promise<UserCredential | undefined> => {
    try {
      const provider = new GoogleAuthProvider()
      console.log("Google Provider:", provider)
      console.log("Auth Instance:", auth)
      return await signInWithPopup(auth, provider)
    } catch (error) {
      handleAuthError(error)
    }
  }

  const signInWithEmailPassword = async (email: string, password: string): Promise<UserCredential> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if (!userCredential.user.emailVerified) {
        await logout()
        throw new Error('EMAIL_NOT_VERIFIED')
      }

      return userCredential
    } catch (error) {
      handleAuthError(error)
      throw error
    }
  }

  const signUpWithEmailPassword = async (email: string, password: string, username?: string): Promise<{ success: boolean; requiresVerification: boolean }> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      await sendEmailVerification(userCredential.user)

      if (username) {
        await updateProfile(userCredential.user, { displayName: username })
      }

      await logout()

      return { success: true, requiresVerification: true }
    } catch (error) {
      handleAuthError(error)
      return { success: false, requiresVerification: false }
    }
  }

  const sendVerificationEmail = async (): Promise<void> => {
    try {
      if (currentUser) {
        await sendEmailVerification(currentUser)
      } else {
        throw new Error('No user is currently signed in')
      }
    } catch (error) {
      handleAuthError(error)
    }
  }

  const sendPasswordReset = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error) {
      handleAuthError(error)
    }
  }

  const confirmNewPassword = async (oobCode: string, newPassword: string): Promise<void> => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword)
    } catch (error) {
      handleAuthError(error)
    }
  }

  const isAuthenticated = !!currentUser
  const isEmailVerified = currentUser?.emailVerified || false

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        isAuthenticated,
        isEmailVerified,
        logout,
        signInWithGoogle,
        signInWithEmailPassword,
        signUpWithEmailPassword,
        sendVerificationEmail,
        sendPasswordReset,
        confirmNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
