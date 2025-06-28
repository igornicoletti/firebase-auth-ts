import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { LoadingSpinner } from '@/components/feedback'
import { Button } from '@/components/ui'
import { ProgressProvider } from '@/contexts/ProgressProvider'
import { useTheme } from '@/contexts/ThemeProvider'

export const AppLayout = () => {
  const { setTheme, theme } = useTheme()

  return (
    <ProgressProvider>
      <div className='flex min-h-svh flex-col items-center justify-center p-6'>
        <main className='flex-1 w-full max-w-md mx-auto'>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
        <div>
          <Button onClick={() => theme === 'dark' ? setTheme('light') : setTheme('dark')} variant='secondary'>Toggle Theme</Button>
        </div>
      </div>
    </ProgressProvider>
  )
}
