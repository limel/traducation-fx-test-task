import React from 'react'

import cn from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { usePressedState } from 'hooks'

import { ControlButtonProps } from './ControlButton.types'

function ControlButton(props: ControlButtonProps) {
  const { onClick, children, disabled, className } = props
  const { isPressed, handleKeyDown, handleKeyUp } = usePressedState()

  return (
    <AnimatePresence>
      {!disabled && (
        <motion.button
          {...props}
          onClick={onClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'bg-light dark:bg-dark text-dark dark:text-light',
            'border-dark dark:border-light border-1',
            'h-16 w-16 cursor-pointer place-items-center rounded-full lg:h-20 lg:w-20',
            'transition-all duration-300 ease-in-out active:scale-90',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
            isPressed && 'scale-90',
            className && className
          )}>
          {children}
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default React.memo(ControlButton)
