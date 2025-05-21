import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/auth'
import { DialogProvider } from '@/contexts/dialog'
import { ThemeProvider } from '@/contexts/theme'
import { router } from '@/router'
import { RouterProvider } from 'react-router-dom'

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <DialogProvider>
          <RouterProvider router={router} />
          <Toaster />
        </DialogProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
