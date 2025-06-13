// src/common/components/ToastProvider.tsx

import type { ReactNode } from 'react'

import { Toaster } from '@/shadcn/ui/sonner'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" duration={5000} />
    </>
  )
}
