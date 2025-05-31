// src/lib/auth/components/auth-callback-route.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { LoadingSpinner } from '@/components/custom'
import { AuthActionCodes, AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuth } from '@/lib/auth/contexts'
import { useAuthToast } from '@/lib/auth/hooks'
import { applyUserActionCode } from '@/lib/auth/services'
import { auth } from '@/lib/firebase'

/**
 * Component to handle authentication callbacks, such as email verification and password reset.
 * It parses the URL parameters to determine the action and applies it.
 */
export const AuthCallbackRoute = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { toastError, toastSuccess } = useAuthToast()

  const [isLoading, setIsLoading] = useState(true)

  const mode = searchParams.get('mode')
  const oobCode = searchParams.get('oobCode')

  useEffect(() => {
    // While the authentication state is loading, keep the local loading state true.
    if (loading) {
      setIsLoading(true)
      return
    }

    // If mode or oobCode are missing, it's an invalid request.
    if (!mode || !oobCode) {
      toastError(AuthErrorCodes.EXPIRED_OOB_CODE)
      navigate('/login', { replace: true })
      setIsLoading(false)
      return
    }

    /**
     * Handles the authentication action based on the 'mode' URL parameter.
     * It verifies email addresses and navigates to the password reset page.
     */
    const handleAction = async () => {
      setIsLoading(true)

      try {
        switch (mode) {
          case AuthActionCodes.VERIFY_EMAIL:
            await applyUserActionCode(oobCode)
            await auth.currentUser?.reload()

            // Check if the email was successfully verified after applying the code and reloading.
            if (auth.currentUser && auth.currentUser.emailVerified) {
              toastSuccess(AuthSuccessCodes.EMAIL_VERIFIED_SUCCESS)
              navigate('/dashboard', { replace: true })
            } else {
              toastError(AuthErrorCodes.INVALID_OOB_CODE)
              navigate('/login', { replace: true })
            }
            break

          case AuthActionCodes.RESET_PASSWORD:
            // Navigate to the reset password page with the oobCode.
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break

          default:
            // Handle unknown or unsupported modes.
            toastError(AuthErrorCodes.INTERNAL_ERROR)
            navigate('/login', { replace: true })
            break
        }
      } catch (error) {
        // Display any errors that occur during the action.
        toastError(error)
        navigate('/login', { replace: true })
      } finally {
        // Ensure loading state is set to false after the action is completed.
        setIsLoading(false)
      }
    }

    handleAction()
    // Re-run effect when mode, oobCode, navigation, or toast functions change.
  }, [mode, oobCode, navigate, toastError, toastSuccess, user, loading])

  // Display a loading spinner while processing the callback.
  if (isLoading) {
    return <LoadingSpinner />
  }

  return null
}
