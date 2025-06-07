// src/routes/not-found.route.ts

import { useLocation, useNavigate } from 'react-router-dom'

import { ArrowLeft, HouseSimple } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'

export const NotFound = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isFirstPage = location.key === 'default'

  const handleBack = () => {
    if (isFirstPage) {
      navigate('/')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-sm'>
        <div className='grid gap-6'>
          <div className='grid gap-2 text-center'>
            <h2 className='font-bold text-xl'>404 | Page not found</h2>
            <p className='text-sm text-muted-foreground text-balance'>
              The requested page could not be found.
            </p>
          </div>
          <Button onClick={handleBack} variant='secondary'>
            {isFirstPage ? <HouseSimple /> : <ArrowLeft />}
            {isFirstPage ? 'Go home' : 'Go back'}
            <ButtonHighlight />
          </Button>
        </div>
      </div>
    </div>
  )
}
