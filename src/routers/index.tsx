import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { ErrorPage } from '@/pages/errors/ErrorPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { AppLayout } from '@/pages/layouts/AppLayout'
import { protectedRoutes } from '@/routers/protected.routes'
import { publicRoutes } from '@/routers/public.routes'

const allRoutes: RouteObject[] = [
  ...publicRoutes,
  ...protectedRoutes,
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
