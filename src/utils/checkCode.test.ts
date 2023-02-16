import { describe, expect, test } from 'vitest'
import {
  ethereumAccountAddresses,
  ethereumErc1155Addresses,
  ethereumErc20Addresses,
  ethereumErc721Addresses,
  getTestProvider,
} from '../test'
import { checkCode } from './checkCode'

describe.concurrent('checkCode', () => {
  const provider = getTestProvider()

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
