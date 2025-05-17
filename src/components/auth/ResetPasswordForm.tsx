import { ControlledInputForm } from '@/components/auth/ControlledInputForm'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth/AuthContext'
import { resetPasswordSchema, type ResetPasswordData } from '@/validations/auth/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

export const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const { confirmResetPassword } = useAuth()
  const [searchParams] = useSearchParams()

  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  const onSubmit = async (data: ResetPasswordData) => {
    if (!oobCode) {
      toast('Error', { description: 'Invalid reset link. Please request a new one.' })
      return
    }

    try {
      await confirmResetPassword(oobCode, data.password)
      toast('Password reset successfully', { description: 'You can now log in with your new password.' })
      navigate('/login')
    } catch (err) {
      toast('Error resetting password', { description: 'Please try again or request a new reset link.' })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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
