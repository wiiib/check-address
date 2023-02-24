import type { Nullable } from '@voire/type-utils'
import type { Address, Erc20Metadata, IJsonRpcProvider } from '../models'
import { ERC20Abi } from '../consts'
import { callWithFallback, getMetadataByGetter } from './internal'
import { checkInterfaces } from './checkInterfaces'

export const getErc20Metadata = async (
  address: Nullable<Address>,
  provider: Nullable<IJsonRpcProvider>,
) => {
  const { isIERC20 } = await checkInterfaces(address, provider)
  if (!isIERC20) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC20 interface!')
  }

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
