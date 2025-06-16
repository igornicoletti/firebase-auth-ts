// src/features/auth/components/LoginForm.tsx (ou mantenha Login.tsx se preferir)

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo, SignIn, SpinnerGap } from '@phosphor-icons/react'

import { AuthInputForm } from '@/features/auth/components'
import { useFormSubmit } from '@/features/auth/hooks'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'
import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'
import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'

export const LoginForm = () => {
  const { toastError } = useToast()
  const navigate = useNavigate()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isLoading, handleSubmit } = useFormSubmit<LoginFormData>({
    onSubmit: async (data) => {
      await authService.signInWithEmail(data.email, data.password)
    },
    successMessage: AuthSuccessCodes.SIGNIN_SUCCESS,
    onSuccess: () => navigate('/dashboard', { replace: true }),
    onError: (error) => toastError(error)
  })

  const handleSocialLogin = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      toastError(error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className='grid gap-4'>
        <Button
          onClick={handleSocialLogin}
          disabled={isLoading}
          type='button'
          variant='secondary'>
          {isLoading ? <SpinnerGap className='animate-spin' /> : <GoogleLogo />}
          {isLoading ? 'Logging in..' : 'Login with Google'}
          <ButtonHighlight />
        </Button>
        <p className='flex items-center gap-x-3 text-sm text-muted-foreground
          before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
          after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'>
          or
        </p>
        <AuthInputForm
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
          className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold'>
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? <SpinnerGap className='animate-spin' /> : <SignIn />}
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
