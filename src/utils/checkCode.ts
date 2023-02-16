import type { Nullable } from '@voire/type-utils'
import type { HexString, IJsonRpcProvider } from '../models'

export const checkCode = async (
  address: Nullable<HexString>,
  provider: Nullable<IJsonRpcProvider>,
) => {
  const code = address && provider
    ? await provider.getCode(address)
    : null

  // It is a smart contract (i.e. a token), if the address stores some code
  // Otherwise it's just a regular address
  const isContract = code && code.length > 0 && code !== '0x'

  return {
    code,
    isContract,
  }
}

export type CheckCodeReturnType = ReturnType<typeof checkCode>
