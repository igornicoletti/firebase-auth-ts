import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed } from '@phosphor-icons/react'
import { useState } from 'react'
import { type Control, type FieldValues, type Path } from 'react-hook-form'

type ControlledInputProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  type: string
  placeholder: string
}

export const ControlledInputForm = <T extends FieldValues>(
  { control, name, type, placeholder }: ControlledInputProps<T>) => {
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
              <Input {...field} type={inputType} placeholder={placeholder} />
              {isPassword && (
                <Button
                  size='icon'
                  type='button'
                  variant='ghost'
                  onClick={() => setVisible((prev) => !prev)}
                  className='absolute top-0 right-0 text-muted-foreground hover:bg-transparent'>
                  {visible ? <EyeClosed /> : <Eye />}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage className='text-xs text-right font-semibold' />
        </FormItem>
      )} />
  )
}
