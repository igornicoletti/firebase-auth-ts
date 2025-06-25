// src/components/common/ThemeSwitcher.tsx

import { MoonIcon, SunIcon } from '@phosphor-icons/react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks'

export const ThemeSwitcher = ({ ...props }: React.ComponentProps<typeof Button>) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <Button size='icon' onClick={toggleTheme} {...props}>
      <SunIcon className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
      <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
