import { SpinnerGap } from '@phosphor-icons/react'

export const LoadingSpinner = () => {
  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <SpinnerGap className='size-6 animate-spin' />
    </div>
  )
}
