import React, { useState } from 'react'

import { Theme } from 'hooks/types'

import cn from 'clsx'
import { THEMES } from 'constants'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, useClickOutside } from 'hooks'

import Button from './Button'

function ThemeSwitcher() {
  const { theme, updateTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const themeSwitchRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false)
  })

  const menuVariants = {
    hidden: {
      opacity: 0,
      transformOrigin: 'top',
      y: -30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.03
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <div className="fixed top-4 right-4" ref={themeSwitchRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Expand menu"
        className={cn(
          'dark:bg-light bg-dark h-11 w-11 place-items-center rounded-full p-3',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          'cursor-pointer',
          'transition-all duration-300 ease-in-out',
          isOpen && 'rounded-b-none'
        )}>
        <svg width="18" height="18" className="dark:text-dark text-light transition-colors duration-300 ease-in-out">
          <use href={`./sprite.svg#${theme}`} />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="dark:bg-light bg-dark absolute rounded-b-full shadow-lg">
            {THEMES.map((option) => (
              <motion.li key={option} variants={itemVariants} className="mb-1 last:mb-0">
                <Button
                  selectedTheme={theme}
                  themeForToggle={option as Theme}
                  updateTheme={(newTheme) => {
                    updateTheme(newTheme)
                    setIsOpen(false)
                  }}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default React.memo(ThemeSwitcher)
