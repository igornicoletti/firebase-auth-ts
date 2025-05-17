import { AnchorData, HeroData, ResetPasswordForm } from '@/components/auth'
import { authConfig } from '@/utils/auth'

export const ResetPasswordPage = () => {
  const { hero, anchor } = authConfig.resetPassword

  return (
    <div className='grid gap-6'>
      <HeroData {...hero} />
      <ResetPasswordForm />
      <AnchorData {...anchor} />
    </div>
  )
}
