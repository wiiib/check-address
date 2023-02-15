import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { getTokenMetadata } from '../utils'
import { IERC721MetadataAbi } from '../consts'
import { callWithFallback } from './internal'

export const getErc721TokenMetadata = (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
) => {
  return getTokenMetadata(
    address,
    provider,
    tokenId,
    IERC721MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.tokenURI(id)),
  )
}
