import { useEffect, useState } from 'react'

export const Loading = () => {
  const [dots, setDots] = useState<string>('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''))
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='min-h-screen grid place-items-center px-4 py-6'>
      <span className='text-sm text-muted-foreground'>
        L O A D I N G {dots}
      </span>
    </div>
  )
}
