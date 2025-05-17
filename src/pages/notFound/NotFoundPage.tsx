import { NotFound } from '@/components/404'

export const NotFoundPage = () => {
  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-7xl'>
        <NotFound />
      </div>
    </div>
  )
}
