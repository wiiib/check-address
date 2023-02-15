import type { Optional } from '@voire/type-utils'
import type { ChainID } from '../models'

export const formatChainId = (id: ChainID) => {
  let intId: Optional<number>

  if (typeof id === 'number') {
    intId = id
  } else {
    const numericId = +id
    if (isNaN(numericId)) {
      throw new TypeError(`Invalid ID! The value "${id}" cannot be interpreted as a chain ID`)
    } else {
      intId = numericId
    }
  }

  const hexId = intId ? `0x${intId.toString(16)}` : undefined

  return {
    intId,
    hexId,
  }
}
