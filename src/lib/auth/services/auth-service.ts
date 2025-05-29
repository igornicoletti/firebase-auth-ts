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
  type User, // Importe o tipo User
} from 'firebase/auth' // Importe todos os métodos do SDK que você usará

import { auth } from '@/lib/firebase/firebase' // Importe a instância auth


// Login com Email e Senha
export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  // Apenas chama o método do SDK. Qualquer erro será lançado e capturado pelo chamador.
  // Não precisa retornar o UserCredential aqui, pois o AuthProvider está escutando onAuthStateChanged
  await signInWithEmailAndPassword(auth, email, password)
}

// Cadastro com Email e Senha
export const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)

  // Se o cadastro foi bem-sucedido e um nome foi fornecido, atualiza o perfil
  if (userCredential.user && displayName) {
    await updateProfile(userCredential.user, { displayName })
    // O onAuthStateChanged pode não disparar imediatamente após updateProfile,
    // mas a próxima vez que o usuário logar, o displayName estará lá.
    // Para ter o displayName atualizado imediatamente no app, você pode precisar
    // recarregar o usuário ou confiar no listener.
  }

  // Envia o email de verificação imediatamente após o cadastro
  // userCredential.user é o usuário que acabou de ser criado e logado
  if (userCredential.user) {
    await sendEmailVerification(userCredential.user)
  }

  // Retorna o objeto User (agora com displayName se foi setado)
  return userCredential.user
}

// Enviar Email de Verificação (para usuário logado)
export const sendVerificationEmailToCurrentUser = async (): Promise<void> => {
  // Checa se há um usuário logado antes de tentar enviar o email
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser)
  } else {
    // Opcional: Lançar um erro se não houver usuário logado
    // throw new Error("No user is currently logged in to send verification email.");
    console.warn("sendVerificationEmailToCurrentUser called with no user logged in.")
  }
}

// Resetar Senha (Enviar email)
export const sendPasswordReset = async (email: string): Promise<void> => {
  // Apenas chama o método do SDK.
  await sendPasswordResetEmail(auth, email)
}

// Login com Google (via Popup)
export const signInWithGoogle = async (): Promise<void> => {
  const provider = new GoogleAuthProvider()
  // Não precisa retornar o UserCredential aqui, o AuthProvider escuta onAuthStateChanged
  await signInWithPopup(auth, provider)
}

// Logout
export const signOutUser = async (): Promise<void> => {
  // Apenas chama o método do SDK.
  await signOut(auth)
}

// Confirmar Reset de Senha (usando oobCode)
export const confirmUserPasswordReset = async (oobCode: string, newPassword: string): Promise<void> => {
  // Apenas chama o método do SDK.
  await confirmPasswordReset(auth, oobCode, newPassword)
}

// --- Você pode adicionar outras funções de serviço aqui conforme necessário ---
// Ex: reauthenticateWithCredential, updatePassword, deleteUser, etc.
