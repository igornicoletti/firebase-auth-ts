import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components/feedback'
import { ProgressProvider } from '@/contexts/ProgressProvider'

export const AppLayout = () => (
  <ProgressProvider>
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
    </Suspense>
  </ProgressProvider>
)
