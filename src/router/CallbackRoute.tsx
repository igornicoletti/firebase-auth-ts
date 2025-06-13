// src/router/CallbackRoute.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { auth } from '@/configs/firebase'
import { useAuth } from '@/features'
import { useAuthToast } from '@/features/auth/hooks/useAuthToast'
import { authService } from '@/features/auth/services'
import { AuthActionCodes, AuthSuccessCodes } from '@/features/auth/types' // Importe os códigos de erro tipados

export const CallbackRoute = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { loading } = useAuth()
  const { toastError, toastSuccess } = useAuthToast()

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    if (loading) return

    const redirectToLoginWithError = (errorMessage: string) => {
      toastError(errorMessage)
      navigate('/login', { replace: true })
    }

    if (!mode || !oobCode) {
      redirectToLoginWithError(AuthErrorCodes.EXPIRED_OOB_CODE)
      return
    }

    const handleAction = async () => {
      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL: {
            await authService.applyUserActionCode(oobCode)
            await auth.currentUser?.reload()
            if (auth.currentUser?.emailVerified) {
              toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
              navigate('/dashboard', { replace: true })
            } else {
              redirectToLoginWithError(AuthErrorCodes.INVALID_OOB_CODE)
            }
            break
          }

          case AuthActionCodes.RESET_PASSWORD: {
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true }) // Passar o oobCode como query param, como na primeira versão
            break
          }

          default: {
            redirectToLoginWithError(AuthErrorCodes.INTERNAL_ERROR) // Usar um código de erro genérico para ações desconhecidas
            break
          }
        }
      } catch (err: any) {
        console.error(err)
        redirectToLoginWithError(err.message || AuthErrorCodes.INTERNAL_ERROR)
      }
    }

    handleAction()
  }, [loading, mode, oobCode, navigate, toastError, toastSuccess])

  return null
}
