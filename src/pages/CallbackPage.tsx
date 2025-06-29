import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAuth } from '@/contexts/AuthProvider'
import { PATHS } from '@/routers/paths'
import { authService } from '@/services/auth.service'

export const CallbackPage = () => {
  const { user, isLoading } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (!mode || !oobCode) {
      navigate(PATHS.auth.login, { replace: true })
      return
    }

    if (isLoading) return

    const handleAction = async () => {
      try {
        switch (mode) {
          case 'verifyEmail': {
            await authService.applyUserActionCode(oobCode)

            const isVerified = user?.emailVerified

            if (isVerified) {
              navigate(PATHS.app.dashboard, { replace: true })
            } else {
              navigate(PATHS.auth.login, { replace: true })
            }
            break
          }

          case 'resetPassword': {
            navigate(`${PATHS.auth.resetPassword}?oobCode=${oobCode}`, { replace: true })
            break
          }

          default: {
            navigate(PATHS.auth.login, { replace: true })
            break
          }
        }
      } catch (error) {
        console.error('Callback error:', error)
        navigate(PATHS.auth.login, { replace: true })
      }
    }

    handleAction()
  }, [mode, oobCode, navigate, user, isLoading])

  return null
}
