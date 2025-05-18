import { ThemeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full max-w-7xl'>
      <div className='absolute right-6 top-6'>
        <ThemeToggle />
      </div>
      <div className='grid gap-4'>
        <p>Welcome {currentUser?.displayName || currentUser?.email}!</p>
        <Button variant='secondary' onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}
