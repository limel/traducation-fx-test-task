import { useState, useEffect, useCallback } from 'react'

import { UseTheme, Theme } from 'hooks/types'

import { DEFAULT_THEME, THEME_STORAGE_KEY, THEME_AUTO, THEME_DARK, THEME_LIGHT } from 'constants'
import { isEqual } from 'lodash'

const _getSystemTheme = (): Theme => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT
}

const _getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null

  if (isEqual(savedTheme, THEME_AUTO)) return _getSystemTheme()

  return savedTheme || _getSystemTheme() || DEFAULT_THEME
}

export const useTheme = (): UseTheme => {
  const [theme, setTheme] = useState<Theme>(_getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const updateTheme = useCallback((newTheme: Theme) => {
    if (isEqual(newTheme, THEME_AUTO)) setTheme(_getSystemTheme())
    else setTheme(newTheme)
  }, [])

  return { theme, updateTheme }
}
