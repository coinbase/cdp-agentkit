import { numberToBytesBE } from '@noble/curves/abstract/utils'
import type { Hex, PublicKey } from './types.js'
import {
  base64UrlToBytes,
  bytesToBase64Url,
  bytesToCryptoKey,
  bytesToHex,
  cryptoKeyToBytes,
  hexToBytes,
} from './utils.js'

/**
 * Parses a public key into x and y coordinates from the public key
 * defined on the credential.
 */
export async function parseCredentialPublicKey(
  cPublicKey: ArrayBuffer,
): Promise<PublicKey> {
  const base64Url = bytesToBase64Url(new Uint8Array(cPublicKey))
  const bytes = base64UrlToBytes(base64Url)
  const cryptoKey = await bytesToCryptoKey(bytes)
  const publicKey = await cryptoKeyToBytes(cryptoKey)
  return parsePublicKey(publicKey)
}

/**
 * Parses a serialized public key into x and y coordinates.
 */
export function parsePublicKey(publicKey: Hex | Uint8Array): PublicKey {
  const bytes =
    typeof publicKey === 'string' ? hexToBytes(publicKey) : publicKey
  const offset = bytes.length === 65 ? 1 : 0
  const x = bytes.slice(offset, 32 + offset)
  const y = bytes.slice(32 + offset, 64 + offset)
  return {
    prefix: bytes.length === 65 ? bytes[0] : undefined,
    x: BigInt(bytesToHex(x)),
    y: BigInt(bytesToHex(y)),
  }
}

export type SerializePublicKeyOptions<to extends 'hex' | 'bytes' = 'hex'> = {
  compressed?: boolean | undefined
  to?: to | 'bytes' | 'hex' | undefined
}

/**
 * Serializes a public key into a hex string or bytes.
 */
export function serializePublicKey<to extends 'hex' | 'bytes' = 'hex'>(
  publicKey: PublicKey,
  options: SerializePublicKeyOptions<to> = {},
): to extends 'hex' ? Hex : Uint8Array {
  const { compressed = false, to = 'hex' } = options
  const result = Uint8Array.from([
    ...(publicKey.prefix && !compressed ? [publicKey.prefix] : []),
    ...numberToBytesBE(publicKey.x, 32),
    ...numberToBytesBE(publicKey.y, 32),
  ])
  return (to === 'hex' ? bytesToHex(result) : result) as any
}
