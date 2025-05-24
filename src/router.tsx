import { ProtectedRoute, PublicRoute } from '@/components/route'
import {
  AuthLayout,
  CallbackPage,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from '@/pages/auth'
import { DashboardPage } from '@/pages/dashboard'
import { ErrorBoundaryPage } from '@/pages/errorBoundary'
import { NotFoundPage } from '@/pages/notFound'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/callback',
            element: <CallbackPage />,
            errorElement: <ErrorBoundaryPage />
          },
          {
            path: '/login',
            element: <LoginPage />,
            errorElement: <ErrorBoundaryPage />
          },
          {
            path: '/register',
            element: <RegisterPage />,
            errorElement: <ErrorBoundaryPage />
          },
          {
            path: '/forgot-password',
            element: <ForgotPasswordPage />,
            errorElement: <ErrorBoundaryPage />
          },
          {
            path: '/reset-password',
            element: <ResetPasswordPage />,
            errorElement: <ErrorBoundaryPage />
          },
        ],
      },
    ],
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <ProtectedRoute requireAuth requireVerification />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
        errorElement: <ErrorBoundaryPage />
      },
    ],
    errorElement: <ErrorBoundaryPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
