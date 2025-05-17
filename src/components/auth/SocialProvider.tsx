import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
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
      toast.success('Login successful')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error('Login failed', {
        description: (err as Error)?.message || 'Something went wrong'
      })
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
