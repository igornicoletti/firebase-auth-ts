// src/routes/NotFoundRoute.tsx

import { useNavigate } from 'react-router-dom'

import { HouseSimple } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'

export const NotFoundRoute = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-1 items-center py-12'>
      <div className='w-full max-w-7xl mx-auto grid gap-6 px-6'>
        <div className='grid gap-2 text-center'>
          <h2 className='text-xl font-bold'>404 | Page not found</h2>
          <p className='text-sm text-muted-foreground'>
            The requested page could not be found.
          </p>
        </div>
        <Button onClick={() => navigate('/')} variant='secondary'>
          <HouseSimple />
          Go home
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
