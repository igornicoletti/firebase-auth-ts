import { ErrorBoundary } from '@/components/error'

export const ErrorBoundaryPage = () => {
  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-3xl'>
        <ErrorBoundary />
      </div>
    </div>
  )
}
