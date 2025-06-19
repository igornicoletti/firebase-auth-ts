// src/shared/services/authService.ts

import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type ActionCodeSettings,
  type User
} from 'firebase/auth'

import { auth } from '@/configs/firebase'

const actionCodeSettings: ActionCodeSettings = {
  url: import.meta.env.DEV
    ? 'http://localhost:5173/callback'
    : 'https://firebase-auth-ts.vercel.app/callback',
  handleCodeInApp: true
}

export const authService = {
  signInWithGoogle: async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  },
  signInWithEmail: async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password)
  },
  createUserWithEmail: async (email: string, password: string, displayName?: string): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(user, { displayName })
    }
    await sendEmailVerification(user, actionCodeSettings)
    return user
  },
  sendPasswordReset: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
  },
  sendEmailVerificationToCurrentUser: async (): Promise<void> => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, actionCodeSettings)
    }
  },
  confirmUserPasswordReset: async (oobCode: string, newPassword: string): Promise<void> => {
    await confirmPasswordReset(auth, oobCode, newPassword)
  },
  applyUserActionCode: async (oobCode: string): Promise<void> => {
    await applyActionCode(auth, oobCode)
  },
  signOut: async (): Promise<void> => {
    await signOut(auth)
  },
  reauthenticateWithPassword: async (password: string): Promise<void> => {
    if (auth.currentUser && auth.currentUser.email) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, password)
      await reauthenticateWithCredential(auth.currentUser, credential)
    }
  },
  getCurrentUser: () => auth.currentUser,
  isAuthenticated: () => !!auth.currentUser,
  isEmailVerified: () => auth.currentUser?.emailVerified ?? false,
  onAuthStateChanged: auth.onAuthStateChanged.bind(auth),
}
