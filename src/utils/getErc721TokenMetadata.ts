import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC721MetadataAbi } from '../consts'
import { callWithFallback, getTokenMetadata } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getErc721TokenMetadata = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
) => {
  const { isIERC721Metadata } = await checkInterfaces(address, provider)
  if (!isIERC721Metadata) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC721Metadata interface!')
  }

  return getTokenMetadata(
    address,
    provider,
    tokenId,
    IERC721MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.tokenURI(id)),
  )
}
