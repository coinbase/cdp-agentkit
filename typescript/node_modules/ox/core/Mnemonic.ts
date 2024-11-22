import {
  generateMnemonic,
  mnemonicToSeedSync,
  validateMnemonic,
} from '@scure/bip39'
import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as HdKey from './HdKey.js'
import type * as Hex from './Hex.js'

export { path } from './HdKey.js'

export {
  english,
  czech,
  french,
  italian,
  japanese,
  korean,
  portuguese,
  simplifiedChinese,
  spanish,
  traditionalChinese,
} from './internal/mnemonic/wordlists.js'

/**
 * Generates a random mnemonic.
 *
 * @example
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.random(Mnemonic.english)
 * // @log: 'buyer zoo end danger ice capable shrug naive twist relief mass bonus'
 * ```
 *
 * @param wordlist - The wordlist to use.
 * @param options - Generation options.
 * @returns The mnemonic.
 */
export function random(
  wordlist: string[],
  options: random.Options = {},
): string {
  const { strength = 128 } = options
  return generateMnemonic(wordlist, strength)
}

export declare namespace random {
  type Options = {
    /**
     * The strength of the mnemonic to generate, in bits.
     * @default 128
     */
    strength?: number | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

random.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as random.ErrorType

/**
 * Converts a mnemonic to a HD Key.
 *
 * @example
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.random(Mnemonic.english)
 * const hdKey = Mnemonic.toHdKey(mnemonic)
 * ```
 *
 * @example
 * ### Path Derivation
 *
 * You can derive a HD Key at a specific path using `derive`:
 *
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.random(Mnemonic.english)
 * const hdKey = Mnemonic.toHdKey(mnemonic).derive(Mnemonic.path({ index: 1 }))
 * ```
 *
 * @param mnemonic - The mnemonic to convert.
 * @param options - Conversion options.
 * @returns The HD Key.
 */
export function toHdKey(
  mnemonic: string,
  options: toHdKey.Options = {},
): HdKey.HdKey {
  const { passphrase } = options
  const seed = toSeed(mnemonic, { passphrase })
  return HdKey.fromSeed(seed)
}

export declare namespace toHdKey {
  type Options = {
    /** An optional passphrase for additional protection to the seed. */
    passphrase?: string | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

toHdKey.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toHdKey.ErrorType

/**
 * Converts a mnemonic to a private key.
 *
 * @example
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.random(Mnemonic.english)
 * const privateKey = Mnemonic.toPrivateKey(mnemonic)
 * // @log: '0x...'
 * ```
 *
 * @example
 * ### Paths
 *
 * You can derive a private key at a specific path using the `path` option.
 *
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.random(Mnemonic.english)
 * const privateKey = Mnemonic.toPrivateKey(mnemonic, {
 *   path: Mnemonic.path({ index: 1 }) // 'm/44'/60'/0'/0/1' // [!code focus]
 * })
 * // @log: '0x...'
 * ```
 *
 * @param mnemonic - The mnemonic to convert.
 * @param options - Conversion options.
 * @returns The private key.
 */
export function toPrivateKey<as extends 'Bytes' | 'Hex' = 'Bytes'>(
  mnemonic: string,
  options: toPrivateKey.Options<as> = {},
): toPrivateKey.ReturnType<as> {
  const { path = HdKey.path(), passphrase } = options
  const hdKey = toHdKey(mnemonic, { passphrase }).derive(path)
  if (options.as === 'Bytes') return Bytes.from(hdKey.privateKey) as never
  return hdKey.privateKey as never
}

export declare namespace toPrivateKey {
  type Options<as extends 'Bytes' | 'Hex' = 'Bytes'> = {
    /** The output format. @default 'Bytes' */
    as?: as | 'Bytes' | 'Hex' | undefined
    /** An optional path to derive the private key from. @default `m/44'/60'/0'/0/0` */
    path?: string | undefined
    /** An optional passphrase for additional protection to the seed. */
    passphrase?: string | undefined
  }

  type ReturnType<as extends 'Bytes' | 'Hex' = 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType = Errors.GlobalErrorType
}

toPrivateKey.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toPrivateKey.ErrorType

/**
 * Converts a mnemonic to a master seed.
 *
 * @example
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.random(Mnemonic.english)
 * const seed = Mnemonic.toSeed(mnemonic)
 * // @log: Uint8Array [...64 bytes]
 * ```
 *
 * @param mnemonic - The mnemonic to convert.
 * @param options - Conversion options.
 * @returns The master seed.
 */
export function toSeed<as extends 'Bytes' | 'Hex' = 'Bytes'>(
  mnemonic: string,
  options: toSeed.Options<as> = {},
): toSeed.ReturnType<as> {
  const { passphrase } = options
  const seed = mnemonicToSeedSync(mnemonic, passphrase)
  if (options.as === 'Hex') return Bytes.toHex(seed) as never
  return seed as never
}

export declare namespace toSeed {
  type Options<as extends 'Bytes' | 'Hex' = 'Bytes'> = {
    /** The output format. @default 'Bytes' */
    as?: as | 'Bytes' | 'Hex' | undefined
    /** An optional passphrase for additional protection to the seed. */
    passphrase?: string | undefined
  }

  type ReturnType<as extends 'Bytes' | 'Hex' = 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType = Errors.GlobalErrorType
}

toSeed.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toSeed.ErrorType

/**
 * Checks if a mnemonic is valid, given a wordlist.
 *
 * @example
 * ```ts twoslash
 * import { Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.validate(
 *   'buyer zoo end danger ice capable shrug naive twist relief mass bonus',
 *   Mnemonic.english
 * )
 * // @log: true
 * ```
 *
 * @param mnemonic - The mnemonic to validate.
 * @param wordlist - The wordlist to use.
 * @returns Whether the mnemonic is valid.
 */
export function validate(mnemonic: string, wordlist: string[]): boolean {
  return validateMnemonic(mnemonic, wordlist)
}

export declare namespace validate {
  type ErrorType = Errors.GlobalErrorType
}

validate.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as validate.ErrorType
