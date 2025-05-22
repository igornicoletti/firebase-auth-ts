import { auth } from '@/services/firebase'
import { applyActionCode } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const CallbackPage = () => {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    const mode = params.get('mode')?.toLowerCase()
    const oobCode = params.get('oobCode')

    if (!mode || !oobCode) {
      navigate('/login', { replace: true })
      return
    }

    const handleCallback = async () => {
      try {
        if (mode === 'verifyemail') {
          await applyActionCode(auth, oobCode)
        } else if (mode === 'resetpassword') {
          navigate(`/reset-password?oobCode=${oobCode}`, { replace: true })
          return
        }
      } catch (error) {
        console.log(error)
      }

      navigate('/login', { replace: true })
    }

    void handleCallback()
  }, [params, navigate])

  return null
}
