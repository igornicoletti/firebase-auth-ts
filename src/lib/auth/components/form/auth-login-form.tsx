// src/lib/auth/components/form/auth-login-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { GoogleLogo } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { authLoginSchema } from '@/lib/auth/schemas'
import { signInWithEmail, signInWithGoogle } from '@/lib/auth/services'

type AuthLogin = z.infer<typeof authLoginSchema>

/**
 * A form component for user login, handling both email/password and Google authentication.
 * It uses `react-hook-form` for form management and validation, and integrates with Firebase
 * for authentication services. Upon successful login, it navigates the user to the dashboard.
 */
export const AuthLoginForm = () => {
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useAuthToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AuthLogin>({
    resolver: zodResolver(authLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * Handles the form submission for email/password login.
   * It attempts to sign in the user with the provided credentials.
   * On success, it displays a success message, resets the form, and navigates to the dashboard.
   * On error, it displays an error message.
   * Finally, it sets the loading state to false.
   * @param data - The form data containing the email and password.
   */
  const onSubmit = async (data: AuthLogin) => {
    setIsLoading(true)

    try {
      await signInWithEmail(data.email, data.password)
      toastSuccess(AuthSuccessCodes.SIGNIN_SUCCESS)
      form.reset()
      navigate('/dashboard')

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles the Google login functionality.
   * It attempts to sign in the user with their Google account.
   * On success, it displays a success message, resets the form, and navigates to the dashboard.
   * On error, it displays an error message.
   * Finally, it sets the loading state to false.
   */
  const handleGoogleLogin = async () => {
    setIsLoading(true)

    try {
      await signInWithGoogle()
      toastSuccess(AuthSuccessCodes.SIGNIN_SUCCESS)
      form.reset()
      navigate('/dashboard')

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete='on'
        className='grid gap-4'>
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          type='button'
          variant='secondary'>
          <GoogleLogo />
          {isLoading ? 'Logging..' : 'Login with Google'}
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
          placeholder='Email address' />
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
          placeholder='Password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Logging...' : 'Login'}
        </Button>
      </form>
    </Form>
  )
}
