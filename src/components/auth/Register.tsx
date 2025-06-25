// src/components/auth/Register.tsx

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon, UserCirclePlusIcon } from '@phosphor-icons/react'

import { InputForm } from '@/components/auth'
import { Button, Form } from '@/components/ui'
import { AuthSuccessCodes } from '@/constants/auth'

import { useSubmit } from '@/hooks'
import { authService } from '@/services'

import { registerSchema } from '@/schemas'
import type { RegisterFormValues } from '@/types'

export const Register = () => {
  const navigate = useNavigate()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    }
  })

  const { isLoading, handleSubmit } = useSubmit<RegisterFormValues>({
    onSubmit: async (data) => {
      await authService.createUserWithEmail(data.email, data.password, data.displayName)
    },
    successMessage: AuthSuccessCodes.SIGNUP_SUCCESS,
    onSuccess: () => navigate('/login', { replace: true })
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
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
          {isLoading ? <SpinnerGapIcon className='animate-spin' /> : <UserCirclePlusIcon />}
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
