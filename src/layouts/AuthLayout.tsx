// src/layouts/AuthLayout.tsx

import { Link, Outlet, useMatches } from 'react-router-dom'

import { Button } from '@/components/ui'

import { AuthDataCodes, type AuthDataType } from '@/constants/auth'
import type { AuthLoaderData } from '@/shared/types'

export const AuthLayout = () => {
  const currentMatch = [...useMatches()]
    .find((match) => match.data && match.id && Object.values(AuthDataCodes)
      .includes(match.id as AuthDataType))

  if (!currentMatch || !currentMatch.data) return null

  const { subtitle, ask, title, linkTo, source } = currentMatch.data as AuthLoaderData

  return (
    <div className='flex flex-1 flex-col items-center justify-center py-12'>
      <div className='w-full max-w-md grid gap-6 px-6'>
        <div className='grid gap-2 text-center'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <p className='text-sm text-muted-foreground'>{subtitle}</p>
        </div>
        <Outlet />
        <p className='text-sm text-muted-foreground text-center'>
          {ask}{' '}
          <Button
            asChild
            variant='link'
            className='p-0 font-semibold'>
            <Link to={linkTo}>{source}</Link>
          </Button>
        </p>
      </div>
    </div>
  )
}
