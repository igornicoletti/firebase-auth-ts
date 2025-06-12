// src/common/components/ToastProvider.tsx

import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <Toaster position="top-right" duration={5000} />
    </>
  )
}
