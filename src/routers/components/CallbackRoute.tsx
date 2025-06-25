// src/routers/components/CallbackRoute.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { auth } from '@/configs/firebase'
import { AuthCallbackCodes, AuthSuccessCodes } from '@/constants/auth'
import { useAuth, useToast } from '@/shared/hooks'
import { authService } from '@/shared/services'

export const CallbackRoute = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { loading } = useAuth()
  const { toastError, toastSuccess } = useToast()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (loading) return

    if (!mode || !oobCode) {
      toastError(AuthErrorCodes.EXPIRED_OOB_CODE)
      navigate('/login', { replace: true })
      return
    }

    const handleAuthAction = async () => {
      try {
        switch (mode) {
          case AuthCallbackCodes.VERIFY_PASSWORD: {
            await authService.applyUserActionCode(oobCode)
            await auth.currentUser?.reload()

            if (auth.currentUser?.emailVerified) {
              toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
              navigate('/dashboard', { replace: true })
            } else {
              toastError(AuthErrorCodes.INVALID_OOB_CODE)
              navigate('/login', { replace: true })
            }
            break
          }

          case AuthCallbackCodes.RESET_PASSWORD: {
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break
          }

          default: {
            toastError(AuthErrorCodes.INTERNAL_ERROR)
            navigate('/login', { replace: true })
          }
        }
      } catch (error) {
        toastError(error)
        navigate('/login', { replace: true })
      }
    }

    handleAuthAction()
  }, [loading, mode, oobCode, navigate, toastError, toastSuccess])

  return null
}
