import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type DialogProviderProps = {
  title?: string
  description?: string
  content?: ReactNode
  footer?: (handlers: {
    confirm: () => void
    cancel: () => void
    loading: boolean
  }) => ReactNode
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

type DialogProviderState = {
  openDialog: (options: DialogProviderProps) => void
  closeDialog: () => void
}

const DialogProviderContext = createContext<DialogProviderState | undefined>(undefined)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState<DialogProviderProps>({})
  const optionsRef = useRef<DialogProviderProps>({})

  const openDialog = (opts: DialogProviderProps) => {
    setOptions(opts)
    optionsRef.current = opts
    setOpen(true)
  }

  const closeDialog = () => {
    setOpen(false)
    setLoading(false)
  }

  const handleAction = async (type: 'confirm' | 'cancel') => {
    const fn = type === 'confirm'
      ? optionsRef.current.onConfirm
      : optionsRef.current.onCancel

    if (!fn) return closeDialog()

    try {
      setLoading(true)
      await fn()

    } finally {
      closeDialog()
    }
  }

  return (
    <DialogProviderContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen && !loading) closeDialog()
        }}>
        <DialogContent>
          {options.title && (
            <DialogHeader>
              <DialogTitle>{options.title}</DialogTitle>
              {options.description && (
                <DialogDescription>{options.description}</DialogDescription>
              )}
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
    </DialogProviderContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogProviderContext)

  if (context === undefined)
    throw new Error('useDialog must be used within a DialogProvider')

  return context
}
