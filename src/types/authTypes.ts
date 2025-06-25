// src/types/authTypes.ts

import { z } from 'zod'

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import type { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from '@/schemas'

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export interface InputFormProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  type: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
  autoFocus?: boolean
  label?: string
}
