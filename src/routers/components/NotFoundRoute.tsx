// src/routes/components/NotFoundRoute.tsx

import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const NotFoundRoute = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-1 items-center py-12'>
      <div className='w-full max-w-md mx-auto grid gap-6 px-6'>
        <div className="flex items-center justify-center gap-4">
          <h2 className='text-xl font-bold'>404</h2>
          <Separator orientation='vertical' className='data-[orientation=vertical]:h-12' />
          <p className='text-sm text-muted-foreground'>This page could not be found.</p>
        </div>
        <Button onClick={() => navigate('/')} variant='secondary'>
          <ArrowLeftIcon />
          Go back
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
