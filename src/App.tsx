// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { DialogProvider, ThemeProvider } from '@/lib/app/providers'
import { AuthProvider } from '@/lib/auth/contexts'
import { router } from '@/router'

export const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <DialogProvider>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position='top-right' />
        </AuthProvider>
      </DialogProvider>
    </ThemeProvider>
  )
}
