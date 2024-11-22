import { p256 } from '@noble/curves/p256'
import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import type * as Hex from './Hex.js'
import * as PublicKey from './PublicKey.js'
import type * as Signature from './Signature.js'
import type { Compute } from './internal/types.js'

/**
 * Generates an ECDSA P256 key pair that includes:
 *
 * - a `privateKey` of type [`CryptoKey`](https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey)
 *
 * - a `publicKey` of type {@link ox#Hex.Hex} or {@link ox#Bytes.Bytes}
 *
 * @example
 * ```ts twoslash
 * import { WebCryptoP256 } from 'ox'
 *
 * const { publicKey, privateKey } = await WebCryptoP256.createKeyPair()
 * // @log: {
 * // @log:   privateKey: CryptoKey {},
 * // @log:   publicKey: {
 * // @log:     x: 59295962801117472859457908919941473389380284132224861839820747729565200149877n,
 * // @log:     y: 24099691209996290925259367678540227198235484593389470330605641003500238088869n,
 * // @log:     prefix: 4,
 * // @log:   },
 * // @log: }
 * ```
 *
 * @param options - Options for creating the key pair.
 * @returns The key pair.
 */
export async function createKeyPair(
  options: createKeyPair.Options = {},
): Promise<createKeyPair.ReturnType> {
  const { extractable = false } = options
  const keypair = await globalThis.crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
    },
    extractable,
    ['sign', 'verify'],
  )
  const publicKey_raw = await globalThis.crypto.subtle.exportKey(
    'raw',
    keypair.publicKey,
  )
  const publicKey = PublicKey.from(new Uint8Array(publicKey_raw))
  return {
    privateKey: keypair.privateKey,
    publicKey,
  }
}

export declare namespace createKeyPair {
  type Options = {
    /** A boolean value indicating whether it will be possible to export the private key using `globalThis.crypto.subtle.exportKey()`. */
    extractable?: boolean | undefined
  }

  type ReturnType = Compute<{
    privateKey: CryptoKey
    publicKey: PublicKey.PublicKey
  }>

  type ErrorType = PublicKey.from.ErrorType | Errors.GlobalErrorType
}

createKeyPair.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as createKeyPair.ErrorType

/**
 * Signs a payload with the provided `CryptoKey` private key and returns a P256 signature.
 *
 * @example
 * ```ts twoslash
 * import { WebCryptoP256 } from 'ox'
 *
 * const { privateKey } = await WebCryptoP256.createKeyPair()
 *
 * const signature = await WebCryptoP256.sign({ // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   privateKey, // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   r: 151231...4423n,
 * // @log:   s: 516123...5512n,
 * // @log: }
 * ```
 *
 * @param options - Options for signing the payload.
 * @returns The P256 ECDSA {@link ox#Signature.Signature}.
 */
export async function sign(
  options: sign.Options,
): Promise<Signature.Signature<false>> {
  const { payload, privateKey } = options
  const signature = await globalThis.crypto.subtle.sign(
    {
      name: 'ECDSA',
      hash: 'SHA-256',
    },
    privateKey,
    Bytes.from(payload),
  )
  const signature_bytes = Bytes.fromArray(new Uint8Array(signature))
  const r = Bytes.toBigInt(Bytes.slice(signature_bytes, 0, 32))
  let s = Bytes.toBigInt(Bytes.slice(signature_bytes, 32, 64))
  if (s > p256.CURVE.n / 2n) s = p256.CURVE.n - s
  return { r, s }
}

export declare namespace sign {
  type Options = {
    /** Payload to sign. */
    payload: Hex.Hex | Bytes.Bytes
    /** ECDSA private key. */
    privateKey: CryptoKey
  }

  type ErrorType = Bytes.fromArray.ErrorType | Errors.GlobalErrorType
}

sign.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as sign.ErrorType

/**
 * Verifies a payload was signed by the provided public key.
 *
 * @example
 *
 * ```ts twoslash
 * import { WebCryptoP256 } from 'ox'
 *
 * const { privateKey, publicKey } = await WebCryptoP256.createKeyPair()
 * const signature = await WebCryptoP256.sign({ payload: '0xdeadbeef', privateKey })
 *
 * const verified = await WebCryptoP256.verify({ // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   publicKey, // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * // @log: true
 * ```
 *
 * @param options - The verification options.
 * @returns Whether the payload was signed by the provided public key.
 */
export async function verify(options: verify.Options): Promise<boolean> {
  const { payload, signature } = options

  const publicKey = await globalThis.crypto.subtle.importKey(
    'raw',
    PublicKey.toBytes(options.publicKey),
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['verify'],
  )

  return await globalThis.crypto.subtle.verify(
    {
      name: 'ECDSA',
      hash: 'SHA-256',
    },
    publicKey,
    Bytes.concat(Bytes.fromNumber(signature.r), Bytes.fromNumber(signature.s)),
    Bytes.from(payload),
  )
}

export declare namespace verify {
  type Options = {
    /** Public key that signed the payload. */
    publicKey: PublicKey.PublicKey<boolean>
    /** Signature of the payload. */
    signature: Signature.Signature<false>
    /** Payload that was signed. */
    payload: Hex.Hex | Bytes.Bytes
  }

  type ErrorType = Errors.GlobalErrorType
}

verify.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as verify.ErrorType
