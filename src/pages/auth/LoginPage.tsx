import { AnchorData, HeroData, LoginForm, SocialProvider } from '@/components/auth'

const heroData = {
  title: 'Sign in to your account',
  description: 'Welcome back! Please sign in to continue',
}

const anchorData = {
  ask: 'Don’t have an account?',
  souce: 'Register',
  pathname: '/register',
}

export const LoginPage = () => {
  return (
    <div className='grid gap-6'>
      <HeroData {...heroData} />
      <div className='grid gap-4'>
        <SocialProvider />
        <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
          <span className='relative z-10 bg-background px-2 text-muted-foreground'>
            or
          </span>
        </div>
        <LoginForm />
      </div>
      <AnchorData {...anchorData} />
    </div>
  )
}
