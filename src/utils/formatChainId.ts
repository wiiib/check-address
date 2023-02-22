import type { Optional } from '@voire/type-utils'

export const formatChainId = (id: number | string) => {
  const intId: Optional<number> = +id
    ? +id
    : undefined // NaN, 0 etc

  if (!intId || intId < 1) {
    throw new Error(`Invalid ID! The string "${id}" cannot be interpreted as a chain ID`)
  }

  const hexId = intId ? `0x${intId.toString(16)}` : undefined

  return {
    intId,
    hexId,
  }
}
