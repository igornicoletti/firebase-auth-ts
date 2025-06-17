// src/routers/router.tsx

import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import {
  ForgotPasswordForm,
  LoginForm,
  RegisterForm,
  ResetPasswordForm,
} from '@/features'
import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoaders'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import {
  CallbackRoute,
  ErrorBoundaryRoute,
  NotFoundRoute,
  ProtectedRoute,
  PublicRoute
} from '@/routers'
import { LoadingSpinner } from '@/shared/components'
import { AuthDataCodes } from '@/shared/constants'
import { useAuth } from '@/shared/hooks'
import { LazyAppLayout, LazyAuthLayout, RootLayout } from '@/shared/layouts'
import { authLoader } from '@/shared/loaders'

const RootRedirect = () => {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  return user?.emailVerified
    ? <Navigate to='/dashboard' replace />
    : <Navigate to='/login' replace />
}

const protectedRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    loader: dashboardLoader
  },
]

const publicRoutes = [
  {
    id: AuthDataCodes.LOGIN,
    path: `/${AuthDataCodes.LOGIN}`,
    element: <LoginForm />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.REGISTER,
    path: `/${AuthDataCodes.REGISTER}`,
    element: <RegisterForm />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.FORGOT_PASSWORD,
    path: `/${AuthDataCodes.FORGOT_PASSWORD}`,
    element: <ForgotPasswordForm />,
    loader: authLoader
  },
  {
    id: AuthDataCodes.RESET_PASSWORD,
    path: `/${AuthDataCodes.RESET_PASSWORD}`,
    element: <ResetPasswordForm />,
    loader: authLoader
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundaryRoute />,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
        errorElement: <ErrorBoundaryRoute />
      },
      {
        path: '/callback',
        element: <CallbackRoute />,
        errorElement: <ErrorBoundaryRoute />
      },
      {
        element: <ProtectedRoute requireEmailVerified={true} />,
        children: [{
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAppLayout />
            </Suspense>
          ),
          errorElement: <ErrorBoundaryRoute />,
          children: protectedRoutes
        }]
      },
      {
        element: <PublicRoute />,
        children: [{
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAuthLayout />
            </Suspense>
          ),
          errorElement: <ErrorBoundaryRoute />,
          children: publicRoutes
        }]
      },
      {
        path: '*',
        element: <NotFoundRoute />
      }
    ]
  }
])
