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
  signInWithGoogle: () => Promise<UserCredential>
  signInWithEmailPassword: (email: string, password: string) => Promise<UserCredential>
  signUpWithEmailPassword: (email: string, password: string, username?: string) => Promise<{ success: boolean; requiresVerification: boolean }>
  sendVerificationEmail: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  confirmNewPassword: (oobCode: string, newPassword: string) => Promise<void>
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

  const logout = () => auth.signOut()

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const signInWithEmailPassword = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    if (!userCredential.user.emailVerified) {
      await logout()
      const error = new Error('auth/email-not-verified');
      (error as any).code = 'auth/email-not-verified'
      throw error
    }
    return userCredential
  }

  const signUpWithEmailPassword = async (email: string, password: string, username?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(userCredential.user)
    if (username) {
      await updateProfile(userCredential.user, { displayName: username })
    }
    await logout()
    return { success: true, requiresVerification: true }
  }

  const sendVerificationEmail = () => {
    if (!currentUser) return Promise.reject(new Error('No user logged in'))
    return sendEmailVerification(currentUser)
  }

  const sendPasswordReset = (email: string) => sendPasswordResetEmail(auth, email)

  const confirmNewPassword = (oobCode: string, newPassword: string) =>
    confirmPasswordReset(auth, oobCode, newPassword)

  const isAuthenticated = Boolean(currentUser)
  const isEmailVerified = currentUser?.emailVerified ?? false

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
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
