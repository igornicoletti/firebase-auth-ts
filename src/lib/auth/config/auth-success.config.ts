// src/lib/auth/config/auth-success.config.ts

// Importa os códigos de sucesso e o tipo da sua fonte central de constantes
import { AuthSuccessCodes, type AuthSuccessCode } from '@/lib/auth/constants'

/**
 * Define a estrutura de um objeto de mensagem de sucesso.
 * Inclui um título e uma descrição para exibir ao usuário.
 */
type AuthSuccess = {
  title: string // O título da mensagem de sucesso (curto e direto).
  description: string // Uma descrição mais detalhada sobre o que aconteceu.
}

/**
 * Mapa que associa códigos de sucesso (AuthSuccessCode) a objetos de mensagem amigável (AuthSuccess).
 * Usado pelo sistema de toast para exibir feedback localizado e contextualizado ao usuário
 * após uma operação de autenticação bem-sucedida.
 */
export const authSuccessMap: Record<AuthSuccessCode, AuthSuccess> = {
  // Associa cada código de sucesso AuthSuccessCodes.CÓDIGO à sua mensagem correspondente.

  // Mensagem para login bem-sucedido.
  [AuthSuccessCodes.SIGNIN_SUCCESS]: {
    title: 'Welcome!',
    description: 'You have successfully signed in.',
  },

  // Mensagem para registro de conta bem-sucedido.
  [AuthSuccessCodes.SIGNUP_SUCCESS]: {
    title: 'Account Created!',
    // Mensagem clara que informa sobre o e-mail de verificação após o registro.
    description: 'Your account has been created successfully. We\'ve sent a verification email, please check your inbox to activate your account.',
  },

  // Mensagem para logout bem-sucedido.
  [AuthSuccessCodes.SIGNOUT_SUCCESS]: {
    title: 'Goodbye!',
    description: 'You have successfully signed out.',
  },

  // Mensagem para reautenticação bem-sucedida (ex: antes de operações sensíveis).
  [AuthSuccessCodes.REAUTH_SUCCESS]: {
    title: 'Verification Complete',
    description: 'Your identity was successfully verified.',
  },

  // Mensagem para o envio bem-sucedido de um e-mail de redefinição de senha.
  [AuthSuccessCodes.PASSWORD_RESET_EMAIL_SENT]: {
    title: 'Check Your Email',
    description: 'We sent a link to reset your password to your email address.',
    // Nota: Esta mensagem é mostrada mesmo se o e-mail não existir (quando a proteção contra enumeração de e-mail está ativa)
    // para evitar vazar informações sobre quais e-mails estão registrados.
  },

  // Mensagem para o envio bem-sucedido de um link de verificação de e-mail (separado do registro inicial).
  [AuthSuccessCodes.EMAIL_VERIFICATION_LINK_SENT]: {
    title: 'Check Your Email',
    description: 'We sent a verification link to your email address. Please check your inbox.',
  },

  // Mensagem para a conclusão bem-sucedida da verificação de e-mail.
  [AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS]: {
    title: 'Email Verified!',
    description: 'Your email address has been successfully verified.',
  },

  // Mensagem para a conclusão bem-sucedida da redefinição de senha usando o link de e-mail.
  [AuthSuccessCodes.PASSWORD_RESET_SUCCESS]: {
    title: 'Password Reset!',
    description: 'Your password has been successfully reset. You can now log in with your new password.',
  },

  // Mensagem para a atualização bem-sucedida das informações de perfil (excluindo email/senha específicos).
  [AuthSuccessCodes.PROFILE_UPDATE_SUCCESS]: {
    title: 'Profile Updated',
    description: 'Your information has been successfully saved.',
  },

  // Mensagem para a atualização bem-sucedida do endereço de e-mail.
  [AuthSuccessCodes.EMAIL_UPDATE_SUCCESS]: {
    title: 'Email Updated',
    description: 'Your email address has been updated.',
  },

  // Mensagem para a atualização bem-sucedida da senha.
  [AuthSuccessCodes.PASSWORD_UPDATE_SUCCESS]: {
    title: 'Password Updated',
    description: 'Your password has been successfully updated.',
  },

  // Mensagem para o vínculo bem-sucedido de um provedor de autenticação (ex: Google, Facebook) à conta existente.
  [AuthSuccessCodes.LINK_SUCCESS]: {
    title: 'Account Linked!',
    description: 'Your account has been successfully linked.',
  },

  // Mensagem para a desvinculação bem-sucedida de um provedor de autenticação da conta.
  [AuthSuccessCodes.UNLINK_SUCCESS]: {
    title: 'Account Unlinked',
    description: 'The provider has been unlinked from your account.',
  },

  // Mensagem genérica para qualquer outra operação de sucesso não especificada por um código dedicado.
  [AuthSuccessCodes.GENERIC_SUCCESS]: {
    title: 'Success!',
    description: 'Operation completed successfully.',
  },
}
