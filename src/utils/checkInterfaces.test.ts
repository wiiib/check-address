import { describe, expect, test } from 'vitest'
import { ContractType } from '../models'
import {
  ethereumAccountAddresses,
  ethereumErc1155Addresses,
  ethereumErc20Addresses,
  ethereumErc721Addresses,
  getTestProvider,
} from '../test'
import type { CheckInterfacesReturnType } from './checkInterfaces'
import { checkInterfaces } from './checkInterfaces'

describe('checkInterfaces', () => {
  const provider = getTestProvider()

  test('should detect correct interfaces for ERC-20 contract address', async () => {
    const results = await checkInterfaces(ethereumErc20Addresses[0], provider)
    expect(results).toMatchObject<CheckInterfacesReturnType>({
      isIERC165: false,
      isIERC721: false,
      isIERC721Metadata: false,
      isIERC1155: false,
      isIERC1155MetadataURI: false,
      isIERC20: true,
      isContract: true,
      type: ContractType.ERC20,
    })
  })

  test('should detect correct interfaces for ERC-721 contract address', async () => {
    const results = await checkInterfaces(ethereumErc721Addresses[0], provider)
    expect(results).toMatchObject<CheckInterfacesReturnType>({
      isIERC165: true,
      isIERC721: true,
      isIERC721Metadata: true,
      isIERC1155: false,
      isIERC1155MetadataURI: false,
      isIERC20: false,
      isContract: true,
      type: ContractType.ERC721,
    })
  })

  test('should detect correct interfaces for ERC-1155 contract address', async () => {
    const results = await checkInterfaces(ethereumErc1155Addresses[0], provider)
    expect(results).toMatchObject<CheckInterfacesReturnType>({
      isIERC165: true,
      isIERC721: false,
      isIERC721Metadata: false,
      isIERC1155: true,
      isIERC1155MetadataURI: true,
      isIERC20: false,
      isContract: true,
      type: ContractType.ERC1155,
    })
  })

  test('should detect no interfaces for a regular address', async () => {
    const results = await checkInterfaces(ethereumAccountAddresses[0], provider)
    expect(results).toMatchObject<CheckInterfacesReturnType>({
      isIERC165: false,
      isIERC721: false,
      isIERC721Metadata: false,
      isIERC1155: false,
      isIERC1155MetadataURI: false,
      isIERC20: false,
      isContract: false,
      type: null,
    })
  })
}, { timeout: 10_000 })
