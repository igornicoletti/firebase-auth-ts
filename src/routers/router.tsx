// src/routers/router.tsx

import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { CallbackRoute, ErrorBoundaryRoute, NotFoundRoute, ProtectedRoute, PublicRoute, RedirectRoute } from '@/routers/components'
import { protectedRoutes, publicRoutes } from '@/routers/constants'

import { LoadingSpinner } from '@/shared/components'
import { LazyAppLayout, LazyAuthLayout, LazyRootLayout } from '@/shared/layouts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyRootLayout />,
    children: [
      {
        path: '/',
        element: <RedirectRoute />,
        errorElement: <ErrorBoundaryRoute />
      },
      {
        path: '/callback',
        element: <CallbackRoute />,
        errorElement: <ErrorBoundaryRoute />
      },
      {
        element: <PublicRoute />,
        errorElement: <ErrorBoundaryRoute />,
        children: [{
          element: (
            <Suspense fallback={<LoadingSpinner message='Please wait while we prepare everything' />}>
              <LazyAuthLayout />
            </Suspense>
          ),
          children: publicRoutes
        }]
      },
      {
        element: <ProtectedRoute requireEmailVerified={true} />,
        errorElement: <ErrorBoundaryRoute />,
        children: [{
          element: (
            <Suspense fallback={<LoadingSpinner message='Please wait while we prepare everything' />}>
              <LazyAppLayout />
            </Suspense>
          ),
          children: protectedRoutes
        }]
      },
      {
        path: '*',
        element: <NotFoundRoute />
      }
    ]
  }
])
