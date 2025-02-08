import { Theme } from 'hooks/types'

export interface ButtonProps {
  selectedTheme: Theme
  themeForToggle: Theme
  updateTheme: (newTheme: Theme) => void
}
