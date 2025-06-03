// src/lib/routes/error-boundary.route.ts

import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { Terminal } from '@phosphor-icons/react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const ErrorBoundary = () => {
  const error = useRouteError()

  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404
      ? 'The requested page could not be found.'
      : error.statusText || details

  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-7xl'>
        <Alert>
          <Terminal />
          <AlertTitle>{message} {details}</AlertTitle>
          <AlertDescription>
            {stack && (
              <pre>
                <code>{stack}</code>
              </pre>
            )}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
