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
  type User,
} from 'firebase/auth'

import { auth } from '@/lib/firebase'

/**
 * Signs in a user with Google using a popup.
 */
export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

/**
 * Signs in a user with their email and password.
 * @param {string} email The user's email address.
 * @param {string} password The user's password.
 */
export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
}

/**
 * Creates a new user with the provided email and password, and optionally sets their display name.
 * It also sends an email verification to the newly created user.
 * @param {string} email The new user's email address.
 * @param {string} password The new user's password.
 * @param {string} [displayName] Optional display name for the new user.
 * @returns {Promise<User>} The Firebase User object of the newly created user.
 */
export const createUserWithEmail = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  if (displayName) {
    await updateProfile(user, { displayName })
  }

  await sendEmailVerification(user)

  return user
}

/**
 * Sends a password reset email to the given email address.
 * @param {string} email The email address to send the reset link to.
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email)
}

/**
 * Confirms a password reset using the oobCode and the new password.
 * @param {string} oobCode The out-of-band code from the reset link.
 * @param {string} newPassword The new password to set for the user.
 */
export const confirmUserPasswordReset = async (oobCode: string, newPassword: string): Promise<void> => {
  await confirmPasswordReset(auth, oobCode, newPassword)
}

/**
 * Applies an action code (e.g., for email verification) using the oobCode.
 * @param {string} oobCode The out-of-band code from the action link.
 */
export const applyUserActionCode = async (oobCode: string): Promise<void> => {
  await applyActionCode(auth, oobCode)
}

/**
 * Signs out the current user.
 */
export const signOutUser = async (): Promise<void> => {
  await signOut(auth)
}
