'use client'

import React, { createContext, useCallback, use, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    // Dark mode deactivated - always force light theme
    const forcedTheme = 'light'
    setThemeState(forcedTheme)
    window.localStorage.setItem(themeLocalStorageKey, forcedTheme)
    document.documentElement.setAttribute('data-theme', forcedTheme)

    // Original code preserved but commented out:
    // if (themeToSet === null) {
    //   window.localStorage.removeItem(themeLocalStorageKey)
    //   const implicitPreference = getImplicitPreference()
    //   document.documentElement.setAttribute('data-theme', implicitPreference || '')
    //   if (implicitPreference) setThemeState(implicitPreference)
    // } else {
    //   setThemeState(themeToSet)
    //   window.localStorage.setItem(themeLocalStorageKey, themeToSet)
    //   document.documentElement.setAttribute('data-theme', themeToSet)
    // }
  }, [])

  useEffect(() => {
    // Dark mode deactivated - always force light theme
    const forcedTheme: Theme = 'light'
    document.documentElement.setAttribute('data-theme', forcedTheme)
    setThemeState(forcedTheme)

    // Original code preserved but commented out:
    // let themeToSet: Theme = defaultTheme
    // const preference = window.localStorage.getItem(themeLocalStorageKey)

    // if (themeIsValid(preference)) {
    //   themeToSet = preference
    // } else {
    //   const implicitPreference = getImplicitPreference()

    //   if (implicitPreference) {
    //     themeToSet = implicitPreference
    //   }
    // }

    // document.documentElement.setAttribute('data-theme', themeToSet)
    // setThemeState(themeToSet)
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}

export const useTheme = (): ThemeContextType => use(ThemeContext)
