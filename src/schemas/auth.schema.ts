import { z } from 'zod'

// Reusable schema definitions
const email = z
  .string()
  .trim()
  .email('Please enter a valid email address.')
  .min(1, 'Email is required.')

const password = z
  .string()
  .min(6, 'Password must be at least 6 characters.')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password needs a number, lowercase, and uppercase letter.')

const passwordRequired = z
  .string()
  .min(1, 'Password is required.')

const confirmPassword = z
  .string()
  .min(1, 'Please confirm your password.')

const displayName = z
  .string()
  .trim()
  .min(2, 'Username must be at least 2 characters.')
  .optional()

// Form-specific schemas using the reusable definitions
export const loginSchema = z.object({
  email,
  password: passwordRequired, // Using the less strict password for login
})

export const registerSchema = z
  .object({
    email,
    password, // Using the strict password for registration
    confirmPassword,
    displayName,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don’t match. Please check and try again.',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email
})

export const resetPasswordSchema = z
  .object({
    password, // Using the strict password for reset
    confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don’t match. Please check and try again.',
    path: ['confirmPassword'],
  })

// Type inferences
export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
