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
    const altIpfsHash = 'aaasarsxteg5vlpaz2wlhcvucetaa7z7v1zzvwadnp4nva'
    const altIpfsLink = `ipfs://${altIpfsHash}`

    const ipfsGatewayResolvedObject = resolveIpfs({
      uri1: ipfsLink,
      uri2: altIpfsLink,
      nested: {
        uri: altIpfsLink,
      },
    })

    expect(ipfsGatewayResolvedObject).toMatchObject({
      uri1: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      uri2: `https://gateway.pinata.cloud/ipfs/${altIpfsHash}`,
      nested: {
        uri: `https://gateway.pinata.cloud/ipfs/${altIpfsHash}`,
      },
    })
  })

  test('should work with arrays', () => {
    const ipfsGatewayResolvedObject = resolveIpfs([
      ipfsLink,
      'A regular value',
      42,
    ])

    expect(ipfsGatewayResolvedObject).toMatchObject([
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      'A regular value',
      42,
    ])
  })

  test('should work with mixed values', () => {
    const ipfsGatewayResolvedObject = resolveIpfs([
      ipfsLink,
      [
        {},
        ipfsLink,
        3,
      ],
      [],
      {
        test: ipfsLink,
      },
      42,
    ])

    expect(ipfsGatewayResolvedObject).toMatchObject([
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      [
        {},
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
        3,
      ],
      [],
      {
        test: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      },
      42,
    ])
  })
})
