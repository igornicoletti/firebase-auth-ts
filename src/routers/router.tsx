// src/routers/router.tsx

import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { LoadingSpinner } from '@/components/common'
import { LazyRootLayout } from '@/configs'
import { AppLayout, AuthLayout } from '@/layouts'
import { appLoader } from '@/loaders'
import { CallbackRoute, ErrorBoundaryRoute, NotFoundRoute, ProtectedRoute, PublicRoute, RedirectRoute } from '@/routers/components'
import { protectedRoutes, publicRoutes } from '@/routers/constants'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner message='Please wait while we prepare everything' />}>
        <LazyRootLayout />
      </Suspense>
    ),
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
          element: <AuthLayout />,
          children: publicRoutes
        }]
      },
      {
        element: <ProtectedRoute requireEmailVerified={true} />,
        errorElement: <ErrorBoundaryRoute />,
        children: [{
          loader: appLoader,
          element: <AppLayout />,
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
