import type { Address as abitype_Address } from 'abitype'
import * as Bytes from './Bytes.js'
import * as Caches from './Caches.js'
import * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as PublicKey from './PublicKey.js'

const addressRegex = /*#__PURE__*/ /^0x[a-fA-F0-9]{40}$/

/** Root type for Address. */
export type Address = abitype_Address

/**
 * Asserts that the given value is a valid {@link ox#Address.Address}.
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.assert('0xA0Cf798816D4b9b9866b5330EEa46a18382f251e')
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.assert('0xdeadbeef')
 * // @error: InvalidAddressError: Address "0xdeadbeef" is invalid.
 * ```
 *
 * @param value - Value to assert if it is a valid address.
 * @param options - Assertion options.
 */
export function assert(
  value: string,
  options: assert.Options = {},
): asserts value is Address {
  const { strict = true } = options

  if (!addressRegex.test(value))
    throw new InvalidAddressError({
      address: value,
      cause: new InvalidInputError(),
    })

  if (strict) {
    if (value.toLowerCase() === value) return
    if (checksum(value as Address) !== value)
      throw new InvalidAddressError({
        address: value,
        cause: new InvalidChecksumError(),
      })
  }
}

export declare namespace assert {
  type Options = {
    /**
     * Enables strict mode. Whether or not to compare the address against its checksum.
     *
     * @default true
     */
    strict?: boolean | undefined
  }

  type ErrorType = InvalidAddressError | Errors.GlobalErrorType
}

/* v8 ignore next */
assert.parseError = (error: unknown) => error as assert.ErrorType

/**
 * Computes the checksum address for the given {@link ox#Address.Address}.
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.checksum('0xa0cf798816d4b9b9866b5330eea46a18382f251e')
 * // @log: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
 * ```
 *
 * @param address - The address to compute the checksum for.
 * @returns The checksummed address.
 */
export function checksum(address: string): Address {
  if (Caches.checksum.has(address)) return Caches.checksum.get(address)!

  assert(address, { strict: false })

  const hexAddress = address.substring(2).toLowerCase()
  const hash = Hash.keccak256(Bytes.fromString(hexAddress), { as: 'Bytes' })

  const characters = hexAddress.split('')
  for (let i = 0; i < 40; i += 2) {
    if (hash[i >> 1]! >> 4 >= 8 && characters[i]) {
      characters[i] = characters[i]!.toUpperCase()
    }
    if ((hash[i >> 1]! & 0x0f) >= 8 && characters[i + 1]) {
      characters[i + 1] = characters[i + 1]!.toUpperCase()
    }
  }

  const result = `0x${characters.join('')}` as const
  Caches.checksum.set(address, result)
  return result
}

export declare namespace checksum {
  type ErrorType =
    | assert.ErrorType
    | Hash.keccak256.ErrorType
    | Bytes.fromString.ErrorType
    | Errors.GlobalErrorType
}

checksum.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as checksum.ErrorType

/**
 * Converts a stringified address to a typed (checksummed) {@link ox#Address.Address}.
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.from('0xa0cf798816d4b9b9866b5330eea46a18382f251e')
 * // @log: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.from('0xa0cf798816d4b9b9866b5330eea46a18382f251e', {
 *   checksum: false
 * })
 * // @log: '0xa0cf798816d4b9b9866b5330eea46a18382f251e'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.from('hello')
 * // @error: InvalidAddressError: Address "0xa" is invalid.
 * ```
 *
 * @param address - An address string to convert to a typed Address.
 * @param options - Conversion options.
 * @returns The typed Address.
 */
export function from(address: string, options: from.Options = {}): Address {
  const { checksum: checksumVal = false } = options
  assert(address)
  if (checksumVal) return checksum(address)
  return address as Address
}

export declare namespace from {
  type Options = {
    /**
     * Whether to checksum the address.
     *
     * @default false
     */
    checksum?: boolean | undefined
  }

