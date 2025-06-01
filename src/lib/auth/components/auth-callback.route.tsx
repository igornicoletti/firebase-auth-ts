// src/lib/auth/components/auth-callback.route.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthActionCodes, AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuth } from '@/lib/auth/contexts'
import { useAuthToast } from '@/lib/auth/hooks'
import { applyUserActionCode } from '@/lib/auth/services'
import { auth } from '@/lib/firebase'
import { LoadingDots } from '@/lib/routes'

export const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { toastError, toastSuccess } = useAuthToast()

  const [isLoading, setIsLoading] = useState(true)

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (loading) {
      setIsLoading(true)
      return
    }

    if (!mode || !oobCode) {
      toastError(AuthErrorCodes.EXPIRED_OOB_CODE)
      navigate('/login', { replace: true })
      setIsLoading(false)
      return
    }

    const handleAction = async () => {
      setIsLoading(true)

      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL: {
            await applyUserActionCode(oobCode)
            await auth.currentUser?.reload()

            const verified = auth.currentUser?.emailVerified
            if (verified) {
              toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
              navigate('/dashboard', { replace: true })
            } else {
              toastError(AuthErrorCodes.INVALID_OOB_CODE)
              navigate('/login', { replace: true })
            }
            break
          }

          case AuthActionCodes.RESET_PASSWORD: {
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break
          }

          default: {
            toastError(AuthErrorCodes.INTERNAL_ERROR)
            navigate('/login', { replace: true })
            break
          }
        }
      } catch (error) {
        toastError(error)
        navigate('/login', { replace: true })
      } finally {
        setIsLoading(false)
      }
    }

    handleAction()
  }, [mode, oobCode, navigate, toastError, toastSuccess, user, loading])

  if (isLoading) return <LoadingDots />
  return null
}
