import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { authToast } from '@/utils/auth'
import { FirebaseError } from 'firebase/app'
import { GoogleLogo } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'

export const SocialProvider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signInWithGoogle } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      authToast('auth/login-success', 'success')
      navigate(from, { replace: true })
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : 'unknown'
      authToast(code, 'error')
    }
  }

  return (
    <Button variant='secondary' onClick={handleGoogleSignIn}>
      <GoogleLogo />
      Continue with Google
      <GradientHighlight />
    </Button>
  )
}
