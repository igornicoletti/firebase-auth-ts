import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { loginSchema, type LoginFormData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  const { login, isLoading, clearError } = useAuth() // Use o hook

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    try {
      await login(data.email, data.password)
      console.log("Tentativa de login realizada.")
    } catch (err: any) {
      console.error("Erro no login:", err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='email'
          type='email'
          disabled={isLoading}
          control={form.control}
          placeholder='email@example.com'
        />
        <div className='grid gap-2'>
          <Button
            asChild
            type='button'
            variant='link'
            disabled={isLoading}
            className='h-auto ml-auto p-0 text-xs font-semibold'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Button>
          <ControlledInputForm
            name='password'
            type='password'
            disabled={isLoading}
            control={form.control}
            placeholder='Password'
          />
        </div>
        <Button type='submit' disabled={isLoading}>
          {!isLoading ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
