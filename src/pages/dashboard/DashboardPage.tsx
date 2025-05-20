import { ThemeToggle } from '@/components/theme'
import { useAuth } from '@/contexts/auth'

export const DashboardPage = () => {
  const { currentUser } = useAuth()

  return (
    <div className='w-full max-w-7xl'>
      <div className='absolute right-6 top-6'>
        <ThemeToggle />
      </div>
      <div className='grid gap-4'>
        <p>Welcome {currentUser?.displayName || currentUser?.email}!</p>
      </div>
    </div>
  )
}
