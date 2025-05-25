import { SpinnerGap } from '@phosphor-icons/react'

export const LoadingSpinner = () => {
  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-sm'>
        <SpinnerGap className='size-10 animate-spin text-primary' />
      </div>
    </div>
  )
}
