import { ThemeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { authToast } from '@/utils/auth'
import { FirebaseError } from 'firebase/app'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      authToast('auth/logout-success', 'success')
      navigate('/login')
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : 'unknown'
      authToast(code, 'error')
    }
  }

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <div className='w-full max-w-7xl'>
        <div className='absolute right-6 top-6'>
          <ThemeToggle />
        </div>
        <div className='grid gap-4'>
          <p>{currentUser?.email}!</p>
          <Button variant='secondary' onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
