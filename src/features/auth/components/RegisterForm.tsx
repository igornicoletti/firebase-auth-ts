// src/auth/components/form/RegisterForm.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap, UserCirclePlus } from '@phosphor-icons/react'

import { AuthInputForm } from '@/features/auth/components'
import { useFormSubmit } from '@/features/auth/hooks'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'
import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'
import { AuthSuccessCodes } from '@/shared/constants'
import { useToast } from '@/shared/hooks'

export const RegisterForm = () => {
  const navigate = useNavigate()
  const { toastError } = useToast()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    }
  })

  const { isLoading, handleSubmit } = useFormSubmit<RegisterFormData>({
    onSubmit: async (data) => {
      await authService.createUserWithEmail(data.email, data.password, data.displayName)
    },
    successMessage: AuthSuccessCodes.SIGNUP_SUCCESS,
    onSuccess: () => navigate('/login', { replace: true }),
    onError: (error) => toastError(error)
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className='grid gap-4'>
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='text'
          name='displayName'
          placeholder='Username'
          autoComplete='given-name'
          autoFocus
        />
        <AuthInputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username'
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
          {isLoading ? <SpinnerGap className='animate-spin' /> : <UserCirclePlus />}
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
