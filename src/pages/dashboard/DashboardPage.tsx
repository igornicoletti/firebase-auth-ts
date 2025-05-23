import { ThemeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { useAuthToast } from '@/hooks/useAuthToast'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { toastSuccess } = useAuthToast()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    toastSuccess('auth/logout-success')
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
