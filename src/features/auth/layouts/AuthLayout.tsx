// src/features/auth/layouts/AuthLayout.tsx

import { Link, Outlet, useMatches } from 'react-router-dom'

import type { AuthPageData } from '@/features/auth/constants'
import { Button } from '@/shadcn/ui/button'

export const AuthLayout = () => {
  const matches = [...useMatches()].find((match) => match.data)
  if (!matches || !matches.data) return null
  const { formSubtitle, ask, formTitle, linkTo, source } = matches.data as AuthPageData

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-sm'>
        <div className='grid gap-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='font-bold text-xl'>{formTitle}</h2>
            <p className='text-sm text-muted-foreground'>{formSubtitle}</p>
          </div>
          <Outlet />
          <p className='text-sm text-muted-foreground text-center'>
            {ask}{' '}
            <Button asChild variant='link' className='p-0 font-medium'>
              <Link to={linkTo}>{source}</Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}
