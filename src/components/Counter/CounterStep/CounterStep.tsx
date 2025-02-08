import React, { useState, useEffect, useCallback, useRef } from 'react'

import cn from 'clsx'
import { toString, toNumber, clamp, isNaN, get } from 'lodash'

import { CounterStepProps } from './CounterStep.types'

const _getDynamicWidth = (value: string | number, minWidth = 111, maxWidth = 270) => {
  const length = get(toString(value), 'length')
  return clamp(length * 16, minWidth, maxWidth) + 'px'
}

function CounterStep(props: CounterStepProps) {
  const { step, handleStepChange } = props
  const [inputValue, setInputValue] = useState(() => toString(step))
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (!value) {
        setInputValue('')
        handleStepChange(0)
        return
      }

      const parsedValue = toNumber(value)

      if (!isNaN(parsedValue)) {
        setInputValue(toString(parsedValue))
        handleStepChange(parsedValue)
      }
    },
    [handleStepChange]
  )

  useEffect(() => {
    setInputValue(toString(step))
  }, [step])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.width = _getDynamicWidth(inputValue)
    }
  }, [inputValue])

  return (
    <div className="mb-auto flex flex-col items-center space-y-2">
      <label htmlFor="step-input" className="dark:text-grey-secondary text-dark-grey text-base">
        Set count
      </label>
      <input
        type="number"
        value={inputValue}
        ref={inputRef}
        onChange={handleChange}
        aria-labelledby="step-input"
        id="step-input"
        className={cn(
          'dark:bg-input-dark bg-input-light rounded-[60px]',
          'dark:text-light text-dark',
          'px-6 py-3 text-center text-base',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500',
          'transition-width duration-300 ease-in-out'
        )}
      />
    </div>
  )
}

export default React.memo(CounterStep)
