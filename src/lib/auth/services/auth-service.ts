// src/lib/auth/services/auth-service.ts

import {
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type ActionCodeSettings,
  type User,
} from 'firebase/auth'

import { auth } from '@/lib/firebase'

const actionCodeSettings: ActionCodeSettings = {
  url: import.meta.env.DEV
    ? 'http://localhost:5173/callback'
    : 'https://firebase-auth-ts.vercel.app/callback',
  handleCodeInApp: true,
}

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const createUserWithEmail = async (email: string, password: string, displayName?: string): Promise<User> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(user, { displayName })
  }
  await sendEmailVerification(user, actionCodeSettings)
  return user
}

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email, actionCodeSettings)
}

export const sendEmailVerificationToCurrentUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser, actionCodeSettings)
  }
}

export const confirmUserPasswordReset = async (oobCode: string, newPassword: string): Promise<void> => {
  await confirmPasswordReset(auth, oobCode, newPassword)
}

export const applyUserActionCode = async (oobCode: string): Promise<void> => {
  await applyActionCode(auth, oobCode)
}

export const signOutUser = async (): Promise<void> => {
  await signOut(auth)
}
