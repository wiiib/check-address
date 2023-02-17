import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { ERC20Abi } from '../consts'
import { callWithFallback, getMetadata } from './internal'
import { checkInterfaces } from './checkInterfaces'

interface Erc20Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
  decimals: Nullable<number>
}

export const getErc20Metadata = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
) => {
  const { isIERC20 } = await checkInterfaces(address, provider)
  if (!isIERC20) {
    throw new Error('Provided address doesn\'t represent a contract which supports IERC20 interface!')
  }

  return getMetadata<Erc20Metadata>(
    address,
    provider,
    ERC20Abi,
    async (contract) => ({
      name: await callWithFallback<string>(contract.name),
      symbol: await callWithFallback<string>(contract.symbol),
      decimals: await callWithFallback<number>(contract.decimals),
    }),
    {
      name: null,
      symbol: null,
      decimals: null,
    },
  )
}
