import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { PaperPlaneTiltIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { FormInputField } from '@/components/forms'
import { Button, Form } from '@/components/ui'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { PATHS } from '@/routers/paths'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/schemas/auth.schema'
import { authService } from '@/services/auth.service'

export const ForgotPasswordPage = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const { handleSubmit, isLoading } = useFormSubmit(
    async (data: ForgotPasswordFormValues) => {
      await authService.sendPasswordReset(data.email)
    },
    PATHS.auth.login
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className='grid gap-4'>
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='email'
          name='email'
          placeholder='Email'
          autoComplete='email'
          autoFocus
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading
            ? <SpinnerGapIcon weight='bold' className='animate-spin' />
            : <PaperPlaneTiltIcon weight='bold' />}
          {isLoading
            ? 'Sending...'
            : 'Send reset email'}
        </Button>
      </form>
    </Form>
  )
}
