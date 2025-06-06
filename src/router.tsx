import { createBrowserRouter, Navigate } from 'react-router-dom'

import { AppLayout } from '@/app/layouts'
import {
  AuthForgotForm,
  AuthLoginForm,
  AuthRegisterForm,
  AuthResetForm,
} from '@/auth/components/form'
import { useAuth } from '@/auth/contexts'
import { AuthLayout } from '@/auth/layouts'
import { authLoader } from '@/auth/loaders'
import { DashboardLayout } from '@/dashboard/layouts'
import {
  Callback,
  ErrorBoundary,
  Loading,
  NotFound,
  Protected,
  Public
} from '@/routes'


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
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    handle: { crumb: 'Dashboard' }
  },
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
    children: [
      {
        element: <AppLayout />,
        children: privateRoutes,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
