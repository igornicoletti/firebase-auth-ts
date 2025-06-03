// src/lib/auth/components/form/auth-input-form.tsx

import { useState } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

import { Eye, EyeSlash } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type AuthInput<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  type: string
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
}

/**
 * A custom input component for authentication forms, leveraging `react-hook-form`.
 * Supports password visibility toggling.
 * @param {AuthInput<T>} props - The component props.
 * @param {Path<T>} props.name - The name of the input field, used by `react-hook-form`.
 * @param {Control<T>} props.control - The control object from `react-hook-form`.
 * @param {string} props.type - The type of the input field (e.g., 'text', 'email', 'password').
 * @param {string} [props.placeholder] - The placeholder text for the input field.
 * @param {boolean} [props.disabled] - Whether the input field is disabled.
 * @param {string} [props.autoComplete] - The HTML autoComplete value for the input field.
 */
export const AuthInputForm = <T extends FieldValues>({
  name,
  control,
  type,
  placeholder,
  disabled,
  autoComplete
}: AuthInput<T>) => {
  const [visible, setVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                type={inputType}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete} />
              {isPassword && (
                <Button
                  type='button'
                  size='icon'
                  variant='ghost'
                  onClick={() => setVisible((prev) => !prev)}
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  className='absolute top-0 right-0 text-muted-foreground hover:bg-transparent'>
                  {visible ? <EyeSlash /> : <Eye />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className='text-xs text-right font-semibold' />
        </FormItem>
      )}
    />
  )
}
