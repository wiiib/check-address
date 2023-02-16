import { describe, expect, test } from 'vitest'
import { JsonRpcProvider } from '../models'
import {
  ethereumAccountAddresses,
  ethereumErc1155Addresses,
  ethereumErc20Addresses,
  ethereumErc721Addresses,
} from '../test'
import { checkCode } from './checkCode'

describe('checkCode', () => {
  // Auto-imported by vite
  // @see https://vitejs.dev/guide/env-and-mode.html#env-files
  const INFURA_PROJECT_ID = process.env.VITE_INFURA_PROJECT_ID

  const provider = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
    1,
  )

  test('should detect ERC-20 contract address', async () => {
    const { isContract } = await checkCode(ethereumErc20Addresses[0], provider)
    expect(isContract).toBe(true)
  })

  test('should detect ERC-721 contract address', async () => {
    const { isContract } = await checkCode(ethereumErc721Addresses[0], provider)
    expect(isContract).toBe(true)
  })

  test('should detect ERC-1155 contract address', async () => {
    const { isContract } = await checkCode(ethereumErc1155Addresses[0], provider)
    expect(isContract).toBe(true)
  })

  test('should not detect just a regular address', async () => {
    const { isContract } = await checkCode(ethereumAccountAddresses[0], provider)
    expect(isContract).toBe(false)
  })
})
