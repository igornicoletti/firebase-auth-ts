// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { AppProvider } from '@/app/contexts'
import { AuthProvider } from '@/auth/contexts'
import { router } from '@/router'

export const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AppProvider>
  )
}
