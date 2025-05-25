import { useAuth } from '@/contexts/auth'
import { useToast } from '@/hooks/auth'
import { auth } from '@/services/firebase'
import { applyActionCode } from 'firebase/auth'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const CallbackPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { toastError, toastSuccess } = useToast()
  const { reloadUser } = useAuth()

  useEffect(() => {
    const mode = searchParams.get('mode')?.toLowerCase()
    const oobCode = searchParams.get('oobCode')

    if (mode === 'verifyemail' && oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => reloadUser())                 // ← recarrega user no contexto
        .then(() => toastSuccess('auth/email-verified'))
        .catch(err => toastError(err))
        .finally(() => {
          setSearchParams({})                     // ← limpa a URL
          navigate('/login', { replace: true })
        })
    } else if (mode === 'resetpassword' && oobCode) {
      navigate(`/reset-password?oobCode=${encodeURIComponent(oobCode)}`, { replace: true })
    } else {
      // seu fluxo de Google Redirect, se houver
    }
  }, [searchParams, setSearchParams, reloadUser, toastError, toastSuccess, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-muted border-t-primary" />
    </div>
  )
}
