// src/lib/auth/components/form/auth-input-form.tsx

import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type AuthInputFormProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  type: string
  placeholder?: string
  disabled?: boolean
}

export const AuthInputForm = <T extends FieldValues>({ name, control, type, placeholder, disabled }: AuthInputFormProps<T>) => {
  const [visible, setVisible] = useState<boolean>(false)

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
              />
              {isPassword && (
                <Button
                  size='icon'
                  type='button'
                  variant='ghost'
                  onClick={() => setVisible((prev) => !prev)}
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  className='absolute top-0 right-0 text-muted-foreground hover:bg-transparent'>
                  {visible ? <EyeClosed /> : <Eye />}
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
