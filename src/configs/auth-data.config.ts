import { PATHS, type PathValue } from '@/routers/paths'

interface AuthData {
  title: string
  subtitle: string
  ask: string
  source: string
  linkTo: PathValue
}

type AuthDataSettings = {
  login: AuthData
  register: AuthData
  forgotPassword: AuthData
  resetPassword: AuthData
}

export const AUTH_DATA_SETTINGS: AuthDataSettings = {
  login: {
    title: 'Sign in to your account',
    subtitle: 'Welcome back! Please sign in to continue.',
    ask: 'Don’t have an account?',
    source: 'Sign up',
    linkTo: PATHS.auth.register as PathValue
  },
  register: {
    title: 'Create your account',
    subtitle: 'Welcome! Please fill in the details to get started.',
    ask: 'Already have an account?',
    source: 'Sign in',
    linkTo: PATHS.auth.login as PathValue
  },
  forgotPassword: {
    title: 'Forgot your password?',
    subtitle: 'We’ll send you a link to reset it.',
    ask: 'Back to',
    source: 'Sign in',
    linkTo: PATHS.auth.login as PathValue
  },
  resetPassword: {
    title: 'Reset your password',
    subtitle: 'Set a new password for your account.',
    ask: 'Back to',
    source: 'Sign in',
    linkTo: PATHS.auth.login as PathValue
  },
}
