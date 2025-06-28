import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { firebaseAuth } from '@/configs/firebase.config'
import { PATHS } from '@/routers/paths'
import { authService } from '@/services/auth.service'

export const CallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (!mode || !oobCode) {
      navigate(PATHS.auth.login, { replace: true })
      return
    }

    const handleAction = async () => {
      try {
        switch (mode) {
          case 'verifyEmail': {
            await authService.applyUserActionCode(oobCode)
            await firebaseAuth.currentUser?.reload()

            const isVerified = firebaseAuth.currentUser?.emailVerified

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
  }, [mode, oobCode, navigate])

  return null
}
