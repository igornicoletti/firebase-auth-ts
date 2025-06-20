import { Terminal } from '@phosphor-icons/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

import { NotFoundRoute } from '@/routers/components'
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert'

export const ErrorBoundaryRoute = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFoundRoute />
  }

  const stack =
    import.meta.env.DEV && error instanceof Error
      ? error.stack
      : undefined

  return (
    <div className='flex flex-1 items-center py-12'>
      <div className='w-full max-w-7xl mx-auto grid gap-6 px-6'>
        <Alert variant='destructive'>
          <Terminal />
          {stack ? (
            <AlertDescription>
              <pre>
                <code>{stack}</code>
              </pre>
            </AlertDescription>
          ) : (
            <AlertTitle>Unknown Error</AlertTitle>
          )}
        </Alert>
      </div>
    </div>
  )
}
