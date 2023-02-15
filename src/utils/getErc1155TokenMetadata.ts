import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC1155MetadataAbi } from '../consts'
import { callWithFallback } from './internal'
import { getTokenMetadata } from './getTokenMetadata'

export function getErc1155TokenMetadata(
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
) {
  return getTokenMetadata(
    address,
    provider,
    tokenId,
    IERC1155MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.uri(id)),
  )
}
