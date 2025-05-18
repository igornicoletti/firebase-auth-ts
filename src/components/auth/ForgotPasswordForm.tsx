import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { authToast } from '@/features/auth'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const { openDialog } = useDialog()
  const { sendPasswordReset } = useAuth()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await sendPasswordReset(data.email)
      openDialog({
        title: 'Check your email',
        description: 'We’ve sent you a link to reset your password.',
        onClose: () => navigate('/login'),
      })
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
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
