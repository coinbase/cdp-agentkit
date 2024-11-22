import { secp256k1 } from '@noble/curves/secp256k1'
import * as Address from './Address.js'
import * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as PublicKey from './PublicKey.js'
import type * as Signature from './Signature.js'
import type { OneOf } from './internal/types.js'

/** Re-export of noble/curves secp256k1 utilities. */
export const noble = secp256k1

/**
 * Computes the secp256k1 ECDSA public key from a provided private key.
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const publicKey = Secp256k1.getPublicKey({ privateKey: '0x...' })
 * ```
 *
 * @param options - The options to compute the public key.
 * @returns The computed public key.
 */
export function getPublicKey(
  options: getPublicKey.Options,
): PublicKey.PublicKey {
  const { privateKey } = options
  const point = secp256k1.ProjectivePoint.fromPrivateKey(
    Hex.from(privateKey).slice(2),
  )
  return PublicKey.from(point)
}

export declare namespace getPublicKey {
  type Options = {
    /**
     * Private key to compute the public key from.
     */
    privateKey: Hex.Hex | Bytes.Bytes
  }

  type ErrorType =
    | Hex.from.ErrorType
    | PublicKey.from.ErrorType
    | Errors.GlobalErrorType
}

/**
 * Generates a random ECDSA private key on the secp256k1 curve.
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const privateKey = Secp256k1.randomPrivateKey()
 * ```
 *
 * @param options - The options to generate the private key.
 * @returns The generated private key.
 */
export function randomPrivateKey<as extends 'Hex' | 'Bytes' = 'Hex'>(
  options: randomPrivateKey.Options<as> = {},
): randomPrivateKey.ReturnType<as> {
  const { as = 'Hex' } = options
  const bytes = secp256k1.utils.randomPrivateKey()
  if (as === 'Hex') return Hex.fromBytes(bytes) as never
  return bytes as never
}

export declare namespace randomPrivateKey {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex'> = {
    /**
     * Format of the returned private key.
     * @default 'Hex'
     */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType = Hex.fromBytes.ErrorType | Errors.GlobalErrorType
}

/**
 * Recovers the signing address from the signed payload and signature.
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const signature = Secp256k1.sign({ payload: '0xdeadbeef', privateKey: '0x...' })
 *
 * const address = Secp256k1.recoverAddress({ // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param options - The recovery options.
 * @returns The recovered address.
 */
export function recoverAddress(
  options: recoverAddress.Options,
): recoverAddress.ReturnType {
  return Address.fromPublicKey(recoverPublicKey(options))
}

export declare namespace recoverAddress {
  type Options = {
    /** Payload that was signed. */
    payload: Hex.Hex | Bytes.Bytes
    /** Signature of the payload. */
    signature: Signature.Signature
  }

  type ReturnType = Address.Address

  type ErrorType =
    | Address.fromPublicKey.ErrorType
    | recoverPublicKey.ErrorType
    | Errors.GlobalErrorType
}

recoverAddress.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as recoverAddress.ErrorType

/**
 * Recovers the signing public key from the signed payload and signature.
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const signature = Secp256k1.sign({ payload: '0xdeadbeef', privateKey: '0x...' })
 *
 * const publicKey = Secp256k1.recoverPublicKey({ // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param options - The recovery options.
 * @returns The recovered public key.
 */
export function recoverPublicKey(
  options: recoverPublicKey.Options,
): PublicKey.PublicKey {
  const { payload, signature } = options
  const { r, s, yParity } = signature
  const signature_ = new secp256k1.Signature(
    BigInt(r),
    BigInt(s),
  ).addRecoveryBit(yParity)
  const point = signature_.recoverPublicKey(Hex.from(payload).substring(2))
  return PublicKey.from(point)
}

export declare namespace recoverPublicKey {
  type Options = {
    /** Payload that was signed. */
    payload: Hex.Hex | Bytes.Bytes
    /** Signature of the payload. */
    signature: Signature.Signature
  }

  type ErrorType =
    | PublicKey.from.ErrorType
    | Hex.from.ErrorType
    | Errors.GlobalErrorType
}

recoverPublicKey.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as recoverPublicKey.ErrorType

/**
 * Signs the payload with the provided private key.
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const signature = Secp256k1.sign({ // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   privateKey: '0x...' // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param options - The signing options.
 * @returns The ECDSA {@link ox#Signature.Signature}.
 */
export function sign(options: sign.Options): Signature.Signature {
  const { hash, payload, privateKey } = options
  const { r, s, recovery } = secp256k1.sign(
    Bytes.from(payload),
    Bytes.from(privateKey),
    ...(hash ? [{ prehash: true, lowS: true }] : []),
  )
  return {
    r,
    s,
    yParity: recovery,
  }
}

export declare namespace sign {
  type Options = {
    /** If set to `true`, the payload will be hashed (sha256) before being signed. */
    hash?: boolean | undefined
    /** Payload to sign. */
    payload: Hex.Hex | Bytes.Bytes
    /** ECDSA private key. */
    privateKey: Hex.Hex | Bytes.Bytes
  }

  type ErrorType = Bytes.from.ErrorType | Errors.GlobalErrorType
}

sign.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as sign.ErrorType

/**
 * Verifies a payload was signed by the provided address.
 *
 * @example
 * ### Verify with Ethereum Address
 *
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const signature = Secp256k1.sign({ payload: '0xdeadbeef', privateKey: '0x...' })
 *
 * const verified = Secp256k1.verify({ // [!code focus]
 *   address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @example
 * ### Verify with Public Key
 *
 * ```ts twoslash
 * import { Secp256k1 } from 'ox'
 *
 * const privateKey = '0x...'
 * const publicKey = Secp256k1.getPublicKey({ privateKey })
 * const signature = Secp256k1.sign({ payload: '0xdeadbeef', privateKey })
 *
 * const verified = Secp256k1.verify({ // [!code focus]
 *   publicKey, // [!code focus]
 *   payload: '0xdeadbeef', // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @param options - The verification options.
 * @returns Whether the payload was signed by the provided address.
 */
export function verify(options: verify.Options): boolean {
  const { address, hash, payload, publicKey, signature } = options
  if (address)
    return Address.isEqual(address, recoverAddress({ payload, signature }))
  return secp256k1.verify(
    signature,
    Bytes.from(payload),
    PublicKey.toBytes(publicKey),
    ...(hash ? [{ prehash: true, lowS: true }] : []),
  )
}

export declare namespace verify {
  type Options = {
    /** If set to `true`, the payload will be hashed (sha256) before being verified. */
    hash?: boolean | undefined
    /** Payload that was signed. */
    payload: Hex.Hex | Bytes.Bytes
  } & OneOf<
    | {
        /** Address that signed the payload. */
        address: Address.Address
        /** Signature of the payload. */
        signature: Signature.Signature
      }
    | {
        /** Public key that signed the payload. */
        publicKey: PublicKey.PublicKey<boolean>
        /** Signature of the payload. */
        signature: Signature.Signature<false>
      }
  >

  type ErrorType = Errors.GlobalErrorType
}

verify.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as verify.ErrorType
