import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/contexts/auth/AuthContext'
import { DialogProvider } from '@/contexts/dialog/DialogContext'
import { ThemeProvider } from '@/contexts/theme/ThemeProvider'
import { router } from '@/router'
import { RouterProvider } from 'react-router-dom'

export const App = () => {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <AuthProvider>
        <DialogProvider>
          <RouterProvider router={router} />
          <Toaster closeButton />
        </DialogProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
