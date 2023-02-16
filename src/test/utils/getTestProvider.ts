import type { ChainID } from '../../models'
import { JsonRpcProvider } from '../../models'

export const getTestProvider = (domain = 'mainnet', chainId: ChainID = 1) => {
  // Auto-imported by vite
  // @see https://vitejs.dev/guide/env-and-mode.html#env-files
  const INFURA_PROJECT_ID = process.env.VITE_INFURA_PROJECT_ID

  return new JsonRpcProvider(
    `https://${domain}.infura.io/v3/${INFURA_PROJECT_ID}`,
    +chainId,
  )
}
