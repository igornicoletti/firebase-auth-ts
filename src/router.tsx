import { ProtectedRoute } from '@/components/route/ProtectedRoute'
import { AuthLayout } from '@/pages/auth/AuthLayout'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage'
import { DashboardPage } from '@/pages/dashboard/DashboardPage'
import { ErrorBoundaryPage } from '@/pages/errorBoundary/ErrorBoundaryPage'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export async function errorLoader() {
  throw new Response('An unexpected error occurred', { status: 500, statusText: 'Internal Server Error' })
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/dashboard' replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
    ],
  },
  {
    loader: errorLoader,
    path: '/simulate-error',
    element: <p>Error simulation</p>,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '*',
    element: <ErrorBoundaryPage />,
  },
])
