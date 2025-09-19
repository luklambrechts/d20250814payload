import type { Theme } from './types'

export const themeLocalStorageKey = 'payload-theme'

export const defaultTheme = 'light'

export const getImplicitPreference = (): Theme | null => {
  // Dark mode deactivated - always return light theme
  return 'light'

  // Original code preserved but commented out:
  // const mediaQuery = '(prefers-color-scheme: dark)'
  // const mql = window.matchMedia(mediaQuery)
  // const hasImplicitPreference = typeof mql.matches === 'boolean'

  // if (hasImplicitPreference) {
  //   return mql.matches ? 'dark' : 'light'
  // }

  // return null
}
