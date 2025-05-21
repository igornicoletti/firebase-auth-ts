import { ThemeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className='w-full max-w-7xl p-6'>
      <div className='absolute right-6 top-6'>
        <ThemeToggle />
      </div>
      <div className='grid gap-4 mb-6'>
        <p className='text-lg font-semibold'>
          Welcome, {currentUser?.displayName || currentUser?.email}!
        </p>
      </div>
      <Button
        type='button'
        variant='secondary'
        onClick={handleLogout}
        className='w-full max-w-xs'
        aria-label='Logout and end session'>
        Logout
      </Button>
    </div>
  )
}
