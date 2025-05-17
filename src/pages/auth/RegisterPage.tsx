import { AnchorData } from '@/components/auth/AnchorData'
import { HeroData } from '@/components/auth/HeroData'
import { RegisterForm } from '@/components/auth/RegisterForm'

const heroData = {
  title: 'Create your account',
  description: 'Please fill in the details to get started',
}

const anchorData = {
  ask: 'Already have an account?',
  souce: 'Login',
  pathname: '/login',
}

export const RegisterPage = () => {
  return (
    <div className='grid gap-6'>
      <HeroData {...heroData} />
      <RegisterForm />
      <AnchorData {...anchorData} />
    </div>
  )
}
