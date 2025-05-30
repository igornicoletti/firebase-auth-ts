// src/lib/auth/components/auth-callback-route.tsx

import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

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
  const { toastError } = useAuthToast()
  const navigate = useNavigate()

  const mode = params.get('mode')
  const oobCode = params.get('oobCode')

  useEffect(() => {
    if (authLoading) {
      setIsLoading(true)
      return
    }

    if (user && user.emailVerified) {
      toast.message("Email already Verified", {
        description: "Your email address was already successfully verified!",
        classNames: {
          title: '!text-primary',
          description: '!text-foreground'
        }
      })
      navigate('/dashboard', { replace: true })
      setIsLoading(false)
      return
    }


    if (!mode || !oobCode) {
      toastError(new Error("Invalid action link. Please try again or contact support."))
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
            if (auth.currentUser) {
              await auth.currentUser.reload()
            }
            if (auth.currentUser && auth.currentUser.emailVerified) {
              toast.message("Email Verified", {
                description: "Your email address has been successfully verified!",
                classNames: {
                  title: '!text-primary',
                  description: '!text-foreground'
                }
              })
              navigate('/dashboard', { replace: true })

            } else {
              toastError(new Error("Email verification complete, but state not updated. Please try logging in."))
              navigate('/login', { replace: true })
            }

            break

          case AuthActionCodes.RESET_PASSWORD:
            navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
            break

          default:
            toastError(new Error(`Unknown action requested: ${mode}.`))
            navigate('/login', { replace: true })
        }
      } catch (error) {
        toastError(error)
        navigate('/login', { replace: true })

      } finally {
        setIsLoading(false)
      }
    }

    if (mode && oobCode && (!user || !user.emailVerified)) {
      handleAction()
    }
  }, [mode, oobCode, navigate, toastError, user, authLoading])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return null
}
