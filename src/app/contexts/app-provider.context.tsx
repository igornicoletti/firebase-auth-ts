// src/lib/app/contexts/app-provider.context.tsx

import type { ReactNode } from 'react'

import { Toaster } from '@/shadcn/ui/sonner'

import { DialogProvider, ThemeProvider } from '@/app/contexts'

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
    <DialogProvider>
      {children}
      <Toaster />
    </DialogProvider>
  </ThemeProvider>
)
