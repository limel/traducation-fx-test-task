import { MAX_LIMIT, MIN_LIMIT } from 'constants'

import Counter from 'components/Counter'
import ThemeSwitcher from 'components/ThemeSwitcher'

function App() {
  return (
    <>
      <ThemeSwitcher />
      <Counter maxLimit={MAX_LIMIT} minLimit={MIN_LIMIT} />
    </>
  )
}

export default App
