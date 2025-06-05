import { useAuth } from '@/lib/auth/contexts'

export const DashboardPage = () => {
  const { user } = useAuth()

  return (
    <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
      {user && (
        <p className='text-lg font-semibold'>
          Welcome, {user.displayName || user.email}!
        </p>
      )}
    </div>
  )
}
