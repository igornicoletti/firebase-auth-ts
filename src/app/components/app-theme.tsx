
import { Moon, Sun } from '@phosphor-icons/react'

import { Button } from '@/shadcn/ui/button'

import { useTheme } from '@/app/contexts'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant='ghost' size='icon' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
