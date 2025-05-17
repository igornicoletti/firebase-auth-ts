import { GradientHighlight } from '@/components/custom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { HouseSimple, LineVertical } from '@phosphor-icons/react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.error('Route Error:', error)

  let status = 'Opss!'
  let statusText = 'An unexpected error occurred.'
  let details = 'An unexpected error occurred No additional error details were provided.'

  if (isRouteErrorResponse(error)) {
    status = error.status === 404 ? '404' : `${error.status}`
    statusText = error.statusText || statusText

    if (typeof error.data === 'string') {
      details = error.data
    } else if (typeof error.data === 'object') {
      try {
        details = JSON.stringify(error.data, null, 2)
      } catch {
        details = 'An error occurred, but the data could not be parsed.'
      }
    }
  } else if (error instanceof Error) {
    statusText = error.message
  }

  return (
    <Alert className='grid gap-y-2 bg-transparent'>
      <AlertTitle className='flex items-center justify-center gap-2'>
        {status}
        <LineVertical weight='thin' className='size-6 text-muted-foreground' />
        {details}
      </AlertTitle>
      <AlertDescription>
        <Button asChild variant='secondary' className='w-full'>
          <Link to='/dashboard'>
            <HouseSimple />
            Go to homepage
            <GradientHighlight />
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  )
}
