import { GradientHighlight } from '@/components/custom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { HouseSimple, LineVertical } from '@phosphor-icons/react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'

type NormalizedError = {
  status: string
  title: string
  description: string
}

const normalizeError = (error: unknown): NormalizedError => {
  if (isRouteErrorResponse(error)) {
    const status = error.status === 404 ? '404' : `${error.status}`
    const title = error.statusText || 'Something went wrong'

    let description = 'No additional details were provided.'

    if (typeof error.data === 'string') {
      description = error.data
    } else if (typeof error.data === 'object') {
      try {
        description = JSON.stringify(error.data, null, 2)
      } catch {
        description = 'An error occurred, but the error details could not be parsed.'
      }
    }

    return { status, title, description }
  }

  if (error instanceof Error) {
    return {
      status: 'Error',
      title: 'Unexpected error',
      description: error.message
    }
  }

  return {
    status: 'Unknown',
    title: 'Unknown error',
    description: 'An unexpected error occurred.'
  }
}

export const ErrorBoundary = () => {
  const error = useRouteError()
  console.error('Route Error:', error)

  const { status, title, description } = normalizeError(error)

  return (
    <Alert className='grid gap-y-2 bg-transparent'>
      <AlertTitle className='flex items-center justify-center text-center gap-2'>
        {status}
        <LineVertical weight='thin' className='size-6 text-muted-foreground' />
        {title}
      </AlertTitle>
      <AlertDescription className='flex flex-col items-center justify-center text-center gap-6 text-muted-foreground'>
        {description}
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
