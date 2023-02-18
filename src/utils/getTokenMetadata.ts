import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC1155MetadataAbi, IERC721MetadataAbi } from '../consts'
import { callWithFallback, getTokenMetadataByGetter } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getTokenMetadata = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
) => {
  const {
    isIERC721Metadata,
    isIERC1155MetadataURI,
  } = await checkInterfaces(address, provider)

  if (isIERC721Metadata) {
    return getTokenMetadataByGetter(
      address,
      provider,
      tokenId,
      IERC721MetadataAbi,
      (contract, id) => callWithFallback<string>(() => contract.tokenURI(id)),
    )
  }

  if (isIERC1155MetadataURI) {
    return getTokenMetadataByGetter(
      address,
      provider,
      tokenId,
      IERC1155MetadataAbi,
      (contract, id) => callWithFallback<string>(() => contract.uri(id)),
    )
  }

  return null
}
