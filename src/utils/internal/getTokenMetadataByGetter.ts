import { Contract } from 'ethers'
import type { MaybePromise, Nullable } from '@voire/type-utils'
import { ofetch } from 'ofetch'
import type { Address, IJsonRpcProvider } from '../../models'
import { resolveIpfs } from '../resolveIPFS'

export interface TokenMetadataReturnType<
  TMetadata extends Record<string, any> = Record<string, any>,
> {
  metadata: Nullable<TMetadata>
  onCancel?: () => void
}

export const getTokenMetadataByGetter = async <
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: Nullable<Address>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
  abi: Nullable<any>,
  uriGetter: (contract: Contract, tokenId: string) => MaybePromise<Nullable<string>>,
): Promise<TokenMetadataReturnType<TMetadata>> => {
  const contract = new Contract(address, abi, provider)

  if (tokenId) {
    const tokenUri = await uriGetter(contract, tokenId.toString())

    if (tokenUri) {
      const abortController = new AbortController()

      const httpUri = resolveIpfs(tokenUri)
      const tokenUriResponse = await ofetch<TMetadata>(httpUri, {
        signal: abortController.signal,
      })
      return {
        metadata: resolveIpfs(tokenUriResponse) ?? null,
        onCancel: () => abortController.abort(),
      }
    }
  }

  return {
    metadata: null,
  }
}
