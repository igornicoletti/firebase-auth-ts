// src/common/components/theme/hooks.ts

import { useContext } from 'react'

import { ThemeContext } from '@/common/components/theme'

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
