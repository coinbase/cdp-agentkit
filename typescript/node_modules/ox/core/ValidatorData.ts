import type * as Address from './Address.js'
import type * as Bytes from './Bytes.js'
import type * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'

/**
 * Encodes data with a validator in [ERC-191 format](https://eips.ethereum.org/EIPS/eip-191#version-0x00): `0x19 ‖ 0x00 ‖ <intended validator address> ‖ <data to sign>`.
 *
 * @example
 * ```ts twoslash
 * import { Hex, ValidatorData } from 'ox'
 *
 * const encoded = ValidatorData.encode({
 *   data: Hex.fromString('hello world'),
 *   validator: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
 * })
 * // @log: '0x1900d8da6bf26964af9d7eed9e03e53415d37aa9604568656c6c6f20776f726c64'
 * // @log: '0x19 ‖ 0x00 ‖ 0xd8da6bf26964af9d7eed9e03e53415d37aa96045 ‖ "hello world"'
 * ```
 *
 * @param value - The data to encode.
 * @returns The encoded personal sign message.
 */
export function encode(value: encode.Value): Hex.Hex {
  const { data, validator } = value
  return Hex.concat(
    // Validator Data Format: `0x19 ‖ 0x00 ‖ <intended validator address> ‖ <data to sign>`
    '0x19',
    '0x00',
    validator,
    Hex.from(data),
  )
}

export declare namespace encode {
  type Value = {
    data: Hex.Hex | Bytes.Bytes
    validator: Address.Address
  }

  type ErrorType =
    | Hex.concat.ErrorType
    | Hex.from.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
encode.parseError = (error: unknown) => error as encode.ErrorType

/**
 * Gets the payload to use for signing [ERC-191 formatted](https://eips.ethereum.org/EIPS/eip-191#0x00) data with an intended validator.
 *
 * @example
 * ```ts twoslash
 * import { Hex, Secp256k1, ValidatorData } from 'ox'
 *
 * const payload = ValidatorData.getSignPayload({ // [!code focus]
 *   data: Hex.fromString('hello world'), // [!code focus]
 *   validator: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045', // [!code focus]
 * }) // [!code focus]
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param value - The data to get the sign payload for.
 * @returns The payload to use for signing.
 */
export function getSignPayload(value: getSignPayload.Value): Hex.Hex {
  return Hash.keccak256(encode(value))
}

export declare namespace getSignPayload {
  type Value = {
    data: Hex.Hex | Bytes.Bytes
    validator: Address.Address
  }

  type ErrorType =
    | Hash.keccak256.ErrorType
    | encode.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
getSignPayload.parseError = (error: unknown) =>
  error as getSignPayload.ErrorType
