// authServices.ts
import { auth } from '@/services/firebase'
import { type AuthError, confirmPasswordReset, createUserWithEmailAndPassword, onAuthStateChanged as firebaseOnAuthStateChanged, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from 'firebase/auth'

/**
 * Registra um novo usuário com email e senha.
 * @param email - O email do usuário.
 * @param password - A senha do usuário.
 * @returns Uma Promise que resolve com o objeto User em caso de sucesso.
 * @throws FirebaseError em caso de erro (email já em uso, senha fraca, etc.).
 */
export const signupWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch (error: any) {
    throw error as AuthError
  }
}

/**
 * Realiza o login de um usuário com email e senha.
 * Inclui a verificação de email.
 * @param email - O email do usuário.
 * @param password - A senha do usuário.
 * @returns Uma Promise que resolve com o objeto User em caso de sucesso.
 * @throws FirebaseError em caso de erro (credenciais inválidas, usuário desabilitado, etc.).
 * @throws Error customizado se o email não for verificado.
 */
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    if (!user.emailVerified) {
      await signOut(auth)
    }
    return user
  } catch (error: any) {
    throw error as AuthError
  }
}

/**
 * Realiza o login com a conta Google.
 * @returns Uma Promise que resolve com o objeto User em caso de sucesso.
 * @throws FirebaseError em caso de erro.
 */
export const loginWithGoogle = async (): Promise<User> => {
  try {
    const provider = new GoogleAuthProvider()
    const { user } = await signInWithPopup(auth, provider)
    return user
  } catch (error: any) {
    throw error as AuthError
  }
}

/**
 * Envia um email de reset de senha para o email fornecido.
 * @param email - O email do usuário.
 * @returns Uma Promise que resolve em caso de sucesso.
 * @throws FirebaseError em caso de erro.
 */
export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    throw error as AuthError
  }
}

/**
 * Confirma o reset de senha com o código de ação e a nova senha.
 * Geralmente usado após o usuário clicar no link de reset de senha no email.
 * @param actionCode - O código de ação da URL de reset de senha.
 * @param newPassword - A nova senha do usuário.
 * @returns Uma Promise que resolve em caso de sucesso.
 * @throws FirebaseError em caso de erro (código inválido/expirado, senha fraca, etc.).
 */
export const resetPassword = async (actionCode: string, newPassword: string): Promise<void> => {
  try {
    await confirmPasswordReset(auth, actionCode, newPassword)
  } catch (error: any) {
    throw error as AuthError
  }
}

/**
 * Desloga o usuário atual.
 * @returns Uma Promise que resolve em caso de sucesso.
 * @throws FirebaseError em caso de erro.
 */
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth)
  } catch (error: any) {
    throw error as AuthError
  }
}

/**
 * Configura um observador para o estado de autenticação.
 * Esta função é um listener que reage a mudanças no estado de login (usuário logado, deslogado, etc.).
 * É ideal para ser usada em um React Context ou no ponto mais alto da sua aplicação
 * para manter o estado de autenticação globalmente acessível e atualizado.
 * @param callback - Uma função que será chamada toda vez que o estado de autenticação mudar.
 *                   Recebe o objeto User (ou null se ninguém estiver logado).
 * @returns Uma função de "unsubscribe" para parar de observar as mudanças.
 */
export const onAuthStateChangedObserver = (callback: (user: User | null) => void) => {
  return firebaseOnAuthStateChanged(auth, callback)
}
