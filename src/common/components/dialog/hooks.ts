// src/shared/components/dialog/hooks.ts

import { useContext } from 'react'

import {
  DialogContext,
  type DialogOptions
} from '@/common/components/dialog'

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider')
  }
  return context
}

export const useConfirmDialog = () => {
  const { openDialog } = useDialog()

  return {
    confirm: (options: Omit<DialogOptions, 'type' | 'alertType'>) =>
      openDialog({ ...options, type: 'alert', alertType: 'info' }),
    confirmDanger: (options: Omit<DialogOptions, 'type' | 'alertType'>) =>
      openDialog({ ...options, type: 'alert', alertType: 'error' }),
    confirmWarning: (options: Omit<DialogOptions, 'type' | 'alertType'>) =>
      openDialog({ ...options, type: 'alert', alertType: 'warning' }),
    openCustomDialog: (options: Omit<DialogOptions, 'type'>) =>
      openDialog({ ...options, type: 'dialog' }),
  }
}
