import { SpinnerGapIcon } from '@phosphor-icons/react'

type LoadingSpinnerProps = {
  message?: string
}

export const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className='flex h-full min-h-screen flex-col items-center justify-center bg-background'>
      <div className='flex flex-col items-center gap-4'>
        <SpinnerGapIcon className='animate-spin text-muted-foreground' size={32} />
        {message && (
          <p className='text-sm text-muted-foreground text-center'>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
