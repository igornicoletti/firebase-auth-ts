// src/shared/layouts/RootLayout.tsx

import { Outlet } from 'react-router-dom'

import { ProgressBar } from '@/shared/components'

const RootLayout = () => {
  return (
    <div className='flex min-h-svh'>
      <ProgressBar />
      <Outlet />
    </div>
  )
}

export default RootLayout
