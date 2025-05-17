import { AnchorData, HeroData, RegisterForm } from '@/components/auth'

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
