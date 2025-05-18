import { ProtectedRoute, PublicRoute } from '@/components/route'
import {
  AuthLayout,
  ForgotPasswordPage,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from '@/pages/auth'
import { DashboardLayout, DashboardPage, VerifyEmailPage } from '@/pages/dashboard'
import { ErrorBoundaryPage } from '@/pages/errorBoundary'
import { NotFoundPage } from '@/pages/notFound'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/dashboard' replace />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <PublicRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/reset-password', element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/verify-email', element: <VerifyEmailPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
