import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { getAuthMessageByCode } from '@/utils/auth'
import { FirebaseError } from 'firebase/app'
import { GoogleLogo } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const SocialProvider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signInWithGoogle } = useAuth()

  const from = location.state?.from?.pathname || '/dashboard'

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      const successMsg = getAuthMessageByCode('auth/login-success')
      toast(successMsg.title, { description: successMsg.description })
      navigate(from, { replace: true })
    } catch (err) {
      const error = err instanceof FirebaseError ? err : new FirebaseError('unknown', 'Unknown error')
      const errorMsg = getAuthMessageByCode(error.code)
      toast(errorMsg.title, { description: errorMsg.description })
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
