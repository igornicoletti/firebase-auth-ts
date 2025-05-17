import { ThemeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth'
import { useNavigate } from 'react-router-dom'

export const DashboardPage = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <div className='min-h-screen p-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex justify-end mb-4'>
          <ThemeToggle />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='mb-4'>Welcome, {currentUser?.email}!</p>
            <Button onClick={handleLogout} variant='outline'>
              Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
