import type { HexString } from '../hex'

export type HexAddress = HexString

// NOTE: TLD used to be just `.eth` or `.test`
// but since ENS collaborated with DNS, it may be any domain, e.g. `.xyz` etc
type TopLevelDomain = string

export type EnsAddress = `${string}.${TopLevelDomain}`
export type Address = HexAddress | EnsAddress
