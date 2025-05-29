// src/lib/auth/schemas/auth-forgot.schema.ts

import { z } from 'zod'

export const authForgotSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address'),
})
