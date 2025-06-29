export const PATHS = {
  public: {
    redirect: '/',
    callback: '/callback',
  },
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  app: {
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings',
  },
} as const

export type Paths = typeof PATHS
export type PathCategory = keyof Paths
export type PathValue = Paths[PathCategory][keyof Paths[PathCategory]]
