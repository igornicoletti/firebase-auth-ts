// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from '@/features/auth/contexts'
import { router } from '@/routers'
import { Toaster } from '@/shadcn/ui/sonner'
import { ThemeProvider } from '@/shared/contexts'

export const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position='top-right' duration={5000} />
      </AuthProvider>
    </ThemeProvider>
  )
}
