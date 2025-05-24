import { ControlledInputForm } from '@/components/auth'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useAuth } from '@/contexts/auth'
import { useDialog } from '@/contexts/dialog'
import { useToast } from '@/hooks/auth'
import { forgotPasswordSchema, type ForgotPasswordData } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { SpinnerGap } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'

export const ForgotPasswordForm = () => {
  const { toastError } = useToast()
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
        title: 'Password reset email sent',
        description: `We've sent a password reset link to ${data.email}. Please check your inbox.`,
      })
      form.reset()
    } catch (error) {
      toastError(error)
      throw error
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
