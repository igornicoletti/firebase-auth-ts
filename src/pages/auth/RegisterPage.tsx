import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGapIcon, UserCirclePlusIcon } from '@phosphor-icons/react'

import { FormInputField } from '@/components/forms'
import { Button, Form } from '@/components/ui'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { PATHS } from '@/routers/paths'
import { registerSchema, type RegisterFormValues } from '@/schemas/auth.schema'
import { authService } from '@/services/auth.service'

export const RegisterPage = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    }
  })

  const { handleSubmit, isLoading } = useFormSubmit(
    async (data: RegisterFormValues) => {
      await authService.createUserWithEmail(data.email, data.password, data.displayName)
    },
    PATHS.auth.login
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className='grid gap-4'>
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='text'
          name='displayName'
          placeholder='Username'
          autoComplete='given-name'
          autoFocus
        />
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='username'
        />
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='Password'
          autoComplete='new-password'
        />
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          autoComplete='new-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading
            ? <SpinnerGapIcon weight='bold' className='animate-spin' />
            : <UserCirclePlusIcon weight='bold' />}
          {isLoading
            ? 'Creating...'
            : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
