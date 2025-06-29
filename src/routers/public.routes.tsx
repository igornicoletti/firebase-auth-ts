import React from 'react'
import { type RouteObject } from 'react-router-dom'

import { AUTH_DATA_SETTINGS } from '@/configs/auth-data.config'
import { CallbackPage } from '@/pages/CallbackPage'
import { RedirectPage } from '@/pages/RedirectPage'
import { AuthLayout, PublicLayout } from '@/pages/layouts'
import { PATHS } from '@/routers/paths'

const LoginPage = React.lazy(() =>
  import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage }))
)

const RegisterPage = React.lazy(() =>
  import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage }))
)

const ForgotPasswordPage = React.lazy(() =>
  import('@/pages/auth/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage }))
)

const ResetPasswordPage = React.lazy(() =>
  import('@/pages/auth/ResetPasswordPage').then((m) => ({ default: m.ResetPasswordPage }))
)

export const getPublicRoutes = (): RouteObject[] => [
  { path: PATHS.public.redirect, element: <RedirectPage /> },
  { path: PATHS.public.callback, element: <CallbackPage /> },
  {
    element: <PublicLayout />,
    children: [
      {
        path: PATHS.auth.login.split('/').pop(),
        element: (
          <AuthLayout {...AUTH_DATA_SETTINGS.login}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: PATHS.auth.register.split('/').pop(),
        element: (
          <AuthLayout {...AUTH_DATA_SETTINGS.register}>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: PATHS.auth.forgotPassword.split('/').pop(),
        element: (
          <AuthLayout {...AUTH_DATA_SETTINGS.forgotPassword}>
            <ForgotPasswordPage />
          </AuthLayout>
        ),
      },
      {
        path: PATHS.auth.resetPassword.split('/').pop(),
        element: (
          <AuthLayout {...AUTH_DATA_SETTINGS.resetPassword}>
            <ResetPasswordPage />
          </AuthLayout>
        ),
      },
    ],
  },
]
