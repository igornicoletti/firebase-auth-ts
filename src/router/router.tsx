// src/router/router.tsx

import { useEffect } from 'react'
import { createBrowserRouter, useNavigate } from 'react-router-dom'

import { Loading } from '@/common/components/loading/Loading'
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
  useAuth,
} from '@/features'
import { AuthLayout } from '@/features/auth/layouts/AuthLayout'
import { authLoader } from '@/features/auth/loaders/authLoaders'
import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoaders'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import { NotFoundRoute, ProtectedRoute, PublicRoute } from '@/router'

const RootRedirect = () => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      user
        ? navigate('/dashboard', { replace: true })
        : navigate('/login', { replace: true })
    }
  }, [user, loading, navigate])

  return <Loading />
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
    element: <NotFoundRoute />,
  },
])
