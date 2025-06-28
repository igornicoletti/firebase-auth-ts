import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from '@/contexts/AuthProvider'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { router } from '@/routers'

export const App = () => {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='app-theme'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}
