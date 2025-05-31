// src/lib/auth/constants/auth-constant.ts

/**
 * Define os códigos de ação (modes) que podem ser encontrados nos links de e-mail do Firebase Authentication.
 * Estes códigos são usados para determinar o tipo de operação a ser realizada (verificar e-mail, resetar senha, etc.).
 */
export const AuthActionCodes = {
  VERIFY_EMAIL: 'verifyEmail', // Código para links de verificação de e-mail.
  RESET_PASSWORD: 'resetPassword', // Código para links de redefinição de senha.
  // Adicionar outros códigos de ação aqui se necessário (ex: recoverEmail, signIn).
  // RECOVER_EMAIL: 'recover-email',
  // SIGN_IN: 'sign-in',
} as const // 'as const' infere tipos string literais mais restritos.


/**
 * Define os códigos que identificam as diferentes páginas de autenticação pública na aplicação.
 * Usado principalmente para mapear caminhos de URL para dados de layout e links entre páginas.
 */
export const AuthDataCodes = {
  LOGIN: 'login', // Código para a página de login.
  REGISTER: 'register', // Código para a página de registro.
  FORGOT_PASSWORD: 'forgot-password', // Código para a página de 'esqueceu a senha'.
  RESET_PASSWORD: 'reset-password', // Código para a página de redefinição de senha.
} as const // 'as const' infere tipos string literais mais restritos.

/**
 * Tipo que representa uma chave válida do AuthDataCodes.
 * Inferido dos valores do objeto AuthDataCodes para segurança de tipo.
 */
export type AuthDataCode = typeof AuthDataCodes[keyof typeof AuthDataCodes]


/**
 * Define os códigos que identificam diferentes eventos de sucesso de autenticação na aplicação.
 * Usado para mapear eventos de sucesso para mensagens amigáveis exibidas via toast.
 */
export const AuthSuccessCodes = {
  SIGNIN_SUCCESS: 'signin-success', // Sucesso ao fazer login.
  SIGNUP_SUCCESS: 'signup-success', // Sucesso ao criar uma nova conta.
  SIGNOUT_SUCCESS: 'signout-success', // Sucesso ao fazer logout.
  REAUTH_SUCCESS: 'reauth-success', // Sucesso ao reautenticar o usuário.
  PASSWORD_RESET_EMAIL_SENT: 'password-reset-email-sent', // Sucesso ao enviar o e-mail de redefinição de senha.
  EMAIL_VERIFICATION_LINK_SENT: 'email-verification-link-sent', // Sucesso ao enviar o link de verificação de e-mail.
  EMAIL_VERIFIED_SUCCESS: 'email-verified-success', // Sucesso ao verificar o e-mail do usuário.
  PASSWORD_RESET_SUCCESS: 'password-reset-success', // Sucesso ao redefinir a senha.
  PROFILE_UPDATE_SUCCESS: 'profile-update-success', // Sucesso ao atualizar o perfil do usuário.
  EMAIL_UPDATE_SUCCESS: 'email-update-success', // Sucesso ao atualizar o e-mail do usuário.
  PASSWORD_UPDATE_SUCCESS: 'password-update-success', // Sucesso ao atualizar a senha do usuário.
  LINK_SUCCESS: 'link-success', // Sucesso ao vincular um provedor à conta existente.
  UNLINK_SUCCESS: 'unlink-success', // Sucesso ao desvincular um provedor da conta.
  GENERIC_SUCCESS: 'generic-success', // Código genérico para qualquer outro sucesso não especificado.
} as const // 'as const' infere tipos string literais mais restritos.

/**
 * Tipo que representa uma chave válida do AuthSuccessCodes.
 * Inferido dos valores do objeto AuthSuccessCodes para segurança de tipo.
 */
export type AuthSuccessCode = typeof AuthSuccessCodes[keyof typeof AuthSuccessCodes]

// Outras constantes ou tipos relacionados à autenticação podem ser adicionados aqui.
