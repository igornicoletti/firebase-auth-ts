// src/lib/auth/config/auth-error.config.ts

// Importa o objeto AuthErrorCodes diretamente do SDK do Firebase Authentication
import { AuthErrorCodes } from 'firebase/auth'

/**
 * Define a estrutura de um objeto de mensagem de erro.
 * Inclui um título e uma descrição para exibir ao usuário.
 */
type AuthError = {
  title: string // O título da mensagem de erro (curto e direto).
  description: string // Uma descrição mais detalhada sobre o que deu errado e, possivelmente, como corrigir.
}

/**
 * Mapa que associa códigos de erro do Firebase Authentication (string) a objetos de mensagem amigável (AuthError).
 * Usado pelo sistema de toast para exibir feedback claro e útil ao usuário
 * quando uma operação de autenticação falha.
 */
export const authErrorMap: Record<string, AuthError> = {
  // Associa cada código de erro Firebase Auth (AuthErrorCodes.CÓDIGO) à sua mensagem amigável correspondente.

  [AuthErrorCodes.INVALID_EMAIL]: {
    title: 'Invalid Email',
    description: 'The email address is not valid.',
  },
  [AuthErrorCodes.EMAIL_EXISTS]: {
    title: 'Email Already In Use',
    description: 'This email address is already associated with an account.',
    // Nota: Para este erro, você pode querer instruir o usuário a fazer login
    // ou usar a opção 'esqueceu a senha'.
  },
  [AuthErrorCodes.INVALID_PASSWORD]: {
    title: 'Invalid Password',
    description: 'The password entered is incorrect.',
    // Nota: Quando a proteção contra enumeração de e-mail está ativa, este erro
    // E AuthErrorCodes.USER_DELETED (user-not-found) podem ser retornados
    // como AuthErrorCodes.INVALID_LOGIN_CREDENTIALS para ambos os casos,
    // para evitar vazar se o email existe ou não.
  },
  [AuthErrorCodes.USER_DELETED]: {
    title: 'User Not Found',
    description: 'No account found with this email.',
    // Nota: Ver nota em INVALID_PASSWORD sobre proteção contra enumeração de e-mail.
  },
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: {
    title: 'Too Many Requests',
    description: 'Too many attempts. Please try again later.',
    // Geralmente ocorre após muitas tentativas de login/reset de senha falhas.
  },
  [AuthErrorCodes.EXPIRED_OOB_CODE]: {
    title: 'Link Expired',
    description: 'The action link has expired. Please try again.',
    // Código usado para links de e-mail expirados (verificação, reset, etc.).
  },
  [AuthErrorCodes.INVALID_OOB_CODE]: {
    title: 'Invalid Link',
    description: 'The action link is invalid or already used.',
    // Código usado para links de e-mail inválidos ou já utilizados.
  },
  [AuthErrorCodes.INVALID_LOGIN_CREDENTIALS]: {
    title: 'Invalid Credentials', // Título mais genérico que abrange email/senha inválidos
    description: 'The email address or password entered is incorrect.',
    // Este código é retornado quando Email Enumeration Protection está ativado
    // e o email não existe OU a senha está incorreta.
  },
  [AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE]: {
    title: 'Credential Already In Use',
    description: 'This credential is already associated with another account.',
    // Ocorre ao tentar vincular um provedor (ex: Google) que já está associado a OUTRA conta Firebase.
  },
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: {
    title: 'Re-authentication Required',
    description: 'Please log in again to perform this action.',
    // Ocorre ao tentar realizar operações sensíveis (ex: mudar senha, e-mail)
    // sem que o usuário tenha logado recentemente.
  },
  [AuthErrorCodes.INTERNAL_ERROR]: {
    title: 'Internal Error',
    description: 'An unexpected error occurred. Please try again later.',
    // Erro genérico para problemas no servidor ou outros erros inesperados.
  },
  [AuthErrorCodes.USER_DISABLED]: {
    title: 'Account Disabled',
    description: 'This user account has been disabled by an administrator.',
    // Ocorre ao tentar logar ou realizar operações com uma conta desabilitada.
  },
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: {
    title: 'Popup Closed',
    description: 'The sign-in popup was closed before completing the login.',
    // Ocorre em fluxos de login/link via popup (Google, Facebook, etc.).
  },
  [AuthErrorCodes.ADMIN_ONLY_OPERATION]: {
    title: 'Admin Only Operation',
    description: 'This operation is restricted to administrators.',
    // Código de erro menos comum, geralmente relacionado a tentativas de API restritas.
  },
  [AuthErrorCodes.ARGUMENT_ERROR]: {
    title: 'Argument Error',
    description: 'Invalid argument provided.',
    // Erro genérico para argumentos inválidos passados a uma API.
  },
  [AuthErrorCodes.APP_NOT_AUTHORIZED]: {
    title: 'App Not Authorized',
    description: 'This app is not authorized to perform the operation.',
    // Pode ocorrer se o ID do app ou a origem não estiverem configurados/permitidos.
  },
  [AuthErrorCodes.CAPTCHA_CHECK_FAILED]: {
    title: 'Captcha Failed',
    description: 'Captcha verification failed.',
    // Ocorre se o reCAPTCHA (para telefone ou outras operações) falhar.
  },
  [AuthErrorCodes.EXPIRED_POPUP_REQUEST]: {
    title: 'Popup Request Expired',
    description: 'The popup request expired. Please try again.',
    // Relacionado a fluxos de popup que levam muito tempo.
  },
  [AuthErrorCodes.INVALID_API_KEY]: {
    title: 'Invalid API Key',
    description: 'The API key provided is invalid.',
    // Problema na configuração do Firebase.
  },
  [AuthErrorCodes.INVALID_CUSTOM_TOKEN]: {
    title: 'Invalid Custom Token',
    description: 'The custom token format is incorrect.',
    // Ocorre ao tentar logar com um token customizado malformado ou inválido (gerado no servidor).
  },
  [AuthErrorCodes.INVALID_OAUTH_CLIENT_ID]: {
    title: 'Invalid OAuth Client ID',
    description: 'The OAuth client ID is invalid.',
    // Problema na configuração do provedor OAuth (Google, Facebook, etc.).
  },
  [AuthErrorCodes.MISSING_CODE]: {
    title: 'Missing Code',
    description: 'The required verification code is missing.',
    // Usado no contexto de links de ação de e-mail ou verificação de telefone.
  },
  [AuthErrorCodes.NETWORK_REQUEST_FAILED]: {
    title: 'Network Request Failed',
    description: 'Network error occurred. Check your connection.',
    // Erro de rede geral.
  },
  [AuthErrorCodes.OPERATION_NOT_ALLOWED]: {
    title: 'Operation Not Allowed',
    description: 'This authentication method is not enabled.',
    // Ocorre se você tentar usar um método de login (email/senha, Google, etc.)
    // que não está habilitado nas configurações do Firebase Auth.
  },
  [AuthErrorCodes.POPUP_BLOCKED]: {
    title: 'Popup Blocked',
    description: 'The popup was blocked by the browser.',
    // Ocorre em fluxos de popup se o navegador bloquear a janela.
  },
  [AuthErrorCodes.QUOTA_EXCEEDED]: {
    title: 'Quota Exceeded',
    description: 'Quota for this operation has been exceeded.',
    // Ocorre se você exceder os limites de uso gratuitos ou pagos do Firebase Auth.
  },
  [AuthErrorCodes.USER_MISMATCH]: {
    title: 'User Mismatch',
    description: 'The provided user does not match the current user.',
    // Ocorre ao tentar reautenticar ou atualizar um usuário
    // com credenciais que pertencem a um usuário diferente do logado atualmente.
  },
  [AuthErrorCodes.WEAK_PASSWORD]: {
    title: 'Weak Password',
    description: 'The password is too weak.',
    // Ocorre ao criar ou atualizar uma senha que não atende aos requisitos de força do Firebase.
  },
  [AuthErrorCodes.UNVERIFIED_EMAIL]: {
    title: 'Unverified Email',
    description: 'Email is not verified.',
    // Ocorre ao tentar realizar certas operações que exigem um e-mail verificado.
  },

  // Códigos de erro que você pode querer adicionar se encontrar em outros fluxos:
  // [AuthErrorCodes.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]: {
  //   title: 'Account Exists',
  //   description: 'An account with this email already exists using a different sign-in method.',
  //   // Ocorre ao tentar logar com um provedor (ex: Google) quando já existe uma conta com o mesmo e-mail
  //   // mas logada com outro método (ex: email/senha). Você precisaria lidar com a vinculação.
  // },
  // [AuthErrorCodes.PROVIDER_ALREADY_LINKED]: {
  //   title: 'Provider Already Linked',
  //   description: 'This provider is already linked to your account.',
  //   // Ocorre ao tentar vincular um provedor que já está vinculado à conta ATUALMENTE logada.
  // },
  // [AuthErrorCodes.NO_SUCH_PROVIDER]: {
  //   title: 'No Such Provider Linked',
  //   description: 'This provider is not linked to your account.',
  //   // Ocorre ao tentar desvincular um provedor que NÃO está vinculado à conta ATUALMENTE logada.
  // },
  // [AuthErrorCodes.USER_TOKEN_EXPIRED]: {
  //   title: 'Session Expired',
  //   description: 'Your session has expired. Please log in again.',
  //   // Similar a CREDENTIAL_TOO_OLD_LOGIN_AGAIN, mas geralmente indica que o token de ID expirou.
  // },
  // [AuthErrorCodes.WEB_STORAGE_UNSUPPORTED]: {
  //   title: 'Browser Storage Unsupported',
  //   description: 'Your browser does not support the necessary storage features for this operation.',
  //   // Ocorre se o armazenamento local/de sessão do navegador estiver desabilitado ou indisponível.
  // },
}
