// src/lib/auth/components/form/auth-register-form.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { AuthInputForm } from '@/auth/components/form'
import { AuthSuccessCodes } from '@/auth/constants'
import { useAuthToast } from '@/auth/hooks'
import { authRegisterSchema } from '@/auth/schemas'
import { createUserWithEmail } from '@/auth/services'

type AuthRegisterValues = z.infer<typeof authRegisterSchema>

export const AuthRegisterForm = () => {
  const navigate = useNavigate()
  const { toastError, toastSuccess } = useAuthToast()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AuthRegisterValues>({
    resolver: zodResolver(authRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const handleCreateUserWithEmail = async (data: AuthRegisterValues) => {
    setIsLoading(true)

    try {
      await createUserWithEmail(data.email, data.password, data.username)
      form.reset()
      navigate('/login')
      toastSuccess(AuthSuccessCodes.SIGNUP_SUCCESS)

    } catch (error) {
      toastError(error)

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateUserWithEmail)}
        autoComplete='on'
        className='grid gap-4'>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='text'
          name='username'
          placeholder='Username'
          autoComplete='username'
        />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email address'
          autoComplete='email'
        />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='new-password'
        />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          autoComplete='new-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
