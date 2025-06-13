// src/common/components/ToastProvider.tsx

import { Toaster } from '@/shadcn/ui/sonner'
import type { ReactNode } from 'react'
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" duration={5000} />
    </>
  )
}
