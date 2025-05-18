import { AnchorData, HeroData, RegisterForm } from '@/components/auth'
import { authConfig } from '@/features/auth'

export const RegisterPage = () => {
  const { hero, anchor } = authConfig.register

  return (
    <div className='grid gap-6'>
      <HeroData {...hero} />
      <RegisterForm />
      <AnchorData {...anchor} />
    </div>
  )
}
