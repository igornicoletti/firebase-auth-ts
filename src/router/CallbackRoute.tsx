// src/router/CallbackRoute.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useToast } from '@/common/components/toast'
import { auth } from '@/configs/firebase'
import { useAuth } from '@/features'
import { AuthSuccessCodes } from '@/features/auth/constants'
import { authService } from '@/features/auth/services'

export const CallbackRoute = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { loading } = useAuth()
  const { toastError, toastSuccess } = useToast()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (loading) {
      return
    }

    if (!mode || !oobCode) {
      toastError(AuthErrorCodes.EXPIRED_OOB_CODE)
      navigate('/login', { replace: true })
      return
    }

    const handleAuthAction = async () => {
      try {
        switch (mode) {
          case 'verify-email': {
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

          case 'reset-password': {
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
