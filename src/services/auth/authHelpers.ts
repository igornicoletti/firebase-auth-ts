// authHelpers.ts
import type { AuthError } from 'firebase/auth'

/**
 * Traduz códigos de erro do Firebase Auth para mensagens amigáveis.
 * @param error - O erro lançado pelo Firebase Auth.
 * @returns Uma string com a mensagem de erro.
 */
export const getFriendlyErrorMessage = (error: AuthError): string => {
  // Você pode adicionar mais códigos de erro aqui conforme necessário
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Nenhum usuário encontrado com este email.'
    case 'auth/wrong-password':
      return 'Senha incorreta.'
    case 'auth/invalid-email':
      return 'Formato de email inválido.'
    case 'auth/email-already-in-use':
      return 'Este email já está em uso.'
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 6 caracteres.'
    case 'auth/requires-recent-login':
      return 'Por favor, faça login novamente para realizar esta ação.' // Ex: para deletar conta
    case 'auth/too-many-requests':
      return 'Muitas tentativas de login falharam. Tente novamente mais tarde.'
    case 'auth/operation-not-allowed':
      return 'Autenticação por email/senha não habilitada.' // Verifique nas configurações do Firebase
    case 'auth/popup-blocked':
      return 'O popup de login foi bloqueado pelo navegador.'
    case 'auth/popup-closed-by-user':
      return 'O popup de login foi fechado.'
    case 'auth/invalid-action-code':
    case 'auth/expired-action-code':
      return 'O link de redefinição de senha é inválido ou expirou.'
    case 'auth/email-not-verified': // Código "customizado" para o nosso fluxo de login bloqueado
      return 'Por favor, verifique seu email para continuar.'
    // Adicione outros códigos conforme sua necessidade

    default:
      // Para erros desconhecidos ou genéricos
      console.error("Erro de autenticação desconhecido:", error) // Logar o erro original para debug
      return 'Ocorreu um erro de autenticação. Por favor, tente novamente.'
  }
}
