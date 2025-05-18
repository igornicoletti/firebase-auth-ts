import { AnchorData, HeroData, ResetPasswordForm } from '@/components/auth'
import { authConfig } from '@/features/auth'

export const ResetPasswordPage = () => {
  const { hero, anchor } = authConfig.sendPasswordReset

  return (
    <div className='grid gap-6'>
      <HeroData {...hero} />
      <ResetPasswordForm />
      <AnchorData {...anchor} />
    </div>
  )
}
