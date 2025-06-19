// src/shared/components/LoadingSpinner.tsx

import { SpinnerGap } from '@phosphor-icons/react'

export const LoadingSpinner = ({ message }: { message?: string }) => {
  return (
    <div className='flex flex-1 items-center py-12'>
      <div className='w-full max-w-md mx-auto grid gap-6 px-6'>
        <SpinnerGap className='animate-spin size-6 mx-auto' />
        {message && (
          <p className='text-sm text-muted-foreground text-center'>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
