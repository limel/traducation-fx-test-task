import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { CounterResultProps } from './CounterResult.types'

function CounterResult(props: CounterResultProps) {
  const { count, actionType } = props

  console.log(actionType)
  const variants = {
    increment: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    },
    decrement: {
      scale: [1, 0.8, 1],
      transition: { duration: 0.3 }
    },
    default: {
      scale: 1
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={count}
        variants={variants}
        initial="default"
        animate={actionType}
        exit="default"
        className="text-dark dark:text-light absolute top-1/2 left-1/2 block -translate-1/2 text-[160px] lg:text-[200px]">
        {count}
      </motion.span>
    </AnimatePresence>
  )
}

export default React.memo(CounterResult)
