import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { loginSchema, type LoginFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const LoginForm = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const stateFrom = location.state?.from?.pathname || '/dashboard'

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password)
      navigate(stateFrom, { replace: true })
      toast('Success', { description: 'Password updated successfully' })
    } catch (err) {
      toast('Error', { description: 'Something went wrong' })
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
