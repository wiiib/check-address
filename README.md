# @wiiib/check-evm-address

Utils for getting web3 contracts' data and checking whether they belong to certain standards.

![Cover](.github/cover.png)

---

## Contracts and interfaces

### `checkCode`
Check if there's a contract on the provided address
```ts
await checkCode(address, yourJsonRpcProvider)
// > { code: '0x...', isContract: true }
```
> #### Returns
> - `code`: **string** - code that belongs to the address
> - `isContract`: **boolean** - if a contract belongs to the address (i.e. if it has any code)


### `checkInterfaces`
Check if the contract on the provided address implements certain interfaces.
```ts
await checkInterfaces(addresses, yourJsonRpcProvider)
// > { isIERC165: true, isIERC721: false, ... }
```
> #### Returns
> - `isIERC165`, `isIERC721`, `isIERC721Metadata`, `isIERC1155`, `isIERC1155MetadataURI`, `isIERC20` - **boolean** flags if the contract implements the corresponding interface (**false** as a fallback if no contract belongs to the address)
> - `isContract`: **boolean** - if a contract belongs to the address
> - `type`: **ERC1155 | ERC721 | ERC20 | null** - summarized type / standard of the contract determined by the returns above


## Metadata utils

### Contracts

#### `getErc20Metadata`
Returns metadata of the erc20 contract.
```ts
await getErc20Metadata(address, yourJsonRpcProvider)
// > { metadata: { name: string, symbol: string, decimals: string } }
```
Throws an error if there's no erc20 contract on the address.


#### `getErc721Metadata`
Returns metadata of the erc721 contract.
```ts
await getErc721Metadata(address, yourJsonRpcProvider)
// > { metadata: { name: string, symbol: string } }
```
Throws an error if there's no erc721 contract on the address.


#### `getMetadata`
Returns metadata of the contract, if applicable.
```ts
await getMetadata(address, yourJsonRpcProvider)
// > { metadata: { name: string, symbol: string } }
```
Returns **null** if there's no suitable contract on the address.


### Tokens

#### `getErc721TokenMetadata`
Returns metadata of the erc721 token by the contract's `tokenURI` method.
```ts
await getErc721TokenMetadata(address, yourJsonRpcProvider, tokenId)
// > { metadata: { ... } }
```
Throws an error if there's no erc721 contract on the address.
Returns **null** if `tokenId` is invalid / doesn't exist or there's no `uri` for this tokenID.


#### `getErc1155TokenMetadata`
Returns metadata of the erc1155 token by the contract's `uri` method.
```ts
await getErc1155TokenMetadata(address, yourJsonRpcProvider, tokenId)
// > { metadata: { ... } }
```
Throws an error if there's no erc1155 contract on the address.
Returns **null** if `tokenId` is invalid / doesn't exist or there's no `uri` for this tokenID.


#### `getTokenMetadata`
Returns metadata of the token, if applicable.
```ts
await getTokenMetadata(address, yourJsonRpcProvider, tokenId)
// > { metadata: { ... } }
```
Returns **null** if there's no suitable contract on the address, `tokenId` is invalid / doesn't exist or there's no `uri` for this tokenID.


> **Note**
> You can pass `abortSignal` as the additional 4th argument in each of the [token metadata methods](#tokens) above, and call it whenever you want to abort the pending metadata request.
> ```ts
> const abortController = new AbortController()
> getTokenMetadata(address, provider, tokenId, abortController.signal).then(/* ... */)
> // ...
> abortController.abort()
> ```


## IPFS resolvers

### `resolveIpfsString`
Resolves `ipfs://` link into `https` URL with provided gateway.

```ts
resolveIpfsString('ipfs://...SOME_HASH...')
// > https://gateway.pinata.cloud/ipfs/...SOME_HASH...
```

Default resolver uses [pinata gateway](https://app.pinata.cloud/gateway), but you can easily provide your own:
```ts
const customResolver = (link) => `https://your-gateway.io/${link.replace(/^ipfs:\/\//, '')}`
resolveIpfsString('ipfs://...SOME_HASH...', customResolver)
// > https://your-gateway.io/...SOME_HASH...
```

### `resolveIpfs`
This method accepts any value and tries to resolve all the IPFS links recursively.
```ts
resolveIpfs([{ uri: 'ipfs://...SOME_HASH...' }, 'nothing', 42])
// > [{ uri: 'https://gateway.pinata.cloud/ipfs/...SOME_HASH...' }, 'nothing', 42]
```

For string inputs, it works just like [`resolveIpfsString`](#resolveIpfsString).
For inputs that aren't strings nor objects nor arrays, the input value will be returned.

Custom resolvers are allowed as well:
```ts
resolveIpfs([{ uri: 'ipfs://...SOME_HASH...' }, 'nothing', 42], {
  resolver: (link) => `https://your-gateway.io/${link.replace(/^ipfs:\/\//, '')}`,
})
// > [{ uri: 'https://your-gateway.io/...SOME_HASH...' }, 'nothing', 42]
```

## Additional helpers

### `formatChainId`
Format ChainID to hex and int formats.

```ts
formatChainId('0x5') // a hex string
// > { hexId: '0x5', intId: 5 }

formatChainId(137) // a number
// > { hexId: '0x89', intId: 137 }

formatChainId(0x38) // a number
// > { hexId: '0x38', intId: 56 }

formatChainId('1') // a stringified number
// > { hexId: '0x1', intId: 1 }
```
> #### Returns
> - `hexId`: **string** - hex-string formatted ID
> - `intId`: **number** - decimal-int formatted ID

Throws an error if `NaN` or a not-positive number is provided.
