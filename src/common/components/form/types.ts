// src/shared/components/form/types.ts

import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface InputProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  type: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
  autoFocus?: boolean
  label?: string
}
