import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { ShieldStarIcon, SpinnerGapIcon } from '@phosphor-icons/react'

import { FormInputField } from '@/components/forms'
import { Button, Form } from '@/components/ui'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { PATHS } from '@/routers/paths'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/schemas/auth.schema'
import { authService } from '@/services/auth.service'

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  })
  const { handleSubmit, isLoading } = useFormSubmit(
    async (data: ResetPasswordFormValues) => {
      await authService.confirmUserPasswordReset(oobCode!, data.password)
    },
    PATHS.auth.login,
    () => !!oobCode
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className='grid gap-4'>
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='password'
          placeholder='New password'
          autoComplete='new-password'
          autoFocus
        />
        <FormInputField
          control={form.control}
          disabled={isLoading}
          type='password'
          name='confirmPassword'
          placeholder='Confirm new password'
          autoComplete='new-password'
        />
        <Button disabled={isLoading} type='submit'>
          {isLoading
            ? <SpinnerGapIcon weight='bold' className='animate-spin' />
            : <ShieldStarIcon weight='bold' />}
          {isLoading
            ? 'Resetting...'
            : 'Reset password'}
        </Button>
      </form>
    </Form>
  )
}
