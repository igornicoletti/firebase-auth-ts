//

export interface AuthPageData {
  subtitle: string
  ask: string
  title: string
  linkTo: string
  source: string
}

export interface AuthDataMap {
  login: AuthPageData
  register: AuthPageData
  'forgot-password': AuthPageData
  'reset-password': AuthPageData
}

export type AuthDataCode = keyof AuthDataMap

export type AuthLoaderData = AuthPageData
