import React, { useCallback } from 'react'

import cn from 'clsx'
import { THEME_AUTO } from 'constants'
import { isEqual } from 'lodash'

import { ButtonProps } from './Button.types'

function Button(props: ButtonProps) {
  const { themeForToggle, selectedTheme, updateTheme } = props

  const handleClick = useCallback(() => {
    updateTheme(themeForToggle)
  }, [themeForToggle, updateTheme])

  return (
    <button
      onClick={handleClick}
      aria-label={`Switch to ${themeForToggle} theme`}
      title={`Switch to ${themeForToggle} theme`}
      aria-pressed={isEqual(selectedTheme, themeForToggle)}
      className={cn(
        'h-11 w-11 place-items-center rounded-full p-3',
        'transition-colors duration-300 ease-in-out',
        'cursor-pointer',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isEqual(themeForToggle, THEME_AUTO) ? 'px-1.5' : 'px-3'
      )}>
      {isEqual(themeForToggle, THEME_AUTO) ? (
        <span className="dark:text-dark text-light text-sm transition-colors duration-300 ease-in-out">Auto</span>
      ) : (
        <svg width="24" height="24" className="dark:text-dark text-light transition-colors duration-300 ease-in-out">
          <use href={`./sprite.svg#${themeForToggle}`} />
        </svg>
      )}
    </button>
  )
}

export default React.memo(Button)
