import React from 'react'
import { type RouteObject } from 'react-router-dom'

import { ProtectedLayout } from '@/pages/layouts'
import { PATHS } from '@/routers/paths'

const DashboardPage = React.lazy(() =>
  import('@/pages/app/DashboardPage').then((m) => ({ default: m.DashboardPage }))
)

const ProfilePage = React.lazy(() =>
  import('@/pages/app/ProfilePage').then((m) => ({ default: m.ProfilePage }))
)

const SettingsPage = React.lazy(() =>
  import('@/pages/app/SettingsPage').then((m) => ({ default: m.SettingsPage }))
)

export const getProtectedRoutes = (): RouteObject[] => [
  {
    element: <ProtectedLayout />,
    children: [
      { path: PATHS.app.dashboard.split('/').pop(), element: <DashboardPage /> },
      { path: PATHS.app.profile.split('/').pop(), element: <ProfilePage /> },
      { path: PATHS.app.settings.split('/').pop(), element: <SettingsPage /> },
    ],
  },
]
