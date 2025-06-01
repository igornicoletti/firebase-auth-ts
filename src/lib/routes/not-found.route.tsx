// src/lib/routes/not-found.route.ts

import { Button, ButtonHighlight } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-sm'>
        <div className='grid gap-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='font-bold text-xl'>404 | Page not found</h2>
            <p className='text-sm text-muted-foreground text-balance'>The requested page could not be found.</p>
          </div>
          <Button onClick={() => window.history.length > 2 ? navigate(-1) : navigate('/')} variant='secondary'>
            <ArrowLeft />
            Go to back
            <ButtonHighlight />
          </Button>
        </div>
      </div>
    </div>
  )
}
