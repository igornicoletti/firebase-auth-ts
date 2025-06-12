// src/features/auth/services/authService.ts

import { auth } from '@/configs/firebase'
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
  type User,
} from 'firebase/auth'


const actionCodeSettings: ActionCodeSettings = {
  url: import.meta.env.DEV
    ? 'http://localhost:5173/callback'
    : 'https://firebase-auth-ts.vercel.app/callback',
  handleCodeInApp: true,
}

export const authService = {
  // Google Sign In
  signInWithGoogle: async (): Promise<void> => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  },

  // Email/Password Sign In
  signInWithEmail: async (email: string, password: string): Promise<void> => {
    await signInWithEmailAndPassword(auth, email, password)
  },

  // Create User
  createUserWithEmail: async (email: string, password: string, displayName?: string): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(user, { displayName })
    }
    await sendEmailVerification(user, actionCodeSettings)
    return user
  },

  // Password Reset
  sendPasswordReset: async (email: string): Promise<void> => {
    await sendPasswordResetEmail(auth, email, actionCodeSettings)
  },

  // Email Verification
  sendEmailVerificationToCurrentUser: async (): Promise<void> => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser, actionCodeSettings)
    }
  },

  // Confirm Password Reset
  confirmUserPasswordReset: async (oobCode: string, newPassword: string): Promise<void> => {
    await confirmPasswordReset(auth, oobCode, newPassword)
  },

  // Apply Action Code (for email verification)
  applyUserActionCode: async (oobCode: string): Promise<void> => {
    await applyActionCode(auth, oobCode)
  },

  // Sign Out
  signOut: async (): Promise<void> => {
    await signOut(auth)
  },

  // Reauthenticate
  reauthenticateWithPassword: async (password: string): Promise<void> => {
    if (auth.currentUser && auth.currentUser.email) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, password)
      await reauthenticateWithCredential(auth.currentUser, credential)
    }
  },

  // Get current user
  getCurrentUser: () => auth.currentUser,

  // Check if user is authenticated
  isAuthenticated: () => !!auth.currentUser,

  // Check if email is verified
  isEmailVerified: () => auth.currentUser?.emailVerified ?? false,

  // Auth state observer
  onAuthStateChanged: auth.onAuthStateChanged.bind(auth),
}
