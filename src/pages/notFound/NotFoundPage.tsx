import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from '@phosphor-icons/react'

export const NotFoundPage = () => {
  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-7xl'>
        <Alert>
          <Terminal />
          <AlertTitle>404 | Page not found</AlertTitle>
          <AlertDescription>The route you tried to access doesn’t exist or may have been removed.</AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
