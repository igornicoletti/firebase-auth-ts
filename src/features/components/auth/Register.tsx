// src/features/components/auth/Register.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap, UserCirclePlus } from '@phosphor-icons/react'

import { InputForm } from '@/features/auth'
import { useSubmit } from '@/shared/hooks'

import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { AuthSuccessCodes } from '@/shared/constants'
import { registerSchema, type RegisterData } from '@/shared/schemas'
import { authService } from '@/shared/services'

export const Register = () => {
  const navigate = useNavigate()

  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    }
  })

  const { isLoading, handleSubmit } = useSubmit<RegisterData>({
    onSubmit: async (data) => {
      await authService.createUserWithEmail(data.email, data.password, data.displayName)
    },
    successMessage: AuthSuccessCodes.SIGNUP_SUCCESS,
    onSuccess: () => navigate('/login', { replace: true })
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(handleSubmit)}
        className='grid gap-4'>
        <InputForm
          control={form.control}
          disabled={isLoading}
          type='text'
          name='displayName'
          placeholder='Username'
          autoComplete='given-name'
          autoFocus
        />
        <InputForm
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username'
        />
        <InputForm
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='new-password'
        />
        <InputForm
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
