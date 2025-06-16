// src/shared/hooks/useTheme.ts

import { useContext } from 'react'

import { ThemeProviderContext } from '@/shared/contexts'

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
