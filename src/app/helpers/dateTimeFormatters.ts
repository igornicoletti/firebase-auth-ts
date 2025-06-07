// src/helpers/dateTimeFormatters.ts

// Opções de formatação para as diferentes partes
export const WEEKDAY_FORMAT_OPTIONS_PT_BR: Intl.DateTimeFormatOptions = {
  weekday: 'long',
}

export const MONTH_DAY_YEAR_FORMAT_OPTIONS_PT_BR: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'short',
  day: '2-digit',
}

export const TIME_FORMAT_OPTIONS_PT_BR: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false, // Geralmente usa 24h em pt-BR por padrão
}

/**
 * Formata o dia da semana de uma data no padrão português do Brasil (pt-BR).
 * @param date A data a ser formatada.
 * @returns O dia da semana formatado (ex: "Quinta-feira").
 */
export const formatWeekday = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', WEEKDAY_FORMAT_OPTIONS_PT_BR).format(date)
}

/**
 * Formata mês, dia e ano de uma data no padrão português do Brasil (pt-BR),
 * removendo os "de"s para um formato mais conciso.
 * @param date A data a ser formatada.
 * @returns Mês, dia e ano formatados (ex: "5 junho 2025").
 */
export const formatMonthDayYear = (date: Date): string => {
  const formatted = new Intl.DateTimeFormat('en-US', MONTH_DAY_YEAR_FORMAT_OPTIONS_PT_BR).format(date)
  return formatted.replace(/\sde\s/g, ' ')
}

/**
 * Formata a hora e minuto de uma data no padrão português do Brasil (pt-BR).
 * @param date A data a ser formatada.
 * @returns Hora e minuto formatados (ex: "17:51").
 */
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', TIME_FORMAT_OPTIONS_PT_BR).format(date)
}
