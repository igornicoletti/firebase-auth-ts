// src/lib/firebase/firebase-init.ts

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

/**
 * Configuration object for Firebase.
 * These values are sourced from environment variables.
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

/**
 * Initializes the Firebase application using the configuration defined in `firebaseConfig`.
 */
const app = initializeApp(firebaseConfig)

/**
 * Gets the Firebase Authentication instance associated with the initialized app.
 */
const auth = getAuth(app)

export { app, auth }
