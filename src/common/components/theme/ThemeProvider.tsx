// src/common/components/theme/ThemeProvider.tsx

import {
  createContext,
  useEffect,
  useState
} from 'react'

import {
  applyThemeClass,
  type Theme,
  type ThemeProviderState,
  type ThemeProviderValues
} from '@/common/components/theme'

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

export const ThemeContext = createContext<ThemeProviderState>(initialState)

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderValues) => {
  const [theme, setThemeState] = useState<Theme>(() =>
    (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    applyThemeClass(theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme)
    setThemeState(newTheme)
  }

  const value = { theme, setTheme }

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}
