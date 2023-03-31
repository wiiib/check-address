import type { Address, IJsonRpcProvider } from '../models'
import { IERC721MetadataAbi } from '../consts'
import { callWithFallback, getTokenMetadataByGetter } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getErc721TokenMetadata = async (
  address: Address,
  provider: IJsonRpcProvider,
  tokenId: string | number,
  abortSignal?: AbortSignal,
) => {
  const { isIERC721Metadata } = await checkInterfaces(address, provider)
  if (!isIERC721Metadata) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC721Metadata interface!')
  }

  return getTokenMetadataByGetter(
    address,
    provider,
    tokenId,
    IERC721MetadataAbi,
    (contract, id) => callWithFallback<string>(() => contract.tokenURI(id)),
    abortSignal,
  )
}
