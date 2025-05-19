import { HeroData } from '@/components/auth'
import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { authConfig } from '@/features/auth'
import { sendEmailVerification } from 'firebase/auth'

export const VerifyEmailPage = () => {
  const { hero } = authConfig.verifyEmail
  const { currentUser } = useAuth()

  const resendVerificationEmail = async () => {
    if (currentUser) {
      try {
        await sendEmailVerification(currentUser)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='grid gap-6'>
      <HeroData {...hero} />
      <div className='grid gap-4'>
        <Button variant='secondary' onClick={resendVerificationEmail} >
          Resend verification email
          <GradientHighlight />
        </Button>
      </div>
    </div>
  )
}
