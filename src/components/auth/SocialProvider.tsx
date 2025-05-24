import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { useToast } from '@/hooks/auth'
import { GoogleLogo } from '@phosphor-icons/react'

export const SocialProvider = () => {
  const { signInWithGoogle } = useAuth()
  const { toastError, toastSuccess } = useToast()

  const onSubmit = async () => {
    try {
      await signInWithGoogle()
      toastSuccess('auth/login-success')
    } catch (error) {
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
