// src/lib/auth/layouts/auth.layout.tsx

import { Link, Outlet, useMatches, useNavigation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import type { AuthData } from '@/lib/auth/config'
import { Loading } from '@/lib/routes'

export const AuthLayout = () => {
  const navigation = useNavigation()
  const matches = [...useMatches()].find((match) => match.data)

  if (!matches || !matches.data) return null

  const { title, description, ask, source, pathname } = matches.data as AuthData

  return navigation.state === 'loading' ? (
    <Loading />
  ) : (
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
              <Link to={pathname}>{source}</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
