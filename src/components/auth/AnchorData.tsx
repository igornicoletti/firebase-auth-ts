import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

type AnchorDataProps = {
  ask: string
  source: string
  pathname: string
}

export const AnchorData = ({ ask, source, pathname }: AnchorDataProps) => {
  return (
    <p className='text-sm text-muted-foreground text-center'>
      {ask}{' '}
      <Button asChild variant='link' className='p-0 font-semibold'>
        <Link to={pathname}>{source}</Link>
      </Button>
    </p>
  )
}
