import { Contract } from 'ethers'
import type { MaybePromise, Nullable } from '@voire/type-utils'
import { ofetch } from 'ofetch'
import type { Address, IJsonRpcProvider } from '../../models'
import { resolveIpfs } from '../resolveIPFS'

export interface TokenMetadataReturnType<
  TMetadata extends Record<string, any> = Record<string, any>,
> {
  metadata: Nullable<TMetadata>
}

export const getTokenMetadataByGetter = async <
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: Address,
  provider: IJsonRpcProvider,
  tokenId: string | number,
  abi: any,
  uriGetter: (contract: Contract, tokenId: string) => MaybePromise<Nullable<string>>,
  abortSignal?: AbortSignal,
): Promise<TokenMetadataReturnType<TMetadata>> => {
  const contract = new Contract(address, abi, provider)

  if (tokenId) {
    const tokenUri = await uriGetter(contract, tokenId.toString())

    if (tokenUri) {
      const httpUri = resolveIpfs(tokenUri)
      const tokenUriResponse = await ofetch<TMetadata>(httpUri, {
        signal: abortSignal,
      })
      return {
        metadata: resolveIpfs(tokenUriResponse) ?? null,
      }
    }
  }

  return {
    metadata: null,
  }
}
