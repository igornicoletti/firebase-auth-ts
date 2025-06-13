// src/features/auth/components/LoginForm.tsx (ou mantenha Login.tsx se preferir)

import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { InputForm } from '@/common/components/form'
import { useFormSubmit } from '@/common/hooks'
import { useAuthRedirect } from '@/features/auth/hooks'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'
import { AuthSuccessCodes } from '@/features/auth/types'

export const LoginForm = () => {
  const { isRedirecting } = useAuthRedirect()
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
    onError: (error) => console.error('Login error:', error)
  })

  const handleSocialLogin = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      console.error('Social login error:', error)
    }
  }

  if (isRedirecting) return null

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
          <GoogleLogo />
          {isLoading ? 'Logging in..' : 'Login with Google'}
          <ButtonHighlight />
        </Button>
        <p className='flex items-center gap-x-3 text-sm text-muted-foreground
          before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
          after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'>
          or
        </p>
        <InputForm
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
          className='h-auto ml-auto -mb-2 p-0 text-xs font-medium'>
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>
        <InputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
