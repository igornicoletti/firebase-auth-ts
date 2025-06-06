import { AppDateTime } from '@/app/components'
import { useAuth } from '@/auth/contexts'

export const DashboardLayout = () => {
  const { user } = useAuth()

  return (
    <div className="grid gap-1">
      {user && (
        <p className='font-bold text-xl'>
          Welcome, {user.displayName || user.email}!
        </p>
      )}
      <AppDateTime />
    </div>
  )
}
