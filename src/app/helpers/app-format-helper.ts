// src/lib/app/helpers/app-format.helper.ts

export const appFormatDate = (date: Date, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long', month: 'long', day: '2-digit'
  }).format(date)
}

export const appFormatTime = (date: Date, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', hour12: false
  }).format(date)
}
