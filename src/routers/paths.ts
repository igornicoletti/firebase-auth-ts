export const PATHS = {
  public: {
    home: '/',
    callback: '/callback',
  },
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  app: {
    dashboard: '/app/dashboard',
    profile: '/app/profile',
    settings: '/app/settings',
  },
} as const
