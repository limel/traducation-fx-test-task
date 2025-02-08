export type Theme = 'light' | 'dark' | 'auto'

export interface UseTheme {
  theme: Theme
  updateTheme: (newTheme: Theme) => void
}
