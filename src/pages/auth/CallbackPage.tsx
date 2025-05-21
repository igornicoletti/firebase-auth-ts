import { authToast } from '@/features/auth'
import { auth } from '@/services/firebase'
import { applyActionCode } from 'firebase/auth'
import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const CallbackPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const hasHandledCallback = useRef(false)

  useEffect(() => {
    if (hasHandledCallback.current) {
      return
    }

    const mode = params.get('mode')
    const oobCode = params.get('oobCode')

    if (!mode || !oobCode) {
      navigate('/login', { replace: true })
      hasHandledCallback.current = true
      return
    }

    const handleCallback = async () => {
      hasHandledCallback.current = true
      if (mode === 'verifyEmail') {
        try {
          await applyActionCode(auth, oobCode)
        } catch (err) {
          authToast(err)
        } finally {
          navigate('/login', { replace: true })
        }
        return
      }

      if (mode === 'resetPassword') {
        navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
        return
      }

      navigate('/login', { replace: true })
    }

    handleCallback()
  }, [params, navigate])

  return null
}
