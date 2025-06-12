// src/auth/components/form/RegisterForm.tsx

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shadcn/ui/button'
import { Form } from '@/shadcn/ui/form'

import { useConfirmDialog } from '@/common/components/dialog'
import { InputForm } from '@/common/components/form'
import { useFormSubmit } from '@/common/hooks'
import { EmailVerificationModalContent } from '@/features/auth/components/EmailVerificationModalContent'
import { useAuthRedirect } from '@/features/auth/hooks'
import { registerSchema, type RegisterFormData } from '@/features/auth/schemas'
import { authService } from '@/features/auth/services'
import { AuthSuccessCodes } from '@/features/auth/types'

export const RegisterForm = () => {
  const { isRedirecting } = useAuthRedirect({ requireEmailVerified: false })
  const { openCustomDialog } = useConfirmDialog()

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
    onSuccess: () => {
      form.reset()
      openCustomDialog({
        title: 'Verifique seu E-mail',
        description: 'Um e-mail de verificação foi enviado. Por favor, siga as instruções.',
        content: <EmailVerificationModalContent />,
      })
    },
    onError: (error) => console.error(error)
  })

  if (isRedirecting) return null

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
          placeholder='Name'
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
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </form>
    </Form>
  )
}
