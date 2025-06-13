// src/shared/components/dialog/DialogProvider.tsx

import {
  createContext,
  useCallback,
  useRef,
  useState,
  type ReactNode
} from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shadcn/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shadcn/ui/dialog'

import { getAlertProps } from '@/common/components/dialog/helpers'
import type {
  DialogContextValue,
  DialogOptions
} from '@/common/components/dialog/types'

export const DialogContext = createContext<DialogContextValue | undefined>(undefined)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<DialogOptions | null>(null)
  const optionsRef = useRef<DialogOptions | null>(null)

  const openDialog = useCallback((opts: DialogOptions) => {
    setOptions(opts)
    optionsRef.current = opts
    setOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setOpen(false)
    setLoading(false)
    setOptions(null)
    optionsRef.current = null
  }, [])

  const handleAction = async (type: 'confirm' | 'cancel') => {
    const fn =
      type === 'confirm'
        ? optionsRef.current?.onConfirm
        : optionsRef.current?.onCancel

    if (!fn) {
      closeDialog()
      return
    }

    try {
      setLoading(true)
      await fn()
    } finally {
      closeDialog()
    }
  }

  const renderDialog = () => {
    if (!options) return null

    if (options.type === 'alert') {
      const alertProps = getAlertProps(options.alertType)

      return (
        <AlertDialog
          open={open}
          onOpenChange={(isOpen) => {
            if (!isOpen && !loading) closeDialog()
          }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className={alertProps.titleClassName}>
                {options.title}
              </AlertDialogTitle>
              {/* CORREÇÃO AQUI para AlertDialogDescription: SEMPRE renderize, conteúdo opcional */}
              <AlertDialogDescription>
                {options.description || ''}
              </AlertDialogDescription>
            </AlertDialogHeader>
            {options.content}
            <AlertDialogFooter>
              {options.showCancel !== false && (
                <AlertDialogCancel
                  onClick={() => handleAction('cancel')}
                  disabled={loading}>
                  {options.cancelText || 'Cancelar'}
                </AlertDialogCancel>
              )}
              <AlertDialogAction
                onClick={() => handleAction('confirm')}
                disabled={loading}
                className={alertProps.confirmVariant}>
                {loading ? 'Carregando...' : options.confirmText || 'OK'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }

    return (
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && !loading) closeDialog()
        }}>
        <DialogContent>
          {/* CORREÇÃO AQUI para DialogHeader e DialogDescription */}
          {/* Renderiza o Header se houver título OU descrição para acessibilidade */}
          {(options.title || options.description) && (
            <DialogHeader className='sm:text-center'>
              {options.title && <DialogTitle>{options.title}</DialogTitle>}
              {/* SEMPRE renderize DialogDescription, conteúdo opcional */}
              <DialogDescription>
                {options.description || ''}
              </DialogDescription>
            </DialogHeader>
          )}
          {options.content}
          {options.footer && (
            <DialogFooter>
              {options.footer({
                confirm: () => handleAction('confirm'),
                cancel: () => handleAction('cancel'),
                loading,
              })}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {renderDialog()}
    </DialogContext.Provider>
  )
}
