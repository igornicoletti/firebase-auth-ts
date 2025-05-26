import { LoadingSpinner } from '@/components/custom'
import { ProtectedRoute } from '@/components/route'
import { useAuth } from '@/contexts/auth'
import { AuthLayout, ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage } from '@/pages/auth'
import { DashboardPage } from '@/pages/dashboard'
import { ErrorBoundaryPage } from '@/pages/errorBoundary'
import { NotFoundPage } from '@/pages/notFound'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const InitialRedirect = () => {
  const { user, isLoading } = useAuth()
  if (isLoading) return <LoadingSpinner />
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <InitialRedirect />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorBoundaryPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
        errorElement: <ErrorBoundaryPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
        errorElement: <ErrorBoundaryPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
        errorElement: <ErrorBoundaryPage />,
      },
    ],
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        errorElement: <ErrorBoundaryPage />,
      },
    ],
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
