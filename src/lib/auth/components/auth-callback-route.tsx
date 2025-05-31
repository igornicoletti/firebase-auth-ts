// src/lib/auth/components/auth-callback-route.tsx

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthActionCodes } from '@/lib/auth/constants'
import { useAuth } from '@/lib/auth/contexts'
import { useAuthToast } from '@/lib/auth/hooks'
import { confirmUserEmail } from '@/lib/auth/services'
import { auth } from '@/lib/firebase/firebase'

import { LoadingSpinner } from '@/components/custom'

export const AuthCallbackRoute = () => {
  const { user, loading: authLoading } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [params] = useSearchParams()
  const { toastError, toastSuccess } = useAuthToast()
  const navigate = useNavigate()

  const mode = params.get('mode')
  const oobCode = params.get('oobCode')

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true)
      return
    }

    if (!mode || !oobCode) {
      toastError('auth/expired-action-code')
      navigate('/login', { replace: true })
      setIsLoading(false)
      return
    }

    const handleAction = async () => {
      setIsLoading(true)

      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL:
            await confirmUserEmail(oobCode)
            await auth.currentUser?.reload()

            if (auth.currentUser && auth.currentUser.emailVerified) {
              toastSuccess('auth/email-verified-success')
              navigate('/dashboard', { replace: true })

            } else {
              toastError('auth/invalid-action-code')
              navigate('/login', { replace: true })
            }
            break

          case AuthActionCodes.RESET_PASSWORD:
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break

          default:
            toastError('auth/internal-error')
            navigate('/login', { replace: true })
        }
      } catch (error) {
        toastError(error)
        navigate('/login', { replace: true })

      } finally {
        setIsLoading(false)
      }
    }

    handleAction()
  }, [mode, oobCode, navigate, toastError, toastSuccess, user, authLoading])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return null
}
