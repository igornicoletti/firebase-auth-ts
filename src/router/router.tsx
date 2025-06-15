// src/router/router.tsx

import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
  useAuth,
} from '@/features'
import { AuthLayout } from '@/features/auth/layouts/AuthLayout'
import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoaders'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { CallbackRoute, ErrorBoundaryRoute, NotFoundRoute, ProtectedRoute, PublicRoute } from '@/router'
import { LoadingProgress } from '@/shared/components'
import { authLoader } from '@/shared/loaders'

const RootRedirect = () => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingProgress />

  return user?.emailVerified
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />
}

const publicRoutes = [
  { path: '/login', element: <LoginForm />, loader: authLoader },
  { path: '/register', element: <RegisterForm />, loader: authLoader },
  { path: '/forgot-password', element: <ForgotPasswordForm />, loader: authLoader },
  { path: '/reset-password', element: <ResetPasswordForm />, loader: authLoader },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
    errorElement: <ErrorBoundaryRoute />,
  },
  {
    path: '/callback',
    element: <CallbackRoute />,
    errorElement: <ErrorBoundaryRoute />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        errorElement: <ErrorBoundaryRoute />,
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
    element: <NotFoundRoute />,
  },
])
