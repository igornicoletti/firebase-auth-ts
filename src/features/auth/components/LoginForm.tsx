// src/features/auth/components/LoginForm.tsx

import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom' // Import useLocation

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { useConfirmDialog, useFormSubmit } from '@/common'
import { InputForm } from '@/common/components/form'
import { useAuth } from '@/features/auth/contexts'
import { useAuthRedirect, useAuthToast } from '@/features/auth/hooks'
import { loginSchema, type LoginFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'
import { AuthSuccessCodes } from '@/features/auth/types'
import { EmailVerificationModalContent } from './EmailVerificationModalContent'
interface LocationState {
  from?: { pathname: string }
}
export const LoginForm = () => {
  const { isRedirecting } = useAuthRedirect()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  const { openCustomDialog } = useConfirmDialog()
  const { toastError, toastSuccess } = useAuthToast()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isLoading: formLoading, handleSubmit } = useFormSubmit<LoginFormData>({
    onSubmit: async (data) => {
      await authService.signInWithEmail(data.email, data.password)
    }
  })

  const handleSocialLogin = async () => {
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      console.error('Social login error:', error)
      toastError("Falha ao logar com o Google. Tente novamente." as any)
    }
  }

  React.useEffect(() => {
    if (!authLoading && user && !formLoading) {
      if (!user.emailVerified) {
        openCustomDialog({
          title: 'Verifique seu E-mail',
          content: <EmailVerificationModalContent />,
        })
      } else {
        const state = location.state as LocationState
        const from = state?.from?.pathname || '/dashboard'
        navigate(from, { replace: true })
        toastSuccess(AuthSuccessCodes.SIGNIN_SUCCESS)
      }
    }
  }, [user, authLoading, formLoading, navigate, location.state])

  if (isRedirecting) return null

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        autoComplete='on'
        className='grid gap-4'>
        <Button
          onClick={handleSocialLogin}
          disabled={formLoading}
          type='button'
          variant='secondary'>
          <GoogleLogo />
          {formLoading ? 'Logging..' : 'Login with Google'}
          <ButtonHighlight />
        </Button>
        <p className='flex items-center gap-x-3 text-sm text-muted-foreground
            before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
            after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'>
          or
        </p>
        <InputForm
          control={form.control}
          disabled={formLoading}
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
          disabled={formLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='current-password'
        />
        <Button disabled={formLoading} type='submit'>
          {formLoading ? 'Logging...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
