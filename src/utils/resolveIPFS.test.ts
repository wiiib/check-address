import { describe, expect, test } from 'vitest'
import { resolveIpfs } from './resolveIPFS'

describe('resolveIPFS', () => {
  const ipfsHash = 'qmesarsxteg5vlpaz2wlhcvucetaa7z7v1zzvwadnp4nva'
  const ipfsLink = `ipfs://${ipfsHash}`

  test('should resolve the link to Pinata gateway link as default', () => {
    const ipfsGatewayUri = resolveIpfs(ipfsLink)
    expect(ipfsGatewayUri).toBe(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
  })

  test('should accept custom resolver', () => {
    const ipfsGatewayUri = resolveIpfs(ipfsLink, {
      resolver: (link) => `https://ipfs.io/ipfs/${link.replace(/^ipfs:\/\//, '')}`,
    })
    expect(ipfsGatewayUri).toBe(`https://ipfs.io/ipfs/${ipfsHash}`)
  })

  test('should work for nested objects', () => {
    const ipfsGatewayResolvedObject = resolveIpfs({
      uri: ipfsLink,
    })
    expect(ipfsGatewayResolvedObject).toMatchObject({
      uri: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
    })
  })

  test('should work for multiple occurances', () => {
    const nestedIpfsHash = 'aaasarsxteg5vlpaz2wlhcvucetaa7z7v1zzvwadnp4nva'
    const nestedIpfsLink = `ipfs://${nestedIpfsHash}`

    const ipfsGatewayResolvedObject = resolveIpfs({
      uri: ipfsLink,
      nested: {
        uri: nestedIpfsLink,
      },
    })

    expect(ipfsGatewayResolvedObject).toMatchObject({
      uri: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      nested: {
        uri: `https://gateway.pinata.cloud/ipfs/${nestedIpfsHash}`,
      },
    })
  })
})
