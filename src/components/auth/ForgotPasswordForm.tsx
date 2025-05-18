import { ControlledInputForm } from '@/components/auth'
import { GradientHighlight } from '@/components/custom'
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
  const { resetPassword } = useAuth()
  const { openDialog, closeDialog } = useDialog()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await resetPassword(data.email)
      openDialog({
        title: 'Check your email',
        description: 'We’ve sent you a link to reset your password.',
        content: (
          <div className="grid grid-cols-2 gap-2">
            <Button variant='secondary' onClick={() => closeDialog(false)}>
              Fix email
              <GradientHighlight />
            </Button>
            <Button variant='secondary' onClick={() => closeDialog(true)}>
              Back to login
              <GradientHighlight />
            </Button>
          </div>
        ),
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
