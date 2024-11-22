import { ripemd160 as noble_ripemd160 } from '@noble/hashes/ripemd160'
import { keccak_256 as noble_keccak256 } from '@noble/hashes/sha3'
import { sha256 as noble_sha256 } from '@noble/hashes/sha256'
import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'

/**
 * Calculates the [Keccak256](https://en.wikipedia.org/wiki/SHA-3) hash of a {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
 *
 * This function is a re-export of `keccak_256` from [`@noble/hashes`](https://github.com/paulmillr/noble-hashes), an audited & minimal JS hashing library.
 *
 * @example
 * ```ts twoslash
 * import { Hash } from 'ox'
 *
 * Hash.keccak256('0xdeadbeef')
 * // @log: '0xd4fd4e189132273036449fc9e11198c739161b4c0116a9a2dccdfa1c492006f1'
 * ```
 *
 * @example
 * ### Calculate Hash of a String
 *
 * ```ts twoslash
 * import { Hash, Hex } from 'ox'
 *
 * Hash.keccak256(Hex.fromString('hello world'))
 * // @log: '0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0'
 * ```
 *
 * @example
 * ### Configure Return Type
 *
 * ```ts twoslash
 * import { Hash } from 'ox'
 *
 * Hash.keccak256('0xdeadbeef', { as: 'Bytes' })
 * // @log: Uint8Array [...]
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
 * @param options - Options.
 * @returns Keccak256 hash.
 */
export function keccak256<
  value extends Hex.Hex | Bytes.Bytes,
  as extends 'Hex' | 'Bytes' =
    | (value extends Hex.Hex ? 'Hex' : never)
    | (value extends Bytes.Bytes ? 'Bytes' : never),
>(
  value: value | Hex.Hex | Bytes.Bytes,
  options: keccak256.Options<as> = {},
): keccak256.ReturnType<as> {
  const { as = typeof value === 'string' ? 'Hex' : 'Bytes' } = options
  const bytes = noble_keccak256(Bytes.from(value))
  if (as === 'Bytes') return bytes as never
  return Hex.fromBytes(bytes) as never
}

export declare namespace keccak256 {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> = {
    /** The return type. @default 'Hex' */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Bytes.from.ErrorType
    | Hex.fromBytes.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
keccak256.parseError = (error: unknown) => error as keccak256.ErrorType

/**
 * Calculates the [Ripemd160](https://en.wikipedia.org/wiki/RIPEMD) hash of a {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
 *
 * This function is a re-export of `ripemd160` from [`@noble/hashes`](https://github.com/paulmillr/noble-hashes), an audited & minimal JS hashing library.
 *
 * @example
 * ```ts twoslash
 * import { Hash } from 'ox'
 *
 * Hash.ripemd160('0xdeadbeef')
 * // '0x226821c2f5423e11fe9af68bd285c249db2e4b5a'
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
 * @param options - Options.
 * @returns Ripemd160 hash.
 */
export function ripemd160<
  value extends Hex.Hex | Bytes.Bytes,
  as extends 'Hex' | 'Bytes' =
    | (value extends Hex.Hex ? 'Hex' : never)
    | (value extends Bytes.Bytes ? 'Bytes' : never),
>(
  value: value | Hex.Hex | Bytes.Bytes,
  options: ripemd160.Options<as> = {},
): ripemd160.ReturnType<as> {
  const { as = typeof value === 'string' ? 'Hex' : 'Bytes' } = options
  const bytes = noble_ripemd160(Bytes.from(value))
  if (as === 'Bytes') return bytes as never
  return Hex.fromBytes(bytes) as never
}

export declare namespace ripemd160 {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> = {
    /** The return type. @default 'Hex' */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Bytes.from.ErrorType
    | Hex.fromBytes.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
ripemd160.parseError = (error: unknown) => error as ripemd160.ErrorType

/**
 * Calculates the [Sha256](https://en.wikipedia.org/wiki/SHA-256) hash of a {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
 *
 * This function is a re-export of `sha256` from [`@noble/hashes`](https://github.com/paulmillr/noble-hashes), an audited & minimal JS hashing library.
 *
 * @example
 * ```ts twoslash
 * import { Hash } from 'ox'
 *
 * Hash.sha256('0xdeadbeef')
 * // '0x5f78c33274e43fa9de5659265c1d917e25c03722dcb0b8d27db8d5feaa813953'
 * ```
 *
 * @param value - {@link ox#Bytes.Bytes} or {@link ox#Hex.Hex} value.
 * @param options - Options.
 * @returns Sha256 hash.
 */
export function sha256<
  value extends Hex.Hex | Bytes.Bytes,
  as extends 'Hex' | 'Bytes' =
    | (value extends Hex.Hex ? 'Hex' : never)
    | (value extends Bytes.Bytes ? 'Bytes' : never),
>(
  value: value | Hex.Hex | Bytes.Bytes,
  options: sha256.Options<as> = {},
): sha256.ReturnType<as> {
  const { as = typeof value === 'string' ? 'Hex' : 'Bytes' } = options
  const bytes = noble_sha256(Bytes.from(value))
  if (as === 'Bytes') return bytes as never
  return Hex.fromBytes(bytes) as never
}

export declare namespace sha256 {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex'> = {
    /** The return type. @default 'Hex' */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Bytes.from.ErrorType
    | Hex.fromBytes.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
sha256.parseError = (error: unknown) => error as sha256.ErrorType

/**
 * Checks if a string is a valid hash value.
 *
 * @example
 * ```ts twoslash
 * import { Hash } from 'ox'
 *
 * Hash.validate('0x')
 * // @log: false
 *
 * Hash.validate('0x3ea2f1d0abf3fc66cf29eebb70cbd4e7fe762ef8a09bcc06c8edf641230afec0')
 * // @log: true
 * ```
 *
 * @param value - Value to check.
 * @returns Whether the value is a valid hash.
 */
export function validate(value: string): value is Hex.Hex {
  return Hex.validate(value) && Hex.size(value) === 32
}

export declare namespace validate {
  type ErrorType =
    | Hex.validate.ErrorType
    | Hex.size.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
validate.parseError = (error: unknown) => error as validate.ErrorType
