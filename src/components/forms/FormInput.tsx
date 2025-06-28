import { useCallback, useState } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

export interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  type: 'text' | 'email' | 'password' | 'number'
  placeholder?: string
  disabled?: boolean
  autoComplete?: string
  autoFocus?: boolean
  label?: string
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  type,
  placeholder,
  disabled,
  autoComplete,
  autoFocus,
  label,
}: FormInputProps<T>) => {
  const [visible, setVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  const toggleVisibility = useCallback(() => {
    setVisible((v) => !v)
  }, [])

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <label htmlFor={field.name}>{label}</label>}
          <FormControl>
            <div className='relative'>
              <Input
                {...field}
                id={field.name}
                type={inputType}
                disabled={disabled}
                placeholder={placeholder}
                autoComplete={autoComplete}
                autoFocus={autoFocus}
              />
              {isPassword && (
                <Button
                  size='icon'
                  type='button'
                  variant='ghost'
                  className='absolute top-0 right-0'
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  onClick={toggleVisibility}>
                  {visible ? <EyeSlashIcon /> : <EyeIcon />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className='text-xs text-right font-medium' />
        </FormItem>
      )}
    />
  )
}
