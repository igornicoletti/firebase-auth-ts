import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { ErrorPage, NotFoundPage } from '@/pages/errors'

import { AppLayout } from '@/pages/layouts'
import { getProtectedRoutes } from '@/routers/protected.routes'
import { getPublicRoutes } from '@/routers/public.routes'

const allRoutes: RouteObject[] = [
  ...getPublicRoutes(),
  ...getProtectedRoutes(),
]

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...allRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
