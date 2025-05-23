import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { useToast } from '@/hooks/auth'
import { resetPasswordSchema, type ResetPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'

export const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const { confirmNewPassword } = useAuth()
  const { toastError, toastSuccess } = useToast()

  const [searchParams] = useSearchParams()

  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onSubmit',
  })

  const onSubmit = async (data: ResetPasswordData) => {
    if (!oobCode) {
      return <Navigate to="/login" replace />
    }

    try {
      await confirmNewPassword(oobCode, data.password)
      toastSuccess('auth/password-reset-success')
      navigate('/login', { replace: true })
    } catch (error: unknown) {
      toastError(error)
      throw error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
        <ControlledInputForm
          name='password'
          type='password'
          control={form.control}
          placeholder='New password'
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
