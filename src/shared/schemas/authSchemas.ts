// src/shared/schemas/authSchemas.ts

import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .min(1, 'Email is required.'),
  password: z
    .string()
    .min(1, 'Password is required.'),
})

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .min(1, 'Email is required.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password needs a number, lowercase, and uppercase letter.'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password.'),
  displayName: z
    .string()
    .trim()
    .min(2, 'Username must be at least 2 characters.')
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don’t match. Please check and try again.',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .min(1, 'Email is required.'),
})

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password needs a number, lowercase, and uppercase letter.'
    ),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords don’t match. Please check and try again.',
  path: ['confirmPassword'],
})

export type LoginData = z.infer<typeof loginSchema>
export type RegisterData = z.infer<typeof registerSchema>
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>
