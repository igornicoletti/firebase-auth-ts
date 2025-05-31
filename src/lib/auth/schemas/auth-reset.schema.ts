// src/lib/auth/schemas/auth-reset.schema.ts

import { z } from 'zod'

/**
 * Zod schema for the reset password form.
 * Defines validation rules for the new password and confirm new password fields.
 * Includes a refinement to ensure that the new password and its confirmation match.
 */
export const authResetSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmNewPassword: z
      .string()
      .min(1, 'Confirm new password is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

// export type AuthReset = z.infer<typeof authResetSchema>
