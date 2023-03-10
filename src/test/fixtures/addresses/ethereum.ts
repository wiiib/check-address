import type { Address, HexAddress } from '../../../models'

export const ethereumEnsAccountAddresses: Address[] = [
  'paradigm.eth',
]

export const ethereumAccountAddresses: HexAddress[] = [
  // Just some account's address
  '0xBA4128162B58e511a40DB166517FC6Cbdd54B098',
]

export const ethereumErc20Addresses: HexAddress[] = [
  // USDC ERC20 Token
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',

  // USDT ERC20 Token (Tether)
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
]

export const ethereumErc721Addresses: HexAddress[] = [
  // TheMerge ERC721 (metadata on IPFS!)
  '0xE42caD6fC883877A76A26A16ed92444ab177E306',

  // Cool Cats FC ERC721
  '0xad27c6Ef1C2E37A78514a9e54f5C35a8BF51601D',
]

export const ethereumErc1155Addresses: HexAddress[] = [
  // OKXFootballCup ERC1155
  '0x5c891d76584b46bC7F1E700169a76569Bb77d2Db',
]

export const ethereumNftAddresses: HexAddress[] = [
  ...ethereumErc721Addresses,
  ...ethereumErc1155Addresses,
]
