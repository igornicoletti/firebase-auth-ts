import { useToast } from '@/hooks/auth'
import { auth } from '@/services/firebase'
import { applyActionCode } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

type Mode = 'verifyemail' | 'resetpassword'

export const CallbackPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { toastError, toastSuccess } = useToast()

  useEffect(() => {
    const modeParam = params.get('mode')?.toLowerCase()
    const oobCode = params.get('oobCode')

    const mode = (modeParam === 'verifyemail' || modeParam === 'resetpassword') ? modeParam as Mode : null

    if (!mode || !oobCode) {
      navigate('/login', { replace: true })
      return
    }

    const handleCallback = async () => {
      try {
        if (mode === 'verifyemail') {
          await applyActionCode(auth, oobCode)
          toastSuccess('auth/email-verification-success')
          navigate('/login', { replace: true })
        } else if (mode === 'resetpassword') {
          navigate(`/reset-password?oobCode=${encodeURIComponent(oobCode)}`, { replace: true })
        }
      } catch (error) {
        toastError(error)
        navigate('/login', { replace: true })
      }
    }

    void handleCallback()
  }, [params, navigate, toastError, toastSuccess])

  return null
}
