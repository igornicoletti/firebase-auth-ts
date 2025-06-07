import { CurrentDateTime, ProtectionScreen } from '@/app/components'
import { useIdleDetector } from '@/app/hooks'
import { useAuth } from '@/auth/contexts'
import { useAuthToast } from '@/auth/hooks'
import { reauthenticateWithPassword } from '@/auth/services'
import { useCallback, useState } from 'react'

const IDLE_TIMEOUT_MS = 1 * 60 * 1000

export const DashboardLayout = () => {
  const { user } = useAuth()
  const { toastError } = useAuthToast()
  const [isLocked, setIsLocked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleIdle = useCallback(() => {
    setIsLocked(true)
  }, [])

  const handleUnlock = useCallback(async (password: string) => {
    setIsLoading(true)

    try {
      await reauthenticateWithPassword(password)
      setIsLocked(false)
    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }, [])

  useIdleDetector({
    timeout: IDLE_TIMEOUT_MS,
    onIdle: handleIdle
  })

  const userNameOrEmail = user?.displayName || user?.email || ''
  const userAvatar = user?.photoURL || 'https://avatars.githubusercontent.com/u/40406316?v=4'

  return (
    <div className="grid gap-1 relative">
      {isLocked && user && (
        <ProtectionScreen
          onUnlock={handleUnlock}
          isLoading={isLoading}
          userName={userNameOrEmail}
          avatarSrc={userAvatar}
        />
      )}

      <div className={isLocked ? "blur-sm pointer-events-none" : ""}>
        {user && (
          <p className='text-sm text-muted-foreground'>
            Hello, {userNameOrEmail}
          </p>
        )}
        <CurrentDateTime />
      </div>
    </div>
  )
}
