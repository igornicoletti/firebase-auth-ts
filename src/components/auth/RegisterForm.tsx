import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { authToast } from '@/utils/auth'
import { registerSchema, type RegisterFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data.email, data.password)
      authToast('auth/register-success', 'success')
      navigate('/login')
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : 'unknown'
      authToast(code, 'error')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='email'
          type='email'
          control={form.control}
          placeholder='email@example.com' />
        <ControlledInputForm
          name='password'
          type='password'
          control={form.control}
          placeholder='Password' />
        <ControlledInputForm
          name='confirmPassword'
          type='password'
          control={form.control}
          placeholder='Confirm password' />
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
