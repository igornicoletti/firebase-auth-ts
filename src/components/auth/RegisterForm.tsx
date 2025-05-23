import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { useToast } from '@/hooks/auth'
import { registerSchema, type RegisterFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

export const RegisterForm = () => {
  const { signUpWithEmailPassword } = useAuth()
  const { toastError, toastSuccess } = useToast()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '', username: '' }
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUpWithEmailPassword(data.email, data.password, data.username)
      toastSuccess('auth/register-success')
    } catch (error: unknown) {
      toastError(error)
      throw error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='username'
          type='text'
          control={form.control}
          placeholder='Username (optional)'
        />
        <ControlledInputForm
          name='email'
          type='email'
          control={form.control}
          placeholder='email@example.com'
        />
        <ControlledInputForm
          name='password'
          type='password'
          control={form.control}
          placeholder='Password'
        />
        <ControlledInputForm
          name='confirmPassword'
          type='password'
          control={form.control}
          placeholder='Confirm password'
        />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
