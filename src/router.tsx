import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  AuthForgotForm,
  AuthLoginForm,
  AuthRegisterForm,
  AuthResetForm,
} from '@/lib/auth/components/form'
import { useAuth } from '@/lib/auth/contexts'
import { AuthLayout } from '@/lib/auth/layouts'
import { authLoader } from '@/lib/auth/loaders'
import {
  Callback,
  ErrorBoundary,
  Loading,
  NotFound,
  Protected,
  Public
} from '@/lib/routes'

import { DashboardPage } from '@/pages/dashboard'

const RootRedirect = () => {
  const { user, loading } = useAuth()

  if (loading) return <Loading />

  return user?.emailVerified
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />
}

const publicRoutes = [
  { path: '/login', element: <AuthLoginForm />, loader: authLoader },
  { path: '/register', element: <AuthRegisterForm />, loader: authLoader },
  { path: '/forgot-password', element: <AuthForgotForm />, loader: authLoader },
  { path: '/reset-password', element: <AuthResetForm />, loader: authLoader },
]

const privateRoutes = [
  { path: '/dashboard', element: <DashboardPage /> },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/callback',
    element: <Callback />,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <Public />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: publicRoutes,
      }
    ],
  },
  {
    element: <Protected requireEmailVerified={true} />,
    errorElement: <ErrorBoundary />,
    children: privateRoutes,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
