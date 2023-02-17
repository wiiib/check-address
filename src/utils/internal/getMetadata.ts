import type { MaybePromise, Nullable } from '@voire/type-utils'
import { Contract } from 'ethers'
import type { HexString, IJsonRpcProvider } from '../../models'

export const getMetadata = async <
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  abi: Nullable<any>,
  getter: (contract: Contract) => MaybePromise<TMetadata>,
  defaultMetadata: TMetadata,
) => {
  const contract = new Contract(address, abi, provider)

  if (contract) {
    try {
      return {
        metadata: await getter(contract),
      }
    } catch (e) {}
  } else {
    return {
      metadata: defaultMetadata,
    }
  }
}
