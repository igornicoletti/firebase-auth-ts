// src/components/CurrentDateTime/CurrentDateTime.tsx
import { formatMonthDayYear, formatTime } from '@/app/helpers'
import { useEffect, useState } from 'react'

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex gap-2 font-bold text-xl">
      <span>{formatMonthDayYear(currentDateTime)}</span>
      <span>{formatTime(currentDateTime)}</span>
    </div>
  )
}

export { CurrentDateTime }
