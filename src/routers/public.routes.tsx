import React from 'react'
import { type RouteObject } from 'react-router-dom'

import { CallbackPage } from '@/pages/CallbackPage'
import { PublicLayout } from '@/pages/layouts/PublicLayout'

const HomePage = React.lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage }))
)
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

export const publicRoutes: RouteObject[] = [
  {
    path: '',
    element: <HomePage />,
  },
  {
    path: 'callback',
    element: <CallbackPage />,
  },
  {
    element: <PublicLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
]
