import { ControlledInputForm } from '@/components/auth/ControlledInputForm'
import { GradientHighlight } from '@/components/custom/GradientHighlight'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth/AuthContext'
import { useDialog } from '@/contexts/dialog/DialogContext'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/validations/auth/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const ForgotPasswordForm = () => {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const { openDialog, closeDialog } = useDialog()

  const handleBackToLogin = () => {
    closeDialog()
    navigate('/login')
  }

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
        onClose: () => navigate('/login'),
        content: (
          <Button variant='secondary' onClick={handleBackToLogin}>
            Back to login
            <GradientHighlight />
          </Button>
        )
      })
    } catch (err) {
      toast('Reset failed', {
        description: (err as Error).message || 'Something went wrong.'
      })
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
