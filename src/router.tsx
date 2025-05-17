import { ProtectedRoute } from '@/components/route'
import {
  AuthLayout,
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
    element: <Navigate to='/dashboard' replace />,
    errorElement: <ErrorBoundaryPage />,
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      { path: '/dashboard', element: <DashboardPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
