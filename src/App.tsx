// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components/ui/sonner'

import { ThemeProvider } from '@/contexts/theme'
import { AuthProvider, DialogProvider } from '@/lib/auth/contexts'
import { router } from '@/router'

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DialogProvider>
          <RouterProvider router={router} />
          <Toaster position='top-right' />
        </DialogProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
