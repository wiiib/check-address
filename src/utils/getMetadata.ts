import type { Nullable } from '@voire/type-utils'
import type { Erc20Metadata, Erc721Metadata, HexString, IJsonRpcProvider } from '../models'
import { ERC20Abi, IERC721MetadataAbi } from '../consts'
import { callWithFallback, getMetadataByGetter } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getMetadata = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
) => {
  const {
    isIERC721Metadata,
    isIERC20,
  } = await checkInterfaces(address, provider)

  if (isIERC721Metadata) {
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

  if (isIERC20) {
    return getMetadataByGetter<Erc20Metadata>(
      address,
      provider,
      ERC20Abi,
      async (contract) => ({
        name: await callWithFallback<string>(contract.name),
        symbol: await callWithFallback<string>(contract.symbol),
        decimals: await callWithFallback<number>(contract.decimals),
      }),
    )
  }

  return null
}
