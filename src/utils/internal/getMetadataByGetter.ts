import type { MaybePromise, Nullable } from '@voire/type-utils'
import { Contract } from 'ethers'
import type { Address, IJsonRpcProvider } from '../../models'

export const getMetadataByGetter = async <
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: Nullable<Address>,
  provider: Nullable<IJsonRpcProvider>,
  abi: Nullable<any>,
  getter: (contract: Contract) => MaybePromise<TMetadata>,
) => {
  const contract = new Contract(address, abi, provider)
  return {
    metadata: await getter(contract),
  }
}
