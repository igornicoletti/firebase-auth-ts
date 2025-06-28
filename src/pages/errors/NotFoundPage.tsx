import { useNavigate } from 'react-router-dom'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { ArrowLeftIcon } from '@phosphor-icons/react'

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mx-auto grid gap-6 text-center">
        <div>
          <h1 className="text-xl font-bold tracking-tight">404 - Page Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The page you are looking for does not exist or has been removed.
          </p>
        </div>
        <Button onClick={() => navigate('/')} variant="secondary">
          <ArrowLeftIcon className="size-4" />
          Go back
          <ButtonHighlight />
        </Button>
      </div>
    </div>
  )
}
