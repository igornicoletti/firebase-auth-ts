// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from '@/common'
import { AuthProvider } from '@/features'
import { router } from '@/router'
import { Toaster } from '@/shadcn/ui/sonner'

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" duration={5000} />
      </AuthProvider>
    </ThemeProvider>
  )
}
