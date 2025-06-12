// src/App.tsx

import { RouterProvider } from 'react-router-dom'

import { AppProvider } from '@/common/contexts'
import { router } from '@/router'

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}
