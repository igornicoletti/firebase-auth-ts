// src/shared/components/dialog/helpers.ts

import type { AlertType } from '@/common/components/dialog/types'

export const getAlertProps = (alertType: AlertType = 'info') => {
  switch (alertType) {
    case 'error':
      return {
        titleClassName: 'text-destructive',
        confirmVariant: 'destructive' as const
      }
    case 'warning':
      return {
        titleClassName: 'text-yellow-600',
        confirmVariant: 'destructive' as const
      }
    case 'success':
      return {
        titleClassName: 'text-green-600',
        confirmVariant: 'default' as const
      }
    default:
      return {
        titleClassName: 'text-primary',
        confirmVariant: 'default' as const
      }
  }
}
