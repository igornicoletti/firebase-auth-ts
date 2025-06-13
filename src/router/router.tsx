// src/router/router.tsx

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Loading } from '@/common/components/loading/Loading'
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
  useAuth,
} from '@/features'
import { AuthLayout } from '@/features/auth/layouts/AuthLayout'
import { authLoader } from '@/features/auth/loaders/authLoader'
import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoaders'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { CallbackRoute, NotFoundRoute, ProtectedRoute, PublicRoute } from '@/router'

const RootRedirect = () => {
  const { user, loading } = useAuth()

  if (loading) return <Loading />

  return user?.emailVerified
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />
}

const publicRoutes = [
  { path: '/login', element: <LoginForm />, loader: authLoader },
  { path: '/register', element: <RegisterForm />, loader: authLoader },
  { path: '/forgot-password', element: <ForgotPasswordForm />, loader: authLoader },
  { path: '/reset-password/:oobCode', element: <ResetPasswordForm />, loader: authLoader },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
  },
  {
    path: '/callback',
    element: <CallbackRoute />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: publicRoutes,
      },
    ],
  },
  {
    element: <ProtectedRoute requireEmailVerified={true} />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        loader: dashboardLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundRoute />, // Rota para páginas não encontradas
  },
])
