import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'

export const ivLength = 16

/**
 * Decrypts encrypted data using AES-GCM.
 *
 * @example
 * ```ts twoslash
 * import { AesGcm, Hex } from 'ox'
 *
 * const key = await AesGcm.getKey({ password: 'qwerty' })
 * const secret = Hex.fromString('i am a secret message')
 *
 * const encrypted = await AesGcm.encrypt(secret, key)
 *
 * const decrypted = await AesGcm.decrypt(encrypted, key) // [!code focus]
 * // @log: Hex.fromString('i am a secret message')
 * ```
 *
 * @param value - The data to encrypt.
 * @param key - The `CryptoKey` to use for encryption.
 * @param options - Decryption options.
 * @returns The decrypted data.
 */
export async function decrypt<
  value extends Hex.Hex | Bytes.Bytes,
  as extends 'Hex' | 'Bytes' =
    | (value extends Hex.Hex ? 'Hex' : never)
    | (value extends Bytes.Bytes ? 'Bytes' : never),
>(
  value: value | Bytes.Bytes | Hex.Hex,
  key: CryptoKey,
  options: decrypt.Options<as> = {},
): Promise<decrypt.ReturnType<as>> {
  const { as = typeof value === 'string' ? 'Hex' : 'Bytes' } = options
  const encrypted = Bytes.from(value)
  const iv = encrypted.slice(0, ivLength)
  const data = encrypted.slice(ivLength)
  const decrypted = await globalThis.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    Bytes.from(data),
  )
  const result = new Uint8Array(decrypted)
  if (as === 'Bytes') return result as never
  return Hex.from(result) as never
}

export declare namespace decrypt {
  type Options<as extends 'Bytes' | 'Hex' = 'Bytes' | 'Hex'> = {
    /** The output format. @default 'Bytes' */
    as?: as | 'Bytes' | 'Hex' | undefined
  }

  type ReturnType<as extends 'Bytes' | 'Hex' = 'Bytes' | 'Hex'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Bytes.from.ErrorType
    | Hex.from.ErrorType
    | Errors.GlobalErrorType
}

decrypt.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as decrypt.ErrorType

/**
 * Encrypts data using AES-GCM.
 *
 * @example
 * ```ts twoslash
 * import { AesGcm, Hex } from 'ox'
 *
 * const key = await AesGcm.getKey({ password: 'qwerty' })
 * const secret = Hex.fromString('i am a secret message')
 *
 * const encrypted = await AesGcm.encrypt(secret, key) // [!code focus]
 * // @log: '0x5e257b25bcf53d5431e54e5a68ca0138306d31bb6154f35a97bb8ea18111e7d82bcf619d3c76c4650688bc5310eed80b8fc86d1e3e'
 * ```
 *
 * @param value - The data to encrypt.
 * @param key - The `CryptoKey` to use for encryption.
 * @param options - Encryption options.
 * @returns The encrypted data.
 */
export async function encrypt<
  value extends Hex.Hex | Bytes.Bytes,
  as extends 'Bytes' | 'Hex' =
    | (value extends Hex.Hex ? 'Hex' : never)
    | (value extends Bytes.Bytes ? 'Bytes' : never),
>(
  value: value | Bytes.Bytes | Hex.Hex,
  key: CryptoKey,
  options: encrypt.Options<as> = {},
): Promise<encrypt.ReturnType<as>> {
  const { as = typeof value === 'string' ? 'Hex' : 'Bytes' } = options
  const iv = Bytes.random(ivLength)
  const encrypted = await globalThis.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    Bytes.from(value),
  )
  const result = Bytes.concat(iv, new Uint8Array(encrypted))
  if (as === 'Bytes') return result as never
  return Hex.from(result) as never
}

export declare namespace encrypt {
  type Options<as extends 'Bytes' | 'Hex' = 'Bytes' | 'Hex'> = {
    /** The output format. @default 'Hex' */
    as?: as | 'Bytes' | 'Hex' | undefined
  }

  type ReturnType<as extends 'Bytes' | 'Hex' = 'Bytes' | 'Hex'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Bytes.concat.ErrorType
    | Bytes.from.ErrorType
    | Bytes.random.ErrorType
    | Hex.from.ErrorType
    | Errors.GlobalErrorType
}

encrypt.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as encrypt.ErrorType

/**
 * Derives an AES-GCM key from a password using PBKDF2.
 *
 * @example
 * ```ts twoslash
 * import { AesGcm } from 'ox'
 *
 * const key = await AesGcm.getKey({ password: 'qwerty' })
 * // @log: CryptoKey {}
 * ```
 *
 * @param options - Options for key derivation.
 * @returns The derived key.
 */
export async function getKey(options: getKey.Options): Promise<CryptoKey> {
  const { iterations = 900_000, password, salt = randomSalt(32) } = options
  const baseKey = await globalThis.crypto.subtle.importKey(
    'raw',
    Bytes.fromString(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  )
  const key = await globalThis.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
  return key
}

export declare namespace getKey {
  type Options = {
    /** The number of iterations to use. @default 900_000 */
    iterations?: number | undefined
    /** Password to derive key from. */
    password: string
    /** Salt to use for key derivation. @default `AesGcm.randomSalt(32)` */
    salt?: Bytes.Bytes | undefined
  }

  type ErrorType = Errors.GlobalErrorType
}

getKey.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getKey.ErrorType

/**
 * Generates a random salt of the specified size.
 *
 * @example
 * ```ts twoslash
 * import { AesGcm } from 'ox'
 *
 * const salt = AesGcm.randomSalt()
 * // @log: Uint8Array [123, 79, 183, 167, 163, 136, 136, 16, 168, 126, 13, 165, 170, 166, 136, 136, 16, 168, 126, 13, 165, 170, 166, 136, 136, 16, 168, 126, 13, 165, 170, 166]
 * ```
 *
 * @param size - The size of the salt to generate. Defaults to `32`.
 * @returns A random salt of the specified size.
 */
export function randomSalt(size = 32): Bytes.Bytes {
  return Bytes.random(size)
}

export declare namespace randomSalt {
  type ErrorType = Bytes.random.ErrorType | Errors.GlobalErrorType
}

Bytes.random.parseError = (error) =>
  /* v8 ignore next */
  error as randomSalt.ErrorType
