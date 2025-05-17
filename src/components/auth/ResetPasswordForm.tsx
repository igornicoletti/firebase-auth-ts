import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { getAuthMessageByCode } from '@/utils/auth'
import { resetPasswordSchema, type ResetPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
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
      const errorMsg = getAuthMessageByCode('auth/missing-oob-code')
      toast.error(errorMsg.title, { description: errorMsg.description })
      return
    }

    try {
      await confirmResetPassword(oobCode, data.password)
      const successMsg = getAuthMessageByCode('auth/reset-password-success')
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
          name='password'
          type='password'
          control={form.control}
          placeholder='New password' />
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
