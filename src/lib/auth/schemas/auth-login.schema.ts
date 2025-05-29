// src/lib/auth/schemas/auth-login.schema.ts

import { z } from 'zod'

export const authLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Min. 6 chars, incl. upper, lower & number')
})
