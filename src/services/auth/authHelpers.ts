import type { AuthError } from 'firebase/auth'

export const getFriendlyErrorMessage = (error: AuthError): string => {
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
      return 'Por favor, faça login novamente para realizar esta ação.'
    case 'auth/too-many-requests':
      return 'Muitas tentativas de login falharam. Tente novamente mais tarde.'
    case 'auth/operation-not-allowed':
      return 'Autenticação por email/senha não habilitada.'
    case 'auth/popup-blocked':
      return 'O popup de login foi bloqueado pelo navegador.'
    case 'auth/popup-closed-by-user':
      return 'O popup de login foi fechado.'
    case 'auth/invalid-action-code':
      return 'Código de ação inválido.'
    case 'auth/invalid-credential':
      return 'Credenciais inválida.'
    case 'auth/expired-action-code':
      return 'O link de redefinição de senha é inválido ou expirou.'
    case 'auth/email-not-verified':
      return 'Por favor, verifique seu email para continuar.'

    default:
      return 'Ocorreu um erro de autenticação. Por favor, tente novamente.'
  }
}
