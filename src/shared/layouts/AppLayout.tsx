// src/shared/layouts/AppLayout.tsx

import { Outlet } from 'react-router-dom'

import { useAuth } from '@/features'

const AppLayout = () => {
  const { user } = useAuth()

  return (
    <div className='flex flex-1 items-start py-12'>
      <div className='w-full grid gap-6 px-6'>
        <div className='grid gap-2'>
          <h2 className='text-xl font-bold'>Dashboard</h2>
          <p className='text-sm text-muted-foreground'>
            Hello, {user?.displayName}.
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
