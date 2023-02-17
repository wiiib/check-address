import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC1155MetadataAbi } from '../consts'
import { callWithFallback, getTokenMetadata } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getErc1155TokenMetadata = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
) => {
  const { isIERC1155MetadataURI } = await checkInterfaces(address, provider)
  if (!isIERC1155MetadataURI) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC1155MetadataURI interface!')
  }

  return getTokenMetadata(
    address,
    provider,
    tokenId,
    IERC1155MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.uri(id)),
  )
}
