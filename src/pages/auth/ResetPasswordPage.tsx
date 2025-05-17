import { AnchorData } from '@/components/auth/AnchorData'
import { HeroData } from '@/components/auth/HeroData'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

const heroData = {
  title: 'Reset password',
  description: 'Set a new password for your account',
}

const anchorData = {
  ask: 'Back to login?',
  souce: 'Login',
  pathname: '/login',
}

export const ResetPasswordPage = () => {
  return (
    <div className='grid gap-6'>
      <HeroData {...heroData} />
      <ResetPasswordForm />
      <AnchorData {...anchorData} />
    </div>
  )
}
