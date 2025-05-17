import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { getAuthMessageByCode } from '@/utils/auth'
import { registerSchema, type RegisterFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

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
      const successMsg = getAuthMessageByCode('auth/register-success')
      toast(successMsg.title, { description: successMsg.description })
      navigate('/login')
    } catch (err) {
      const error = err instanceof FirebaseError ? err : new FirebaseError('unknown', 'Unknown error')
      const errorMsg = getAuthMessageByCode(error.code)
      toast(errorMsg.title, { description: errorMsg.description })
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
