import { auth } from '@/services/firebase'
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  type Auth,
  type User,
} from 'firebase/auth'
import { createContext, useContext } from 'react'

interface AuthContextType {
  auth: Auth
  currentUser: User | null
  signInWithEmailPassword: (email: string, password: string) => Promise<void>
  signUpWithEmailPassword: (email: string, password: string, username?: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  confirmNewPassword: (oobCode: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const currentUser = auth.currentUser

  const signInWithEmailPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUpWithEmailPassword = async (email: string, password: string, username?: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    if (user && username) {
      await updateProfile(user, { displayName: username })
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email)
  }

  const confirmNewPassword = async (oobCode: string, newPassword: string) => {
    await confirmPasswordReset(auth, oobCode, newPassword)
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        currentUser,
        sendPasswordReset,
        confirmNewPassword,
        signInWithEmailPassword,
        signUpWithEmailPassword,
        signInWithGoogle,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
