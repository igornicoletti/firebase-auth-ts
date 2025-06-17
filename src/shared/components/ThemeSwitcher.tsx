// src/shared/components/ThemeSwitcher.tsx

import { Moon, Sun } from '@phosphor-icons/react'

import { Button, ButtonHighlight } from '@/shadcn/ui/button'
import { useTheme } from '@/shared/hooks'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button variant='secondary' size='icon' onClick={toggleTheme}>
      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
      <ButtonHighlight />
    </Button>
  )
}
