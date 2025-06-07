// src/auth/schemas/auth-forgot.schema.ts

import { z } from 'zod'

export const authForgotSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address')
    .min(1, 'Email is required'),
})

// export type AuthForgot = z.infer<typeof authForgotSchema>
