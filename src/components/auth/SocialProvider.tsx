import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { GoogleLogo } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export const SocialProvider = () => {
  const navigate = useNavigate()
  const { signInWithGoogle } = useAuth()

  const onSubmit = async () => {
    await signInWithGoogle()
    navigate('/dashboard', { replace: true })
  }

  return (
    <Button variant='secondary' onClick={onSubmit}>
      <GoogleLogo />
      Continue with Google
      <GradientHighlight />
    </Button>
  )
}
