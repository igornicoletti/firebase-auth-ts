// src/common/components/theme/types.ts

import type { ReactNode } from 'react'

export type Theme = 'dark' | 'light' | 'system'

export type ThemeProviderValues = {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
