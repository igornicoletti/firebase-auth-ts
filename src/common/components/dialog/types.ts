// src/shared/components/dialog/types.ts

import type { ReactNode } from 'react'

export type DialogType = 'dialog' | 'alert'
export type AlertType = 'info' | 'warning' | 'error' | 'success'

export type BaseDialogOptions = {
  title?: string
  description?: string
  content?: ReactNode
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export type CustomDialogOptions = BaseDialogOptions & {
  type: 'dialog'
  footer?: (handlers: {
    confirm: () => void
    cancel: () => void
    loading: boolean
  }) => ReactNode
}

export type AlertDialogOptions = BaseDialogOptions & {
  type: 'alert'
  alertType?: AlertType
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
}

export type DialogOptions = CustomDialogOptions | AlertDialogOptions

export type DialogContextValue = {
  openDialog: (options: DialogOptions) => void
  closeDialog: () => void
}
