import { ProtectedRoute } from '@/components/route'
import { AuthLayout, ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage } from '@/pages/auth'
import { DashboardPage } from '@/pages/dashboard'
import { ErrorBoundaryPage } from '@/pages/errorBoundary'
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
