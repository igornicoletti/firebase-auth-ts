import { Button } from '@/components/ui'
import { authService } from '@/services/auth.service'

export const DashboardPage = () => {

  return (
    <div>
      <Button onClick={() => authService.signOut()} variant='secondary'>Sign out</Button>
    </div>
  )
}
