import { AnchorData, HeroData, ResetPasswordForm } from '@/components/auth'

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
