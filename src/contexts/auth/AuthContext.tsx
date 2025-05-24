import { auth } from '@/services/firebase'
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
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
  signInWithGoogle: () => Promise<UserCredential>
  signInWithEmailPassword: (email: string, password: string) => Promise<UserCredential>
  signUpWithEmailPassword: (email: string, password: string, username?: string) => Promise<{ success: boolean; requiresVerification: boolean }>
  sendVerificationEmail: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  confirmNewPassword: (oobCode: string, newPassword: string) => Promise<void>
  reloadUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const googleProvider = new GoogleAuthProvider()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const getCallbackUrl = () => {
    return `${import.meta.env.VITE_APP_ORIGIN}/callback`
  }

  const logout = () => signOut(auth)

  const reloadUser = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser)
      setCurrentUser(auth.currentUser)
    }
  }

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

  const signInWithEmailPassword = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    if (!user.emailVerified) {
      await logout()
      const error = new Error('Email not verified'); (error as any).code = 'auth/email-not-verified'
      throw error
    }

    return { user } as UserCredential
  }

  const signUpWithEmailPassword = async (email: string, password: string, username?: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    if (username) {
      await updateProfile(user, { displayName: username })
      await reload(user)
      setCurrentUser(auth.currentUser)
    }

    await sendEmailVerification(user)
    await logout()

    return { success: true, requiresVerification: true }
  }

  const sendVerificationEmail = () => {
    if (!currentUser) return Promise.reject(new Error('auth/no-current-user'))
    return sendEmailVerification(currentUser, {
      url: getCallbackUrl(),
    })
  }

  const sendPasswordReset = (email: string) =>
    sendPasswordResetEmail(auth, email, {
      url: getCallbackUrl(),
    })

  const confirmNewPassword = (oobCode: string, newPassword: string) => confirmPasswordReset(auth, oobCode, newPassword)

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        isAuthenticated: !!currentUser,
        isEmailVerified: currentUser?.emailVerified ?? false,
        logout,
        signInWithGoogle,
        signInWithEmailPassword,
        signUpWithEmailPassword,
        sendVerificationEmail,
        sendPasswordReset,
        confirmNewPassword,
        reloadUser,
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
