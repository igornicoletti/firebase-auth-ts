import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

type DialogProps = {
  title: string
  description: string
  content?: React.ReactNode
  onClose?: () => void
}

type DialogContextType = {
  openDialog: (data: DialogProps) => void
  closeDialog: (triggerOnClose?: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, setDialog] = useState<DialogProps | null>(null)
  const triggerOnCloseRef = useRef(false)
  const lastDialogRef = useRef<DialogProps | null>(null)

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
      <Dialog open={!!dialog} onOpenChange={(open) => !open && closeDialog(true)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center'>{dialog?.title}</DialogTitle>
            <DialogDescription className='text-center'>{dialog?.description}</DialogDescription>
          </DialogHeader>
          {dialog?.content}
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider')
  }
  return context
}
