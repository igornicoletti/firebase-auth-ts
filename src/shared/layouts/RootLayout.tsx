// src/shared/layouts/RootLayout.tsx

import { Outlet } from 'react-router-dom'

import { ProgressBar } from '@/shared/components'

export const RootLayout = () => (
  <div className="relative flex min-h-svh flex-col">
    <ProgressBar />
    <Outlet />
  </div>
)
