import React, { useState, useCallback } from 'react'

import { AnimatePresence, motion } from 'motion/react'

import cn from 'clsx'
import { formatDistanceToNow } from 'date-fns'
import { useClickOutside } from 'hooks'

import { StoryProps, StoryItem } from './Story.types'

function Story(props: StoryProps) {
  const { history } = props
  const [isOpen, setIsOpen] = useState(false)
  const historyRef = useClickOutside<HTMLUListElement>(() => {
    setIsOpen(false)
  })

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="relative">
      <button
        aria-label="Toggle history"
        aria-disabled={false}
        className={cn(
          'flex items-center justify-center gap-1.5 rounded-[60px] py-3 pr-3 pl-9',
          'dark:bg-light bg-dark',
          'mt-4 cursor-pointer',
          'dark:text-dark text-light',
          'transition-all duration-300 ease-in-out'
        )}
        onClick={handleClick}>
        <span className="text-base">Story</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={cn(isOpen && 'rotate-180', 'transition-transform duration-300 ease-in-out')}>
          <path
            d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
            data-name="16"
            fill="currentColor"
            opacity="1"
          />
        </svg>
      </button>

      {
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              ref={historyRef}
              initial={{ opacity: 0, scale: 0.95, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={cn(
                'bg-grey dark:bg-dark-grey',
                'absolute top-full left-1/2 -translate-x-1/2 translate-y-4',
                'rounded-lg p-2 drop-shadow-md dark:shadow-none',
                'z-10'
              )}>
              {history.map((item: StoryItem, index: number) => (
                <li key={item.action + index} className="flex min-w-[270px] items-center justify-between p-2">
                  <span className="text-dark dark:text-light text-sm">{item.action}</span>
                  <span className="text-light-grey text-xs">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      }
    </div>
  )
}

export default React.memo(Story)
