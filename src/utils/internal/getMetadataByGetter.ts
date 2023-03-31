import type { MaybePromise } from '@voire/type-utils'
import { Contract } from 'ethers'
import type { Address, IJsonRpcProvider } from '../../models'

export interface MetadataReturnType<
  TMetadata extends Record<string, any> = Record<string, any>,
> { metadata: TMetadata }

export const getMetadataByGetter = async <
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: Address,
  provider: IJsonRpcProvider,
  abi: any,
  getter: (contract: Contract) => MaybePromise<TMetadata>,
): Promise<MetadataReturnType<TMetadata>> => {
  const contract = new Contract(address, abi, provider)
  return {
    metadata: await getter(contract),
  }
}
