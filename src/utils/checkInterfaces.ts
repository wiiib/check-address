import type { Nullable } from '@voire/type-utils'
import { Contract } from 'ethers'
import { ERC165Abi, ERC20Abi, WHITE_ADDRESS } from '../consts'
import type { Address, ContractInterface, IJsonRpcProvider } from '../models'
import { ContractInterfaceId, ContractType } from '../models'
import { checkCode } from './checkCode'

type InterfacesMap = Record<`is${ContractInterface}`, boolean>

export type CheckInterfacesReturnType = InterfacesMap & {
  isContract: boolean
  type: Nullable<ContractType>
}

export const checkInterfaces = async (
  address: Nullable<Address>,
  provider: Nullable<IJsonRpcProvider>,
): Promise<CheckInterfacesReturnType> => {
  const { isContract } = await checkCode(address, provider)

  let interfaces: InterfacesMap = {
    isIERC165: false,
    isIERC721: false,
    isIERC721Metadata: false,
    isIERC1155: false,
    isIERC1155MetadataURI: false,
    isIERC20: false,
  }

  if (isContract && provider && address) {
    // It's a contract!
    try {
      // Let's check if the contract supports ERC-165
      // @see https://eips.ethereum.org/EIPS/eip-165#how-to-detect-if-a-contract-implements-erc-165
      const maybeErc165Contract = new Contract(address, ERC165Abi, provider)

      // Check if it's actually ERC-165
      const isIERC165 = await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC165)
      if (isIERC165) {
        interfaces.isIERC165 = true

        // Check if it's also other interfaces with the `supportsInterface` method
        interfaces = {
          ...interfaces,
          isIERC721: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC721),
          isIERC721Metadata: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC721Metadata),
          isIERC1155: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC1155),
          isIERC1155MetadataURI: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC1155MetadataURI),

          // In case it's unusual ERC-20 and implements IERC-165 as well
          isIERC20: await maybeErc165Contract.supportsInterface(ContractInterfaceId.IERC20),
        }
      }
    } catch (e) {
      // So, it's not ERC-721 or ERC-1155, and not necessarily even ERC-165
      // But there's still a chance that is's an ERC20 contract
      const maybeErc20Contract = new Contract(address, ERC20Abi, provider)

      // Check if it has essential ERC-20 method
      try {
        // TODO: Use more explicit check
        await maybeErc20Contract.balanceOf(WHITE_ADDRESS)

        // No errors thrown, so the contract is probably ERC-20
        interfaces = {
          ...interfaces,
          isIERC20: true,
        }
      } catch (e) {}
    }
  }

  const type = (() => {
    switch (true) {
      case interfaces.isIERC721:
        return ContractType.ERC721
      case interfaces.isIERC1155:
        return ContractType.ERC1155
      case interfaces.isIERC20:
        return ContractType.ERC20
      default:
        return null
    }
  })()

  return {
    type,
    isContract,

    ...interfaces,
  }
}
