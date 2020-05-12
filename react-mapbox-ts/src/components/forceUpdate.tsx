import { useState } from 'react'

const useForceUpdate = () => {
  const forceUpdate = useState(0)[1]
  return () => forceUpdate((x) => x + 1)
}
export default useForceUpdate
