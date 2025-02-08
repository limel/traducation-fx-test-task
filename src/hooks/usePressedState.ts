import { useState, useCallback, KeyboardEvent } from 'react'

export const usePressedState = () => {
  const [isPressed, setIsPressed] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(true)
    }
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(false)
    }
  }, [])

  return { isPressed, handleKeyDown, handleKeyUp }
}
