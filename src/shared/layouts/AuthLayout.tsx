// src/shared/layouts/AuthLayout.tsx

import { Link, Outlet, useMatches } from 'react-router-dom'

import { Button } from '@/shadcn/ui/button'

import { AuthDataCodes } from '@/shared/constants'
import type { AuthLoaderData } from '@/shared/loaders'

type AuthDataCodeValue = typeof AuthDataCodes[keyof typeof AuthDataCodes]

const AuthLayout = () => {
  const currentMatch = [...useMatches()]
    .find((match) => match.data && match.id && Object.values(AuthDataCodes)
      .includes(match.id as AuthDataCodeValue))

  if (!currentMatch || !currentMatch.data) return null

  const { formSubtitle, ask, formTitle, linkTo, source } = currentMatch.data as AuthLoaderData

  return (
    <div className='flex flex-1 items-center py-12'>
      <div className='w-full max-w-md mx-auto grid gap-6 px-6'>
        <div className='grid gap-2 text-center'>
          <h2 className='text-xl font-bold'>{formTitle}</h2>
          <p className='text-sm text-muted-foreground'>{formSubtitle}</p>
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

export default AuthLayout
