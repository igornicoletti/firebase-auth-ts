// src/components/CurrentDateTime/CurrentDateTime.tsx
import { formatMonthDayYear, formatTime, formatWeekday } from '@/app/helpers'
import React, { useEffect, useState } from 'react'

interface CurrentDateTimeProps {
  // Nenhuma prop necessária por enquanto
}

const CurrentDateTime: React.FC<CurrentDateTimeProps> = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-card text-card-foreground rounded-lg shadow-md max-w-xs mx-auto">
      <div className="mb-2 text-center">
        <p className="text-xl font-semibold text-primary uppercase">{formatWeekday(currentDateTime)}</p>
        <p className="text-lg text-muted-foreground">{formatMonthDayYear(currentDateTime)}</p>
      </div>
      <p className="text-4xl font-bold text-foreground">{formatTime(currentDateTime)}</p>
    </div>
  )
}

export { CurrentDateTime }
