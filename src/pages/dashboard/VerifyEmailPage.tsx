import { HeroData } from '@/components/auth'
import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth'
import { authConfig, authToast } from '@/features/auth'
import { FirebaseError } from 'firebase/app'
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
        authToast('auth/verify-email', 'success')
      } catch (err) {
        const code = err instanceof FirebaseError ? err.code : 'unknown'
        authToast(code, 'error')
      }
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      authToast('auth/logout-success', 'success')
      navigate('/login')
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : 'unknown'
      authToast(code, 'error')
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
