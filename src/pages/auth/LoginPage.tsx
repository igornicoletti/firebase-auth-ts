// src/pages/auth/Login/LoginPage.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogoIcon, SignInIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { FormInput } from '@/components/forms'
import { Button, ButtonHighlight, Form } from '@/components/ui'

import { loginSchema, type LoginFormValues } from '@/schemas'
import { authService } from '@/services'

export const LoginPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      await authService.signInWithEmail(data.email, data.password)
      navigate('/app/dashboard', { replace: true })
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async () => {
    setIsLoading(true)
    try {
      await authService.signInWithGoogle()
      navigate('/app/dashboard', { replace: true })
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className='grid gap-4'>
        <Button
          onClick={handleSocialLogin}
          disabled={isLoading}
          type='button'
          variant='secondary'
        >
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : <GoogleLogoIcon />}
          {isLoading ? 'Logging in..' : 'Login with Google'}
          <ButtonHighlight />
        </Button>

        <p
          className='flex items-center gap-x-3 text-sm text-muted-foreground
          before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-border before:to-border
          after:h-px after:flex-1 after:bg-gradient-to-r after:from-border after:via-border after:to-transparent'
        >
          or
        </p>

        <FormInput
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
          className='h-auto ml-auto -mb-2 p-0 text-xs font-semibold'
        >
          <Link to='/forgot-password'>Forgot password?</Link>
        </Button>

        <FormInput
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
