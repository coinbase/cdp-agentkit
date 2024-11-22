import { HDKey, type Versions } from '@scure/bip32'
import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import type * as Hex from './Hex.js'
import type * as PublicKey from './PublicKey.js'
import * as internal from './internal/hdKey.js'

/** Root type for a Hierarchical Deterministic (HD) Key. */
export type HdKey = {
  derive: (path: string) => HdKey
  depth: number
  index: number
  identifier: Hex.Hex
  privateKey: Hex.Hex
  privateExtendedKey: string
  publicKey: PublicKey.PublicKey<false>
  publicExtendedKey: string
  versions: Versions
}

/**
 * Creates a HD Key from an extended private key.
 *
 * @example
 * ```ts twoslash
 * import { HdKey } from 'ox'
 *
 * const hdKey = HdKey.fromExtendedKey('...')
 *
 * console.log(hdKey.privateKey)
 * // @log: '0x...'
 * ```
 *
 * @param extendedKey - The extended private key.
 * @returns The HD Key.
 */
export function fromExtendedKey(extendedKey: string): HdKey {
  const key = HDKey.fromExtendedKey(extendedKey)
  return internal.fromScure(key)
}

export declare namespace fromExtendedKey {
  type ErrorType = internal.fromScure.ErrorType | Errors.GlobalErrorType
}

fromExtendedKey.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromExtendedKey.ErrorType

/**
 * Creates a HD Key from a JSON object containing an extended private key (`xpriv`).
 *
 * @example
 * ```ts twoslash
 * import { HdKey } from 'ox'
 *
 * const hdKey = HdKey.fromJson({ xpriv: '...' })
 *
 * console.log(hdKey.privateKey)
 * // @log: '0x...'
 * ```
 *
 * @param json - The JSON object containing an extended private key (`xpriv`).
 * @returns The HD Key.
 */
export function fromJson(json: { xpriv: string }): HdKey {
  return internal.fromScure(HDKey.fromJSON(json))
}

export declare namespace fromJson {
  type ErrorType = internal.fromScure.ErrorType | Errors.GlobalErrorType
}

fromJson.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromJson.ErrorType

/**
 * Creates a HD Key from a master seed.
 *
 * @example
 * ```ts twoslash
 * import { HdKey, Mnemonic } from 'ox'
 *
 * const seed = Mnemonic.toSeed('test test test test test test test test test test test junk')
 * const hdKey = HdKey.fromSeed(seed)
 * ```
 *
 * @example
 * ### Path Derivation
 *
 * You can derive a HD Key at a specific path using `derive`.
 *
 * ```ts twoslash
 * import { HdKey, Mnemonic } from 'ox'
 *
 * const mnemonic = Mnemonic.toSeed('test test test test test test test test test test test junk')
 * const hdKey = HdKey.fromSeed(mnemonic).derive(HdKey.path())
 *
 * console.log(hdKey.privateKey)
 * // @log: '0x...'
 * ```
 *
 * @param seed - The master seed to create the HD Key from.
 * @param options - Creation options.
 * @returns The HD Key.
 */
export function fromSeed(
  seed: Hex.Hex | Bytes.Bytes,
  options: fromSeed.Options = {},
): HdKey {
  const { versions } = options
  const key = HDKey.fromMasterSeed(Bytes.from(seed), versions)
  return internal.fromScure(key)
}

export declare namespace fromSeed {
  type Options = {
    /** The versions to use for the HD Key. */
    versions?: Versions | undefined
  }

  type ErrorType =
    | Bytes.from.ErrorType
    | internal.fromScure.ErrorType
    | Errors.GlobalErrorType
}

fromSeed.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromSeed.ErrorType

/**
 * Creates an Ethereum-based BIP-44 HD path.
 *
 * @example
 * ```ts twoslash
 * import { HdKey } from 'ox'
 *
 * const path = HdKey.path({ account: 1, index: 2 })
 * // @log: "m/44'/60'/1'/0/2"
 * ```
 *
 * @param options - Path options.
 * @returns The path.
 */
export function path(options: path.Options = {}): string {
  const { account = 0, change = 0, index = 0 } = options
  return `m/44'/60'/${account}'/${change}/${index}`
}

export declare namespace path {
  type Options = {
    /**
     * The account.
     * @default 0
     */
    account?: number | undefined
    /**
     * The change.
     * @default 0
     */
    change?: number | undefined
    /**
     * The address index.
     * @default 0
     */
    index?: number | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

/* v8 ignore next */
path.parseError = (error: unknown) => error as path.ErrorType
