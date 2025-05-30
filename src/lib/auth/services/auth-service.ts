// src/lib/auth/services/auth-service.ts

import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'

import { auth } from '@/lib/firebase/firebase'

export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  if (userCredential.user && displayName) {
    await updateProfile(userCredential.user, { displayName })
  }
  if (userCredential.user) {
    await sendEmailVerification(userCredential.user)
  }
  return userCredential.user
}

export const sendVerificationEmailToCurrentUser = async (): Promise<void> => {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser)
  }
}

export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email)
}

export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

export const signOutUser = async (): Promise<void> => {
  await signOut(auth)
}

export const confirmUserPasswordReset = async (oobCode: string, newPassword: string): Promise<void> => {
  await confirmPasswordReset(auth, oobCode, newPassword)
}
