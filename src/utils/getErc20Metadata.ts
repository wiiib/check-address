import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'
import { ERC20Abi } from '../consts'
import { callWithFallback } from './internal'
import { getMetadata } from './getMetadata'

interface Erc20Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
  decimals: Nullable<number>
}

export const getErc20Metadata = (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
) => {
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
