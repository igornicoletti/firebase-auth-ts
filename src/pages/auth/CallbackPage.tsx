import { auth } from '@/services/firebase'
import { applyActionCode } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const CallbackPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const mode = searchParams.get('mode')
    const oobCode = searchParams.get('oobCode')

    if (!mode || !oobCode) {
      navigate('/login', { replace: true })
      return
    }

    if (mode === 'resetPassword') {
      navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
    } else if (mode === 'verifyEmail') {
      applyActionCode(auth, oobCode)
        .then(() => {
          navigate('/login?verified=true', { replace: true })
        })
        .catch(() => {
          navigate('/login?verified=false', { replace: true })
        })
    } else {
      navigate('/login', { replace: true })
    }
  }, [searchParams, navigate])

  return null
}
