import { ControlledInputForm } from '@/components/auth'
import { GradientHighlight } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { getAuthMessageByCode } from '@/utils/auth'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { FirebaseError } from 'firebase/app'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const { openDialog, closeDialog } = useDialog()

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' }
  })

  const handleBackToLogin = () => {
    closeDialog()
    navigate('/login')
  }

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await resetPassword(data.email)
      openDialog({
        title: 'Check your email',
        description: 'We’ve sent you a link to reset your password.',
        content: (
          <Button variant='secondary' onClick={handleBackToLogin}>
            Continue to login
            <GradientHighlight />
          </Button>
        ),
        onClose: () => navigate('/login'),
      })
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
        <Button type='submit' disabled={form.formState.isSubmitting}>
          {!form.formState.isSubmitting ? 'Continue' : <SpinnerGap weight='bold' className='animate-spin' />}
        </Button>
      </form>
    </Form>
  )
}
