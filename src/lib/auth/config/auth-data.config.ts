// src/lib/auth/config/auth-data.config.ts

// Importa os códigos que identificam as páginas de autenticação e seu tipo correspondente
// da sua fonte central de constantes.
import { AuthDataCodes, type AuthDataCode } from '@/lib/auth/constants'

/**
 * Define a estrutura dos dados de layout para cada página de autenticação.
 * Estes dados são carregados por um loader e usados para popular o AuthLayout.
 */
export type AuthData = {
  title: string // O título principal da página (ex: 'Sign in to your account').
  description: string // Uma breve descrição ou subtítulo para a página.
  ask: string // O texto da pergunta antes do link (ex: 'Don’t have an account?').
  source: string // O texto visível do link (ex: 'Register').
  pathname: string // O caminho (URL) para o qual o link deve apontar (ex: '/register').
}

/**
 * Mapa que associa os códigos das páginas de autenticação (AuthDataCode) a objetos
 * contendo os dados de layout (AuthData) para essa página.
 * Este mapa é usado pelo authLoader para fornecer conteúdo dinâmico ao AuthLayout.
 */
export const authDataMap: Record<AuthDataCode, AuthData> = {
  // Associa cada código de página AuthDataCodes.PÁGINA aos seus dados de layout correspondentes.

  // Dados para a página de Login
  [AuthDataCodes.LOGIN]: {
    title: 'Sign in to your account',
    description: 'Welcome back! Please sign in to continue',
    ask: 'Don’t have an account?', // Pergunta para usuários
    source: 'Register', // Texto do link que leva a página definida
    pathname: '/register', // Caminho para a página definida
  },

  // Dados para a página de Registro
  [AuthDataCodes.REGISTER]: {
    title: 'Create your account',
    description: 'Please fill in the details to get started',
    ask: 'Already have an account?',
    source: 'Login',
    pathname: '/login',
  },

  // Dados para a página de Esqueceu a Senha
  [AuthDataCodes.FORGOT_PASSWORD]: {
    title: 'Forgot your password?',
    description: 'We’ll send you a link to reset it.',
    ask: 'Back to',
    source: 'Login',
    pathname: '/login',
  },

  // Dados para a página de Redefinição de Senha
  [AuthDataCodes.RESET_PASSWORD]: {
    title: 'Reset your password',
    description: 'Set a new password for your account.',
    ask: 'Back to',
    source: 'Login',
    pathname: '/login',
  },
}
