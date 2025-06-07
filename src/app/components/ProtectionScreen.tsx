// src/components/ProtectionScreen/ProtectionScreen.tsx
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Componentes Shadcn/UI
import { AuthInputForm } from '@/auth/components/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import {
  Form
} from '@/shadcn/ui/form'

type ProtectionScreenValues = {
  onUnlock: (password: string) => void
  isLoading?: boolean
  error?: string
  userName?: string
  avatarSrc?: string
}

const screenLockSchema = z.object({
  password: z
    .string()
    .min(1, 'Password authentication didn’t work. Please try again.'),
})

type ScreenLock = z.infer<typeof screenLockSchema>

export const ProtectionScreen = ({ onUnlock, isLoading, avatarSrc, userName }: ProtectionScreenValues) => {
  // 2. Inicializar o React Hook Form com o resolver Zod
  const form = useForm<ScreenLock>({
    resolver: zodResolver(screenLockSchema),
    defaultValues: {
      password: '',
    },
  })

  // 3. Função de submissão do formulário
  const handleUnlock = (values: ScreenLock) => {
    onUnlock(values.password)
  }

  return (
    <div className="fixed grid place-items-center inset-0 bg-background/25 backdrop-blur z-[9999]">
      <div className='w-full max-w-sm'>
        <div className='grid text-center gap-6'>

          <Avatar className='size-24 mx-auto'>
            <AvatarImage src={avatarSrc} />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>

          <h2 className='font-bold text-xl'>{userName}</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUnlock)}
              autoComplete='on'
              className='grid gap-4'>
              <AuthInputForm
                control={form.control}
                disabled={isLoading}
                type='password'
                name='password'
                placeholder='Password'
                autoComplete='current-password'
              />
              <Button
                disabled={isLoading}
                type='submit'
                variant='secondary'>
                {isLoading ? 'Unlocking..' : 'Unlock'}
                <ButtonHighlight />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
