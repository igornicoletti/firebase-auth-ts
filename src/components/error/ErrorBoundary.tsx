import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from '@phosphor-icons/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

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
  const { status, title, description } = normalizeError(error)

  return (
    <Alert>
      <Terminal />
      <AlertTitle>{status} | {title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
