// src/routers/constants/protectedRoutes.tsx

import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    handle: {
      crumb: 'Dashboard'
    },
  }
]
