import { HeroData } from '@/components/auth'
import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { authConfig } from '@/features/auth'
import { sendEmailVerification } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const VerifyEmailPage = () => {
  const navigate = useNavigate()
  const { hero } = authConfig.verifyEmail
  const { currentUser, logout } = useAuth()

  const resendVerificationEmail = async () => {
    if (currentUser) {
      try {
        await sendEmailVerification(currentUser)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.log(err)
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
        <Button variant='secondary' onClick={handleLogout}>
          Logout
          <GradientHighlight />
        </Button>
      </div>
    </div>
  )
}
