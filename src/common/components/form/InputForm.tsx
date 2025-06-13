// src/common/components/form/InputForm.tsx

import { useState } from 'react'
import type { FieldValues } from 'react-hook-form'

import { Eye, EyeSlash } from '@phosphor-icons/react'

import { Button } from '@/shadcn/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/shadcn/ui/form'
import { Input } from '@/shadcn/ui/input'

import type { InputProps } from '@/common/components/form'

export const InputForm = <T extends FieldValues>({
  name,
  control,
  type,
  placeholder,
  disabled,
  autoComplete,
  autoFocus,
}: InputProps<T>) => {
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
                  onClick={() => setVisible((prev) => !prev)}
                  aria-label={visible ? 'Hide password' : 'Show password'}
                  className='absolute top-0 right-0 text-muted-foreground hover:bg-transparent'>
                  {visible ? <EyeSlash /> : <Eye />}
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
