// src/lib/auth/layouts/auth-layout.tsx

import { Link, Outlet, useMatches } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import type { AuthData } from '@/lib/auth/config'

export const AuthLayout = () => {
  const match = [...useMatches()].find((m) => m.data)
  if (!match) return null

  const { title, description, ask, source, pathname } = match.data as AuthData

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-sm'>
        <div className='grid gap-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='font-bold text-xl'>{title}</h2>
            <p className='text-sm text-muted-foreground'>{description}</p>
          </div>
          <Outlet />
          <p className='text-sm text-muted-foreground text-center'>
            {ask}{' '}
            <Button asChild variant='link' className='p-0 font-semibold'>
              <Link to={pathname}>
                {source}
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
