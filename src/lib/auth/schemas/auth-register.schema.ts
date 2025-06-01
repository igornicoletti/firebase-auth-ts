// src/lib/auth/schemas/auth-register.schema.ts

import { z } from 'zod'

/**
 * Zod schema for the registration form.
 * Defines validation rules for username, email, password, and confirm password fields.
 * Includes a refinement to ensure that the password and confirm password fields match.
 */
export const authRegisterSchema = z
  .object({
    username: z.string().trim(),

    email: z
      .string()
      .trim()
      .email('Invalid email address')
      .min(1, 'Email is required'),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// export type AuthRegister = z.infer<typeof authRegisterSchema>
