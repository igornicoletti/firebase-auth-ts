// src/lib/auth/schemas/auth-login.schema.ts

import { z } from 'zod'

/**
 * Zod schema for the login form.
 * Defines validation rules for the email and password input fields.
 */
export const authLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(1, 'Email is required'),

  password: z
    .string()
    .min(1, 'Password is required'),
})

// export type AuthLogin = z.infer<typeof authLoginSchema>
