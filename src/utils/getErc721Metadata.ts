import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { IERC721MetadataAbi } from '../consts'
import { callWithFallback, getMetadata } from './internal'
import { checkInterfaces } from './checkInterfaces'

interface Erc721Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
}

export const getErc721Metadata = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
) => {
  const { isIERC721Metadata } = await checkInterfaces(address, provider)
  if (!isIERC721Metadata) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC721Metadata interface!')
  }

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
