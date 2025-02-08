import { INCREMENT_ACTION_TYPE, DECREMENT_ACTION_TYPE, DEFAULT_ACTION_TYPE } from 'constants'

export interface CounterResultProps {
  count: number
  step: number
  actionType: typeof INCREMENT_ACTION_TYPE | typeof DECREMENT_ACTION_TYPE | typeof DEFAULT_ACTION_TYPE
}
