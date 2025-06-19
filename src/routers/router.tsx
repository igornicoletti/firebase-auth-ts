// src/routers/router.tsx

import { Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { CallbackRoute, ErrorBoundaryRoute, NotFoundRoute, ProtectedRoute, PublicRoute } from '@/routers/components'
import { protectedRoutes, publicRoutes } from '@/routers/constants'

import { LoadingSpinner } from '@/shared/components'
import { useAuth } from '@/shared/hooks'
import { LazyAppLayout, LazyAuthLayout, RootLayout } from '@/shared/layouts'

export const RootRedirect = () => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />

  return user?.emailVerified
    ? <Navigate to='/dashboard' replace />
    : <Navigate to='/login' replace />
}

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
            <Suspense fallback={<LoadingSpinner message='Please wait while we prepare everything' />}>
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
            <Suspense fallback={<LoadingSpinner message='Please wait while we prepare everything' />}>
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
