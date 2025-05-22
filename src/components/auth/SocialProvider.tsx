import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { useAuthToast } from '@/hooks/useAuthToast'
import { GoogleLogo } from '@phosphor-icons/react'

export const SocialProvider = () => {
  const { toastError } = useAuthToast()
  const { signInWithGoogle } = useAuth()

  const onSubmit = async () => {
    try {
      await signInWithGoogle()
    } catch (error: unknown) {
      toastError(error)
      throw error
    }
  }

  return (
    <Button variant='secondary' onClick={onSubmit}>
      <GoogleLogo />
      Continue with Google
      <GradientHighlight />
    </Button>
  )
}
