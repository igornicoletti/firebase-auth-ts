// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { Toaster } from '@/components'
import { AuthProvider, ThemeProvider } from '@/contexts'
import { router } from '@/routers'

export const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
