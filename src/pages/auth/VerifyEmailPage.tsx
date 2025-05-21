import { HeroData } from '@/components/auth'
import { authConfig } from '@/features/auth'

export const VerifyEmailPage = () => {
  const { hero } = authConfig.verifyEmail

  return (
    <div className='grid gap-6'>
      <HeroData {...hero} />
    </div>
  )
}
