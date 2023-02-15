import { Contract } from 'ethers'
import type { MaybePromise, Nullable } from '@voire/type-utils'
import { ofetch } from 'ofetch'
import type { HexString, IJsonRpcProvider } from '../models'
import { resolveIpfs } from './resolveIPFS'

export interface TokenMetadataReturnType<
  TMetadata extends Record<string, any> = Record<string, any>,
> {
  metadata: Nullable<TMetadata>
  onCancel?: () => void
}

export const getTokenMetadata = async <
  TMetadata extends Record<string, any> = Record<string, any>,
>(
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
  tokenId: Nullable<string | number>,
  abi: Nullable<any>,
  uriGetter: (contract: Contract, tokenId: string) => MaybePromise<Nullable<string>>,
): Promise<TokenMetadataReturnType<TMetadata>> => {
  const contract = new Contract(address, abi, provider)

  if (tokenId && contract) {
    try {
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
    } catch (e) {}
  }

  return {
    metadata: null,
  }
}
