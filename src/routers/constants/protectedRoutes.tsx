// src/routers/constants/protectedRoutes.tsx

import { dashboardLoader } from '@/features/dashboard/loaders/dashboardLoaders'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'

export const protectedRoutes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    loader: dashboardLoader
  }
]
