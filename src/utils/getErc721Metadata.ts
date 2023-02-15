import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC721MetadataAbi } from '../consts'
import { callWithFallback } from './internal'
import { getMetadata } from './getMetadata'

interface Erc721Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
}

export const getErc721Metadata = (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
) => {
  return getMetadata<Erc721Metadata>(
    address,
    provider,
    IERC721MetadataAbi,
    async (contract) => ({
      symbol: await callWithFallback<string>(contract.symbol),
      name: await callWithFallback<string>(contract.name),
    }),
    {
      name: null,
      symbol: null,
    },
  )
}
