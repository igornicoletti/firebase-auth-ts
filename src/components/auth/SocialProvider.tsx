import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { GoogleLogo } from '@phosphor-icons/react'

export const SocialProvider = () => {
  const { signInWithGoogle } = useAuth()

  const onSubmit = async () => {
    await signInWithGoogle()
  }

  return (
    <Button variant='secondary' onClick={onSubmit}>
      <GoogleLogo />
      Continue with Google
      <GradientHighlight />
    </Button>
  )
}