  type ErrorType =
    | assert.ErrorType
    | checksum.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
from.parseError = (error: unknown) => error as from.ErrorType

/**
 * Converts an ECDSA public key to an {@link ox#Address.Address}.
 *
 * @example
 * ```ts twoslash
 * import { Address, PublicKey } from 'ox'
 *
 * const publicKey = PublicKey.from(
 *   '0x048318535b54105d4a7aae60c08fc45f9687181b4fdfc625bd1a753fa7397fed753547f11ca8696646f2f3acb08e31016afac23e630c5d11f59f61fef57b0d2aa5',
 * )
 * const address = Address.fromPublicKey(publicKey)
 * // @log: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
 * ```
 *
 * @param publicKey - The ECDSA public key to convert to an {@link ox#Address.Address}.
 * @param options - Conversion options.
 * @returns The {@link ox#Address.Address} corresponding to the public key.
 */
export function fromPublicKey(
  publicKey: PublicKey.PublicKey,
  options: fromPublicKey.Options = {},
): Address {
  const address = Hash.keccak256(
    `0x${PublicKey.toHex(publicKey).slice(4)}`,
  ).substring(26)
  return from(`0x${address}`, options)
}

export declare namespace fromPublicKey {
  type Options = {
    /**
     * Whether to checksum the address.
     *
     * @default false
     */
    checksum?: boolean | undefined
  }

  type ErrorType =
    | Hash.keccak256.ErrorType
    | PublicKey.toHex.ErrorType
    | Errors.GlobalErrorType
}

fromPublicKey.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromPublicKey.ErrorType

/**
 * Checks if two {@link ox#Address.Address} are equal.
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.isEqual(
 *   '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
 *   '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e'
 * )
 * // @log: true
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.isEqual(
 *   '0xa0cf798816d4b9b9866b5330eea46a18382f251e',
 *   '0xA0Cf798816D4b9b9866b5330EEa46a18382f251f'
 * )
 * // @log: false
 * ```
 *
 * @param addressA - The first address to compare.
 * @param addressB - The second address to compare.
 * @returns Whether the addresses are equal.
 */
export function isEqual(addressA: Address, addressB: Address): boolean {
  assert(addressA, { strict: false })
  assert(addressB, { strict: false })
  return addressA.toLowerCase() === addressB.toLowerCase()
}

export declare namespace isEqual {
  type ErrorType = assert.ErrorType | Errors.GlobalErrorType
}

isEqual.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as isEqual.ErrorType

/**
 * Checks if the given address is a valid {@link ox#Address.Address}.
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.validate('0xA0Cf798816D4b9b9866b5330EEa46a18382f251e')
 * // @log: true
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.validate('0xdeadbeef')
 * // @log: false
 * ```
 *
 * @param address - Value to check if it is a valid address.
 * @param options - Check options.
 * @returns Whether the address is a valid address.
 */
export function validate(
  address: string,
  options: validate.Options = {},
): address is Address {
  const { strict = true } = options ?? {}
  try {
    assert(address, { strict })
    return true
  } catch {
    return false
  }
}

export declare namespace validate {
  type Options = {
    /**
     * Enables strict mode. Whether or not to compare the address against its checksum.
     *
     * @default true
     */
    strict?: boolean | undefined
  }
}

/**
 * Thrown when an address is invalid.
 *
 * @example
 * ```ts twoslash
 * import { Address } from 'ox'
 *
 * Address.from('0x123')
 * // @error: Address.InvalidAddressError: Address `0x123` is invalid.
 * ```
 */
export class InvalidAddressError<
  cause extends InvalidInputError | InvalidChecksumError =
    | InvalidInputError
    | InvalidChecksumError,
> extends Errors.BaseError<cause> {
  override readonly name = 'Address.InvalidAddressError'

  constructor({ address, cause }: { address: string; cause: cause }) {
    super(`Address "${address}" is invalid.`, {
      cause,
    })
  }
}

/** Thrown when an address is not a 20 byte (40 hexadecimal character) value. */
export class InvalidInputError extends Errors.BaseError {
  override readonly name = 'Address.InvalidInputError'

  constructor() {
    super('Address is not a 20 byte (40 hexadecimal character) value.')
  }
}

/** Thrown when an address does not match its checksum counterpart. */
export class InvalidChecksumError extends Errors.BaseError {
  override readonly name = 'Address.InvalidChecksumError'

  constructor() {
    super('Address does not match its checksum counterpart.')
  }
}
