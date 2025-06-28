import React from 'react'
import { type RouteObject } from 'react-router-dom'

import { ProtectedLayout } from '@/pages/layouts/ProtectedLayout'

const DashboardPage = React.lazy(() =>
  import('@/pages/app/DashboardPage').then((m) => ({ default: m.DashboardPage }))
)
const ProfilePage = React.lazy(() =>
  import('@/pages/app/ProfilePage').then((m) => ({ default: m.ProfilePage }))
)
const SettingsPage = React.lazy(() =>
  import('@/pages/app/SettingsPage').then((m) => ({ default: m.SettingsPage }))
)

export const protectedRoutes: RouteObject[] = [
  {
    path: 'app',
    element: <ProtectedLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]
