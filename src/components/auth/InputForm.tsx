// src/components/auth/InputForm.tsx

import { useState } from 'react'
import type { FieldValues } from 'react-hook-form'

import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'

import { Button, FormControl, FormField, FormItem, FormMessage, Input } from '@/components/ui'

import type { InputFormProps } from '@/types'

export const InputForm = <T extends FieldValues>({ name, control, type, placeholder, disabled, autoComplete, autoFocus }: InputFormProps<T>) => {
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
                autoComplete={autoComplete}
                autoFocus={autoFocus}
              />
              {isPassword && (
                <Button
                  size='icon'
                  type='button'
                  variant='ghost'
                  className='absolute top-0 right-0'
                  onClick={() => setVisible((prev) => !prev)}
                  aria-label={visible ? 'Hide password' : 'Show password'}>
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
