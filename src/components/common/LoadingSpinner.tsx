// src/components/common/LoadingSpinner.tsx

import { SpinnerGapIcon } from '@phosphor-icons/react'

export const LoadingSpinner = ({ message }: { message?: string }) => {
  return (
    <div className='flex min-h-svh'>
      <div className='flex flex-1 items-center py-12'>
        <div className='w-full max-w-md mx-auto grid gap-6 px-6'>
          <SpinnerGapIcon className='animate-spin size-6 mx-auto text-muted-foreground' />
          {message && (
            <p className='text-sm text-muted-foreground text-center'>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
