import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Terminal } from '@phosphor-icons/react'

export const NotFound = () => {
  return (
    <Alert>
      <Terminal />
      <AlertTitle>404 | Page not found</AlertTitle>
      <AlertDescription>The route you tried to access doesn’t exist or may have been removed.</AlertDescription>
    </Alert>
  )
}
