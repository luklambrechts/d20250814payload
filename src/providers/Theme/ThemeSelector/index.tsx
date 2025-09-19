'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    // Dark mode deactivated - always force light theme
    setTheme('light')
    setValue('light')

    // Original code preserved but commented out:
    // if (themeToSet === 'auto') {
    //   setTheme(null)
    //   setValue('auto')
    // } else {
    //   setTheme(themeToSet)
    //   setValue(themeToSet)
    // }
  }

  React.useEffect(() => {
    // Dark mode deactivated - always set to light
    setValue('light')

    // Original code preserved but commented out:
    // const preference = window.localStorage.getItem(themeLocalStorageKey)
    // setValue(preference ?? 'auto')
  }, [])

  return (
    <Select onValueChange={onThemeChange} value={value}>
      <SelectTrigger
        aria-label="Select a theme"
        className="w-auto bg-transparent gap-2 pl-0 md:pl-3 border-none"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        {/* Dark mode options deactivated but preserved in comments:
        <SelectItem value="auto">Auto</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        */}
      </SelectContent>
    </Select>
  )
}
