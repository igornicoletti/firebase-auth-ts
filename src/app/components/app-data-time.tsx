import { useEffect, useState } from 'react'

import { appFormatDate, appFormatTime } from '@/app/helpers'

type AppDateTimeValue = {
  locale?: string
}

export const AppDateTime = ({ locale = 'en-US' }: AppDateTimeValue) => {
  const [date, setDate] = useState(() => new Date())

  useEffect(() => {
    const now = new Date()
    const delay = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds())

    const timeout = setTimeout(() => {
      setDate(new Date())
      const interval = setInterval(() => setDate(new Date()), 60000)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <p className="flex gap-2 text-sm text-muted-foreground">
      <span>{appFormatDate(date, locale)}</span>
      <span>{appFormatTime(date, locale)}</span>
    </p>
  )
}
