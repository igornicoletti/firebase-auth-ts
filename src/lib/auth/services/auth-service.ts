// src/lib/auth/services/auth-service.ts

// Importa as funções e tipos necessários do SDK do Firebase Authentication
import {
  applyActionCode, // Função para aplicar códigos de ação fora de banda (ex: verificação de email)
  confirmPasswordReset, // Função para finalizar o reset de senha com o código e nova senha
  createUserWithEmailAndPassword, // Função para criar um novo usuário com email e senha
  GoogleAuthProvider, // Provedor de autenticação Google
  sendEmailVerification, // Função para enviar o email de verificação para o usuário atual
  sendPasswordResetEmail, // Função para enviar o email de redefinição de senha
  signInWithEmailAndPassword, // Função para logar um usuário com email e senha
  signInWithPopup, // Função para logar com um provedor usando um popup (ex: Google, Facebook)
  signOut, // Função para fazer logout do usuário atual
  updateProfile, // Função para atualizar o perfil do usuário (ex: nome de exibição)
  type User, // Tipo que representa um usuário autenticado no Firebase
} from 'firebase/auth'

// Importa a instância do Firebase Auth inicializada no seu projeto
import { auth } from '@/lib/firebase'

/**
 * Inicia o fluxo de login com o Google usando um popup.
 * Redireciona para o fluxo de autorização do Google e, em caso de sucesso, autentica o usuário.
 * A Promise se resolve com o resultado da autenticação (incluindo o usuário e credenciais),
 * ou rejeita em caso de erro (popup bloqueado, usuário fechou, erro do Google, etc.).
 *
 * @returns {Promise<void>} Uma Promise que se resolve quando o login com Google for bem-sucedido.
 *                          Rejeita em caso de erro.
 */
export const signInWithGoogle = async (): Promise<void> => {
  // Cria uma nova instância do provedor de autenticação Google.
  const provider = new GoogleAuthProvider()
  // Inicia o fluxo de login usando um popup.
  // Await para garantir que a operação seja concluída antes que a função retorne.
  await signInWithPopup(auth, provider)
  // Nota: O resultado da Promise (UserCredential) não está sendo usado aqui,
  // a função apenas espera que a operação termine com sucesso ou falhe.
}

/**
 * Tenta logar um usuário existente com email e senha.
 *
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<void>} Uma Promise que se resolve quando o login for bem-sucedido.
 *                          Rejeita em caso de credenciais inválidas, usuário desabilitado, etc.
 */
export const signInWithEmail = async (email: string, password: string): Promise<void> => {
  // Chama a função de login com email e senha do Firebase Auth.
  // Await para esperar a conclusão da operação.
  await signInWithEmailAndPassword(auth, email, password)
  // Nota: O resultado da Promise (UserCredential) não está sendo usado aqui.
}

/**
 * Cria um novo usuário com email e senha e, opcionalmente, define um nome de exibição.
 * Após a criação bem-sucedida, envia um email de verificação para o usuário.
 *
 * @param {string} email - O email para o novo usuário.
 * @param {string} password - A senha para o novo usuário.
 * @param {string} [displayName] - Opcional. O nome de exibição a ser definido para o usuário.
 * @returns {Promise<User>} Uma Promise que se resolve com o objeto User do usuário recém-criado e logado.
 *                         Rejeita em caso de email já em uso, senha fraca, email inválido, etc.
 */
export const createUserWithEmail = async (email: string, password: string, displayName?: string): Promise<User> => {
  // Cria o usuário com email e senha. A Promise resolve com UserCredential, que contém o objeto user.
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  // Se um nome de exibição foi fornecido, tenta atualizar o perfil do usuário.
  if (displayName) {
    // Chama a função updateProfile com o objeto user e os dados a serem atualizados.
    await updateProfile(user, { displayName })
  }

  // Envia o email de verificação para o usuário recém-criado.
  // Nota: sendEmailVerification usa o usuário atualmente logado, que é o usuário recém-criado neste ponto.
  await sendEmailVerification(user)

  // Retorna o objeto User do usuário recém-criado e (agora) logado.
  return user
}

/**
 * Envia um email de redefinição de senha para o endereço de email fornecido.
 *
 * @param {string} email - O email para o qual enviar o link de redefinição de senha.
 * @returns {Promise<void>} Uma Promise que se resolve quando o email for enviado com sucesso.
 *                          Rejeita em caso de email inválido, problemas de envio, etc.
 *                          (Nota: Não rejeita por email não encontrado se Email Enumeration Protection estiver ativo).
 */
export const sendPasswordReset = async (email: string): Promise<void> => {
  // Chama a função sendPasswordResetEmail do Firebase Auth.
  // Passamos a instância auth e o email.
  await sendPasswordResetEmail(auth, email)
}

/**
 * Conclui o processo de redefinição de senha usando o código fora de banda (oobCode) recebido no email.
 *
 * @param {string} oobCode - O código de ação fora de banda da URL de redefinição de senha.
 * @param {string} newPassword - A nova senha a ser definida para o usuário.
 * @returns {Promise<void>} Uma Promise que se resolve quando a senha for redefinida com sucesso.
 *                          Rejeita em caso de código inválido/expirado, senha fraca, etc.
 */
export const confirmUserPasswordReset = async (oobCode: string, newPassword: string): Promise<void> => {
  // Chama a função confirmPasswordReset do Firebase Auth.
  // Passamos a instância auth, o código e a nova senha.
  await confirmPasswordReset(auth, oobCode, newPassword)
}

/**
 * Aplica um código de ação fora de banda (oobCode).
 * Usado para verificar e-mail, recuperar e-mail, ou fazer login com link.
 *
 * @param {string} oobCode - O código de ação fora de banda da URL (email link).
 * @returns {Promise<void>} Uma Promise que se resolve quando o código de ação for aplicado com sucesso.
 *                          Rejeita em caso de código inválido/expirado, ou outro erro.
 */
export const applyUserActionCode = async (oobCode: string): Promise<void> => {
  // Chama a função applyActionCode do Firebase Auth.
  // Passamos a instância auth e o código.
  await applyActionCode(auth, oobCode)
  // Nota: Dependendo do 'mode' (verificar email vs login com link), a API Firebase
  // pode ou não logar o usuário automaticamente após applyActionCode.
  // Para verificação de email, você geralmente precisa chamar user.reload() depois.
}

/**
 * Faz logout do usuário atualmente autenticado.
 *
 * @returns {Promise<void>} Uma Promise que se resolve quando o logout for concluído com sucesso.
 *                          Pode rejeitar em caso de erro (raro, ex: problema no keychain).
 */
export const signOutUser = async (): Promise<void> => {
  // Chama a função signOut do Firebase Auth.
  // Passamos a instância auth.
  await signOut(auth)
}
