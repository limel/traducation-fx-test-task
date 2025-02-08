import { ReactNode } from 'react'

export interface ControlButtonProps {
  onClick: () => void
  children: ReactNode
  disabled?: boolean
  className?: string
}
