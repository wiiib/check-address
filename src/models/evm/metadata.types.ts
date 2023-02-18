import type { Nullable } from '@voire/type-utils'

export interface Erc20Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
  decimals: Nullable<number>
}

export interface Erc721Metadata {
  name: Nullable<string>
  symbol: Nullable<string>
}
