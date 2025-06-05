// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { DialogProvider, ThemeProvider } from '@/lib/app/providers'
import { AuthProvider } from '@/lib/auth/contexts'
import { router } from '@/router'

export const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <DialogProvider>
          <RouterProvider router={router} />
          <Toaster />
        </DialogProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
