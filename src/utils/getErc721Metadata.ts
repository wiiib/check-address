import type { Address, Erc721Metadata, IJsonRpcProvider } from '../models'
import { IERC721MetadataAbi } from '../consts'
import { callWithFallback, getMetadataByGetter } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getErc721Metadata = async (
  address: Address,
  provider: IJsonRpcProvider,
) => {
  const { isIERC721Metadata } = await checkInterfaces(address, provider)
  if (!isIERC721Metadata) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC721Metadata interface!')
  }

  return getMetadataByGetter<Erc721Metadata>(
    address,
    provider,
    IERC721MetadataAbi,
    async (contract) => ({
      symbol: await callWithFallback<string>(contract.symbol),
      name: await callWithFallback<string>(contract.name),
    }),
  )
}
