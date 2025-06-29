import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogoIcon, SignInIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { FormInputField } from '@/components/forms'
import { Button, ButtonHighlight, Form } from '@/components/ui'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { PATHS } from '@/routers/paths'
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema'
import { authService } from '@/services/auth.service'

export const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, isLoading } = useFormSubmit(
    async (data: LoginFormValues) => {
      await authService.signInWithEmail(data.email, data.password)
    },
    PATHS.app.dashboard
  )

  const { handleSubmit: handleSocialLogin, isLoading: isSocialLoading } = useFormSubmit(
    async () => {
      await authService.signInWithGoogle()
    },
    PATHS.app.dashboard
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className='grid gap-4'>
        <Button
          onClick={handleSocialLogin}
          disabled={isSocialLoading}
          type='button'
          variant='secondary'>
          {isSocialLoading
            ? <SpinnerGapIcon weight='bold' className='animate-spin' />
            : <GoogleLogoIcon weight='bold' />}
          {isSocialLoading
            ? 'Signing in...'
            : 'Login with Google'}
          <ButtonHighlight />
        </Button>
        <p className='flex items-center gap-x-3 text-sm text-muted-foreground
          before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
          after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'>
          or
        </p>
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username'
        />
        <Button
          asChild
          variant='link'
          className='h-auto ml-auto -mb-2 p-0 text-xs'>
          <Link to={PATHS.auth.forgotPassword}>
            Forgot password?
          </Link>
        </Button>
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading
            ? <SpinnerGapIcon weight='bold' className='animate-spin' />
            : <SignInIcon weight='bold' />}
          {isLoading
            ? 'Signing in...'
            : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
