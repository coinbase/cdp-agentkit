import type * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'

/**
 * Encodes a personal sign message in [ERC-191 format](https://eips.ethereum.org/EIPS/eip-191#version-0x45-e): `0x19 ‖ "Ethereum Signed Message:\n" + message.length ‖ message`.
 *
 * @example
 * ```ts twoslash
 * import { Hex, PersonalMessage } from 'ox'
 *
 * const data = PersonalMessage.encode(Hex.fromString('hello world'))
 * // @log: '0x19457468657265756d205369676e6564204d6573736167653a0a313168656c6c6f20776f726c64'
 * // @log: (0x19 ‖ 'Ethereum Signed Message:\n11' ‖ 'hello world')
 * ```
 *
 * @param data - The data to encode.
 * @returns The encoded personal sign message.
 */
export function encode(data: Hex.Hex | Bytes.Bytes): Hex.Hex {
  const message = Hex.from(data)
  return Hex.concat(
    // Personal Sign Format: `0x19 ‖ "Ethereum Signed Message:\n" ‖ message.length ‖ message`
    '0x19',
    Hex.fromString('Ethereum Signed Message:\n' + Hex.size(message)),
    message,
  )
}

export declare namespace encode {
  type ErrorType =
    | Hex.concat.ErrorType
    | Hex.from.ErrorType
    | Hex.fromString.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
encode.parseError = (error: unknown) => error as encode.ErrorType

/**
 * Gets the payload to use for signing an [ERC-191 formatted](https://eips.ethereum.org/EIPS/eip-191#version-0x45-e) personal message.
 *
 * @example
 * ```ts twoslash
 * import { Hex, PersonalMessage, Secp256k1 } from 'ox'
 *
 * const payload = PersonalMessage.getSignPayload(Hex.fromString('hello world')) // [!code focus]
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param data - The data to get the sign payload for.
 * @returns The payload to use for signing.
 */
export function getSignPayload(data: Hex.Hex | Bytes.Bytes): Hex.Hex {
  return Hash.keccak256(encode(data))
}

export declare namespace getSignPayload {
  type ErrorType =
    | Hash.keccak256.ErrorType
    | encode.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
getSignPayload.parseError = (error: unknown) =>
  error as getSignPayload.ErrorType
