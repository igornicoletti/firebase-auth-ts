import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui'

interface AuthLayoutProps {
  title: string
  subtitle: string
  ask: string
  source: string
  linkTo: string
  children: ReactNode
}

export const AuthLayout = ({ title, subtitle, ask, source, linkTo, children }: AuthLayoutProps) => (
  <div className='relative flex min-h-svh flex-col'>
    <div className='flex flex-1 flex-col items-center justify-center py-12'>
      <div className='w-full max-w-md grid gap-6 px-6'>
        <div className='grid gap-2 text-center'>
          <h2 className='text-xl font-bold'>{title}</h2>
          <p className='text-sm text-muted-foreground'>{subtitle}</p>
        </div>
        {children}
        <p className='text-sm text-muted-foreground text-center'>
          {ask}{' '}
          <Button asChild variant='link' className='p-0 font-semibold'>
            <Link to={linkTo}>{source}</Link>
          </Button>
        </p>
      </div>
    </div>
  </div>
)
