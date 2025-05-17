import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { createContext, useContext, useState } from 'react'

type DialogProps = {
  title: string
  description: string
  content?: React.ReactNode
  onClose?: () => void
}

type DialogContextType = {
  openDialog: (data: DialogProps) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, setDialog] = useState<DialogProps | null>(null)

  const openDialog = (data: DialogProps) => {
    setDialog(data)
  }

  const closeDialog = () => {
    if (dialog?.onClose) dialog.onClose()
    setDialog(null)
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog open={!!dialog} onOpenChange={(open) => !open && closeDialog()}>
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
