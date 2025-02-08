import React, { useState, useEffect, useCallback, useMemo } from 'react'

import {
  INITIAL_COUNT,
  INITIAL_STEP,
  MAX_HISTORY_ENTRIES,
  LOCAL_STORAGE_COUNT_KEY,
  LOCAL_STORAGE_HISTORY_KEY,
  DECREMENT_ACTION_TYPE,
  INCREMENT_ACTION_TYPE,
  DEFAULT_ACTION_TYPE
} from 'constants'
import { isNil } from 'lodash'

import ControlButton from 'components/Counter/ControlButton'
import { CounterProps } from 'components/Counter/Counter.types'
import CounterResult from 'components/Counter/CounterResult'
import { CounterResultProps } from 'components/Counter/CounterResult/CounterResult.types'
import CounterStep from 'components/Counter/CounterStep'
import ResetButton from 'components/Counter/ResetButton'
import Story from 'components/Counter/Story'
import { StoryItem } from 'components/Counter/Story/Story.types'

const _initCounter = () => {
  const count = localStorage.getItem(LOCAL_STORAGE_COUNT_KEY)
  return count ? parseInt(count) : INITIAL_COUNT
}

const _initHistory = (): StoryItem[] => {
  const history = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY)
  return history ? JSON.parse(history) : []
}

function Counter({ maxLimit, minLimit }: CounterProps) {
  const [count, setCount] = useState(_initCounter)
  const [step, setStep] = useState(INITIAL_STEP)
  const [actionType, setActionType] = useState<CounterResultProps['actionType']>(DEFAULT_ACTION_TYPE)
  const [history, setHistory] = useState<StoryItem[]>(_initHistory)

  const canIncrement = useMemo(() => isNil(maxLimit) || count + step <= maxLimit, [count, step, maxLimit])

  const canDecrement = useMemo(() => isNil(minLimit) || count - step >= minLimit, [count, step, minLimit])

  const addActionToHistory = useCallback((storyItem: StoryItem) => {
    setHistory((prev) => [{ ...storyItem }, ...prev].slice(0, MAX_HISTORY_ENTRIES))
  }, [])

  const increment = useCallback(() => {
    if (canIncrement) {
      const newCount = count + step
      setCount(newCount)
      setActionType(INCREMENT_ACTION_TYPE)
      addActionToHistory({ action: `Incremented by ${step}`, timestamp: Date.now() })
    }
  }, [canIncrement, count, step, addActionToHistory])

  const decrement = useCallback(() => {
    if (canDecrement) {
      const newCount = count - step
      setCount(newCount)
      setActionType(DECREMENT_ACTION_TYPE)
      addActionToHistory({ action: `Decremented by ${step}`, timestamp: Date.now() })
    }
  }, [canDecrement, count, step, addActionToHistory])

  const handleReset = useCallback(() => {
    setCount(0)
    addActionToHistory({ action: 'Reset', timestamp: Date.now() })
  }, [addActionToHistory])

  const handleStepChange = useCallback((value: number) => {
    setStep(value)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_COUNT_KEY, count.toString())
  }, [count])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(history))
  }, [history])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Story history={history} />
      <div className="mx-auto mt-auto flex flex-col items-center space-y-4">
        <div className="relative flex min-h-[192px] items-center justify-between lg:min-h-[300px] lg:w-[700px]">
          <ControlButton
            onClick={decrement}
            disabled={!canDecrement}
            aria-label="Decrease count"
            className="fixed bottom-14 left-4 lg:static"
            aria-disabled={!canDecrement}>
            <svg width="24" height="24">
              <use href="./sprite.svg#minus" />
            </svg>
          </ControlButton>
          <CounterResult count={count} actionType={actionType} step={step} />
          <ControlButton
            onClick={increment}
            disabled={!canIncrement}
            aria-label="Increase count"
            aria-disabled={!canIncrement}
            className="fixed right-4 bottom-14 ml-auto lg:static">
            <svg width="24" height="24">
              <use href="./sprite.svg#plus" />
            </svg>
          </ControlButton>
        </div>
        <CounterStep step={step} aria-label="Reset counter" aria-disabled={false} handleStepChange={handleStepChange} />
      </div>
      <ResetButton onClick={handleReset} />
    </div>
  )
}

export default React.memo(Counter)
