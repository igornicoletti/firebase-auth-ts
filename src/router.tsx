// src/routes/router.tsx

import { createBrowserRouter, Navigate } from 'react-router-dom'

import { LoadingSpinner } from '@/components/custom'
import { AuthCallbackRoute, AuthProtectedRoute } from '@/lib/auth/components'
import { AuthForgotForm, AuthLoginForm, AuthRegisterForm, AuthResetForm } from '@/lib/auth/components/form'
import { useAuth } from '@/lib/auth/contexts'
import { AuthLayout } from '@/lib/auth/layouts'
import { authLoader } from '@/lib/auth/loaders'

import { DashboardPage } from '@/pages/dashboard'
import { ErrorBoundaryPage } from '@/pages/errorBoundary'
import { NotFoundPage } from '@/pages/notFound'

const InitialRedirect = () => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return user
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login" replace />
}

const publicRoutes = [
  { loader: authLoader, path: '/login', element: <AuthLoginForm /> },
  { loader: authLoader, path: '/register', element: <AuthRegisterForm /> },
  { loader: authLoader, path: '/forgot-password', element: <AuthForgotForm /> },
  { loader: authLoader, path: '/reset-password', element: <AuthResetForm /> },
]

const protectedRoutes = [
  { path: '/dashboard', element: <DashboardPage />, },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <InitialRedirect />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '/callback',
    element: <AuthCallbackRoute />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [...publicRoutes],
  },
  {
    element: <AuthProtectedRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [...protectedRoutes],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
