import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { ArrowLeftIcon } from '@phosphor-icons/react'

export const ErrorPage = () => {
  const error = useRouteError()
  const navigate = useNavigate()

  let title = 'Oops! Something went wrong'
  let message = 'Sorry, an unexpected error occurred. Please try again later.'

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        title = '404 - Page Not Found'
        message = 'The page you are looking for does not exist or has been moved.'
        break
      case 401:
        title = '401 - Unauthorized'
        message = 'You do not have permission to access this resource.'
        break
      case 403:
        title = '403 - Forbidden'
        message = 'Your credentials do not allow this action.'
        break
      case 500:
        title = '500 - Internal Server Error'
        message = 'Something went wrong on our servers. We are working to fix it.'
        break
      default:
        title = `${error.status} - ${error.statusText || 'Unexpected Error'}`
        message = error.data?.message || 'An error occurred during navigation.'
    }
  } else if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  }

  const stack = import.meta.env.DEV && error instanceof Error ? error.stack : undefined

  console.error('Route Error Details:', error)

  return (
    <div className='flex min-h-svh flex-col items-center justify-center p-6'>
      <div className='w-full max-w-md mx-auto grid gap-6 text-center'>
        <div>
          <h1 className='text-xl font-bold tracking-tight'>{title}</h1>
          <p className='text-muted-foreground mt-2'>{message}</p>
          {stack && (
            <pre className='mt-4 overflow-auto rounded-md bg-muted p-4 text-xs text-muted-foreground'>
              <code>{stack}</code>
            </pre>
          )}
        </div>
        <Button onClick={() => navigate('/')} variant='secondary'>
          <ArrowLeftIcon className='size-4' />
          Go back
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
