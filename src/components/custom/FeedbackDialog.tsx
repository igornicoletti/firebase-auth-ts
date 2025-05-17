import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type FeedbackDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children?: React.ReactNode
}

export const FeedbackDialog = ({ open, onOpenChange, title, description, children }: FeedbackDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-center'>{title}</DialogTitle>
          <DialogDescription className='text-center'>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
