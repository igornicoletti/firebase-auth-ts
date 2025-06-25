// src/components/auth/Login.tsx

import { AuthErrorCodes } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogoIcon, SignInIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { InputForm } from '@/components/auth'
import { Button, ButtonHighlight, Form } from '@/components/ui'
import { AuthSuccessCodes } from '@/constants/auth'

import { useSubmit, useToast } from '@/hooks'
import { authService } from '@/services'

import { auth } from '@/configs'
import { loginSchema } from '@/schemas'
import type { LoginFormValues } from '@/types'

export const Login = () => {
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useToast()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { isLoading, handleSubmit } = useSubmit<LoginFormValues>({
    onSubmit: async (data) => {
      await authService.signInWithEmail(data.email, data.password)
      await auth.currentUser?.reload()

      const currentUser = authService.getCurrentUser()
      if (currentUser && !currentUser.emailVerified) {
        throw new Error(AuthErrorCodes.UNVERIFIED_EMAIL)
      }
    },
    successMessage: AuthSuccessCodes.SIGNIN_SUCCESS,
    onSuccess: () => navigate('/dashboard', { replace: true })
  })

  const handleSocialLogin = async () => {
    try {
      await authService.signInWithGoogle()
      toastSuccess(AuthSuccessCodes.SIGNIN_SUCCESS)
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
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : <GoogleLogoIcon />}
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
          className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold'>
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
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : <SignInIcon />}
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
