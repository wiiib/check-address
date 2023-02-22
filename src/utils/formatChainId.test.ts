import { describe, expect, test } from 'vitest'
import { formatChainId } from './formatChainId'

describe('formatChainId', () => {
  test('should format IDs correctly when integer IDs are passed (ethereum)', () => {
    const { hexId, intId } = formatChainId(1)
    expect(hexId).toBe('0x1')
    expect(intId).toBe(1)
  })

  test('should format IDs correctly when integer IDs are passed (polygon)', () => {
    const { hexId, intId } = formatChainId(137)
    expect(hexId).toBe('0x89')
    expect(intId).toBe(137)
  })

  test('should format IDs correctly when hex IDs are passed (goerly)', () => {
    const { hexId, intId } = formatChainId('0x5')
    expect(hexId).toBe('0x5')
    expect(intId).toBe(5)
  })

  test('should format IDs correctly when hex IDs are passed (bsc)', () => {
    const { hexId, intId } = formatChainId('0x38')
    expect(hexId).toBe('0x38')
    expect(intId).toBe(56)
  })

  test('should format IDs correctly when a decimal ID is passed as a string', () => {
    const { hexId, intId } = formatChainId('1')
    expect(hexId).toBe('0x1')
    expect(intId).toBe(1)
  })

  test('should throw an exception if an incorrect ID is passed', () => {
    expect(() => formatChainId(0)).toThrowError()
  })

  test('should throw an exception if an incorrect ID is passed', () => {
    expect(() => formatChainId('0xxx')).toThrowError()
  })

  test('should throw an exception if an incorrect ID is passed', () => {
    expect(() => formatChainId(NaN)).toThrowError()
  })

  test('should throw an exception if an incorrect ID is passed', () => {
    expect(() => formatChainId(-1)).toThrowError()
  })
})
