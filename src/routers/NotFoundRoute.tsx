// src/routes/NotFoundRoute.tsx

import { useNavigate } from 'react-router-dom'

import { HouseSimple } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'

export const NotFoundRoute = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen grid place-items-center p-6'>
      <div className='w-full max-w-sm'>
        <div className='grid gap-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='font-bold text-xl'>404 | Page not found</h2>
            <p className='text-sm text-muted-foreground text-balance'>
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
    </div>
  )
}
