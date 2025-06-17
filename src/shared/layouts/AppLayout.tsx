// src/shared/layouts/AppLayout.tsx

import { Outlet } from 'react-router-dom'

import { Avatar, AvatarImage } from '@/shadcn/ui/avatar'
import { useAuth } from '@/shared/hooks'

const AppLayout = () => {
  const { user } = useAuth()

  return (
    <div className='flex flex-1 items-start py-12'>
      <div className='w-full grid gap-6 px-6'>
        {user && user.photoURL && (
          <Avatar>
            <AvatarImage src={user.photoURL} alt={user.photoURL} />
          </Avatar>
        )}
        <div className='grid gap-2'>
          <h2 className='text-xl font-bold'>Dashboard</h2>
          <p className='text-sm text-muted-foreground'>
            Hello, {user?.displayName}
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
