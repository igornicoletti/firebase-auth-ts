import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type DialogProps = {
  title: string
  description: string
  content?: ReactNode
  onClose?: () => void
}

type DialogContextValue = {
  openDialog: (data: DialogProps) => void
  closeDialog: (triggerOnClose?: boolean) => void
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialog, setDialog] = useState<DialogProps | null>(null)
  const lastDialogRef = useRef<DialogProps | null>(null)
  const triggerOnCloseRef = useRef(false)

  const openDialog = (data: DialogProps) => {
    setDialog(data)
    lastDialogRef.current = data
  }

  const closeDialog = (triggerOnClose: boolean = true) => {
    triggerOnCloseRef.current = triggerOnClose
    setDialog(null)
  }

  useEffect(() => {
    if (!dialog && triggerOnCloseRef.current) {
      triggerOnCloseRef.current = false
      lastDialogRef.current?.onClose?.()
    }
  }, [dialog])

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialog && (
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) closeDialog(true)
          }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-center'>{dialog.title}</DialogTitle>
              <DialogDescription className='text-center'>{dialog.description}</DialogDescription>
            </DialogHeader>
            {dialog.content}
          </DialogContent>
        </Dialog>
      )}
    </DialogContext.Provider>
  )
}

export const useDialog = (): DialogContextValue => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('useDialog must be used within an DialogProvider')
  }

  return context
}
