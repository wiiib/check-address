import type { Optional } from '@voire/type-utils'
import type { ChainID } from '../models'

export const formatChainId = (id: ChainID) => {
  const intId: Optional<number> = +id
    ? +id
    : undefined // NaN, 0 etc

  if (!intId || intId < 1) {
    throw new TypeError(`Invalid ID! The string "${id}" cannot be interpreted as a chain ID`)
  }

  const hexId = intId ? `0x${intId.toString(16)}` : undefined

  return {
    intId,
    hexId,
  }
}
