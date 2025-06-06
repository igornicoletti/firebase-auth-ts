// src/lib/routes/callback.route.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthActionCodes, AuthSuccessCodes } from '@/auth/constants'
import { useAuth } from '@/auth/contexts'
import { useAuthToast } from '@/auth/hooks'
import { applyUserActionCode } from '@/auth/services'
import { auth } from '@/firebase'

export const Callback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { toastError, toastSuccess } = useAuthToast()

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
          case AuthActionCodes.VERIFY_EMAIL: {
            await applyUserActionCode(oobCode)
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

          case AuthActionCodes.RESET_PASSWORD: {
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

  }, [loading, mode, oobCode, navigate, toastError, toastSuccess, user])

  return null
}
