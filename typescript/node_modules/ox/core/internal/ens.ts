import { Bytes } from '../../index.js'
import * as Ens from '../Ens.js'
import type * as Errors from '../Errors.js'
import * as Hex from '../Hex.js'

/**
 * @internal
 * Encodes a [DNS packet](https://docs.ens.domains/resolution/names#dns) into a ByteArray containing a UDP payload.
 */
export function packetToBytes(packet: string): Bytes.Bytes {
  // strip leading and trailing `.`
  const value = packet.replace(/^\.|\.$/gm, '')
  if (value.length === 0) return new Uint8Array(1)

  const bytes = new Uint8Array(Bytes.fromString(value).byteLength + 2)

  let offset = 0
  const list = value.split('.')
  for (let i = 0; i < list.length; i++) {
    let encoded = Bytes.fromString(list[i]!)
    // if the length is > 255, make the encoded label value a labelhash
    // this is compatible with the universal resolver
    if (encoded.byteLength > 255)
      encoded = Bytes.fromString(wrapLabelhash(Ens.labelhash(list[i]!)))
    bytes[offset] = encoded.length
    bytes.set(encoded, offset + 1)
    offset += encoded.length + 1
  }

  if (bytes.byteLength !== offset + 1) return bytes.slice(0, offset + 1)

  return bytes
}

export declare namespace packetToBytes {
  type ErrorType =
    | wrapLabelhash.ErrorType
    | Ens.labelhash.ErrorType
    | Bytes.fromString.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function wrapLabelhash(hash: Hex.Hex): `[${string}]` {
  return `[${hash.slice(2)}]`
}

export declare namespace wrapLabelhash {
  type ErrorType = Errors.GlobalErrorType
}

/** @internal */
export function unwrapLabelhash(label: string): Hex.Hex | null {
  if (label.length !== 66) return null
  if (label.indexOf('[') !== 0) return null
  if (label.indexOf(']') !== 65) return null
  const hash = `0x${label.slice(1, 65)}`
  if (!Hex.validate(hash, { strict: true })) return null
  return hash
}

export declare namespace unwrapLabelhash {
  type ErrorType = Hex.validate.ErrorType | Errors.GlobalErrorType
}
