import { GradientHighlight } from '@/components/custom/GradientHighlight'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth/AuthContext'
import { GoogleLogo } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const SocialProvider = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { signInWithGoogle } = useAuth()

  const stateFrom = location.state?.from?.pathname || '/dashboard'

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate(stateFrom, { replace: true })
      toast(' ', { description: ' ' })
    } catch (err) {
      toast(' ', { description: ' ' })
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
