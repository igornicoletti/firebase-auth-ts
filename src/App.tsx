import { RouterProvider } from 'react-router-dom'

import { AuthProvider, ThemeProvider } from '@/contexts'
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
