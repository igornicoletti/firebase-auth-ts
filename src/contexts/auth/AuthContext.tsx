import { auth } from '@/services/firebase'
import { GoogleAuthProvider, type User, type UserCredential, confirmPasswordReset, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  currentUser: User | null
  logout: () => Promise<void>
  signInWithEmailPassword: (email: string, password: string) => Promise<UserCredential>
  signUpWithEmailPassword: (email: string, password: string, username?: string) => Promise<UserCredential>
  signInWithGoogle: () => Promise<UserCredential>
  sendPasswordReset: (email: string) => Promise<void>
  confirmResetPassword: (oobCode: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signInWithEmailPassword = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    await userCredential.user.reload()
    return userCredential
  }

  const signUpWithEmailPassword = async (email: string, password: string, username?: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (username) {
      await updateProfile(userCredential.user, { displayName: username })
    }
    await sendEmailVerification(userCredential.user)
    return userCredential
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    await userCredential.user.reload()
    return userCredential
  }

  const logout = () => {
    return signOut(auth)
  }

  const sendPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email, {
      url: `${import.meta.env.VITE_APP_ORIGIN}/reset-password`,
      handleCodeInApp: true,
    })
  }

  const confirmResetPassword = (oobCode: string, password: string) => {
    return confirmPasswordReset(auth, oobCode, password)
  }

  const value = {
    currentUser,
    logout,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signInWithGoogle,
    sendPasswordReset,
    confirmResetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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
