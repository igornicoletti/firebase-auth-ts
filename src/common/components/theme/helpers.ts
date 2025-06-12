// src/common/components/theme/helpers.ts

import type { Theme } from '@/common/components/theme'

export const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const applyThemeClass = (theme: Theme) => {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    root.classList.add(getSystemTheme())
  } else {
    root.classList.add(theme)
  }
}
