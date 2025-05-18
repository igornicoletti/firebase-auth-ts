import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { authToast } from '@/features/auth'
import { loginSchema, type LoginFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const { signInWithEmailPassword } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signInWithEmailPassword(data.email, data.password)
      authToast('auth/login-success', 'success')
      navigate(from, { replace: true })
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
        <div className='grid gap-2'>
          <Button asChild type='button' variant='link' className='h-auto ml-auto p-0 text-xs font-semibold'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Button>
          <ControlledInputForm
            name='password'
            type='password'
            control={form.control}
            placeholder='Password' />
        </div>
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
