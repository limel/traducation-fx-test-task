import React from 'react'

import cn from 'clsx'
import { usePressedState } from 'hooks'

import { ResetButtonProps } from './ResetButton.types'

function ResetButton(props: ResetButtonProps) {
  const { onClick } = props
  const { isPressed, handleKeyDown, handleKeyUp } = usePressedState()

  return (
    <button
      {...props}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Reset counter"
      onKeyUp={handleKeyUp}
      className={cn(
        'dark:bg-dark-grey bg-grey text-dark dark:text-light text-base',
        'rounded-[60px] px-8 py-3',
        'cursor-pointer place-items-center',
        'transition-all duration-300 ease-in-out active:scale-90',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'mt-auto mb-14',
        isPressed && 'scale-90'
      )}>
      reset
    </button>
  )
}

export default React.memo(ResetButton)
