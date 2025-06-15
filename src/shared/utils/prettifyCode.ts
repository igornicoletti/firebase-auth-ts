// src/shared/utils/prettifyCode.ts

export const prettifyCode = (codeKey: string): string => {
  return codeKey
    .replace(/^auth\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
