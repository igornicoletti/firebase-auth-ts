import { AnchorData, ForgotPasswordForm, HeroData } from '@/components/auth'

const heroData = {
  title: 'Forgotten password',
  description: 'Enter your email to receive reset instructions',
}

const anchorData = {
  ask: 'Remember your password?',
  souce: 'Login',
  pathname: '/login',
}

export const ForgotPasswordPage = () => {
  return (
    <div className='grid gap-6'>
      <HeroData {...heroData} />
      <ForgotPasswordForm />
      <AnchorData {...anchorData} />
    </div>
  )
}
