import { AnchorData, ForgotPasswordForm, HeroData } from '@/components/auth'
import { authConfig } from '@/utils/auth'

export const ForgotPasswordPage = () => {
  const { hero, anchor } = authConfig.forgotPassword

  return (
    <div className='grid gap-6'>
      <HeroData {...hero} />
      <ForgotPasswordForm />
      <AnchorData {...anchor} />
    </div>
  )
}
