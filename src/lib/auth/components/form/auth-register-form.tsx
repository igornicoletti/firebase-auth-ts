// src/lib/auth/components/form/auth-register-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { AuthInputForm } from '@/lib/auth/components/form'
import { AuthSuccessCodes } from '@/lib/auth/constants'
import { useAuthToast } from '@/lib/auth/hooks'
import { authRegisterSchema } from '@/lib/auth/schemas'
import { createUserWithEmail } from '@/lib/auth/services'

type AuthRegister = z.infer<typeof authRegisterSchema>

export const AuthRegisterForm = () => {
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useAuthToast()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AuthRegister>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  /**
   * Handles the form submission for user registration.
   * Calls the createUserWithEmail service, displays success/error toasts,
   * resets the form on success, and navigates to the login page.
   * Finally, sets the loading state.
   * @param data - The form data containing username, email, password, and password confirmation.
   */
  const onSubmit = async (data: AuthRegister) => {
    setIsLoading(true)

    try {
      await createUserWithEmail(data.email, data.password, data.username)
      toastSuccess(AuthSuccessCodes.SIGNUP_SUCCESS)
      form.reset()
      navigate('/login')

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
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='text'
          name='username'
          placeholder='Username' />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email address' />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password' />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm password' />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
