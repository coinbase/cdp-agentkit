import { secp256k1 } from '@noble/curves/secp256k1'
import * as Bytes from './Bytes.js'
import * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as Json from './Json.js'
import * as Solidity from './Solidity.js'
import type { Compute, ExactPartial, OneOf } from './internal/types.js'

/** Root type for an ECDSA signature. */
export type Signature<
  recovered extends boolean = true,
  bigintType = bigint,
  numberType = number,
> = Compute<
  recovered extends true
    ? {
        r: bigintType
        s: bigintType
        yParity: numberType
      }
    : {
        r: bigintType
        s: bigintType
        yParity?: numberType | undefined
      }
>

/** RPC-formatted ECDSA signature. */
export type Rpc<recovered extends boolean = true> = Signature<
  recovered,
  Hex.Hex,
  Hex.Hex
>

/** (Legacy) ECDSA signature. */
export type Legacy<bigintType = bigint, numberType = number> = {
  r: bigintType
  s: bigintType
  v: numberType
}

/** RPC-formatted (Legacy) ECDSA signature. */
export type LegacyRpc = Legacy<Hex.Hex, Hex.Hex>

export type Tuple = readonly [yParity: Hex.Hex, r: Hex.Hex, s: Hex.Hex]

/**
 * Asserts that a Signature is valid.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * Signature.assert({
 *   r: -49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1,
 * })
 * // @error: InvalidSignatureRError:
 * // @error: Value `-549...n` is an invalid r value.
 * // @error: r must be a positive integer less than 2^256.
 * ```
 *
 * @param signature - The signature object to assert.
 */
export function assert(
  signature: ExactPartial<Signature>,
  options: assert.Options = {},
): asserts signature is Signature {
  const { recovered } = options
  if (typeof signature.r === 'undefined')
    throw new MissingPropertiesError({ signature })
  if (typeof signature.s === 'undefined')
    throw new MissingPropertiesError({ signature })
  if (recovered && typeof signature.yParity === 'undefined')
    throw new MissingPropertiesError({ signature })
  if (signature.r < 0n || signature.r > Solidity.maxUint256)
    throw new InvalidRError({ value: signature.r })
  if (signature.s < 0n || signature.s > Solidity.maxUint256)
    throw new InvalidSError({ value: signature.s })
  if (
    typeof signature.yParity === 'number' &&
    signature.yParity !== 0 &&
    signature.yParity !== 1
  )
    throw new InvalidYParityError({ value: signature.yParity })
}

export declare namespace assert {
  type Options = {
    /** Whether or not the signature should be recovered (contain `yParity`). */
    recovered?: boolean
  }

  type ErrorType =
    | MissingPropertiesError
    | InvalidRError
    | InvalidSError
    | InvalidYParityError
    | Errors.GlobalErrorType
}

/**
 * Deserializes a {@link ox#Bytes.Bytes} signature into a structured {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Signature } from 'ox'
 *
 * Signature.fromBytes(new Uint8Array([128, 3, 131, ...]))
 * // @log: { r: 5231...n, s: 3522...n, yParity: 0 }
 * ```
 *
 * @param signature - The serialized signature.
 * @returns The deserialized {@link ox#Signature.Signature}.
 */
export function fromBytes(signature: Bytes.Bytes): Signature {
  return fromHex(Hex.fromBytes(signature))
}

export declare namespace fromBytes {
  type ErrorType = Errors.GlobalErrorType
}

fromBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromBytes.ErrorType

/**
 * Deserializes a {@link ox#Hex.Hex} signature into a structured {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * Signature.fromHex('0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c')
 * // @log: { r: 5231...n, s: 3522...n, yParity: 0 }
 * ```
 *
 * @param serialized - The serialized signature.
 * @returns The deserialized {@link ox#Signature.Signature}.
 */
export function fromHex(signature: Hex.Hex): Signature {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError({ signature })

  const r = BigInt(Hex.slice(signature, 0, 32))
  const s = BigInt(Hex.slice(signature, 32, 64))

  const yParity = (() => {
    const yParity = Number(`0x${signature.slice(130)}`)
    if (Number.isNaN(yParity)) return undefined
    try {
      return vToYParity(yParity)
    } catch {
      throw new InvalidYParityError({ value: yParity })
    }
  })()

  if (typeof yParity === 'undefined')
    return {
      r,
      s,
    } as never
  return {
    r,
    s,
    yParity,
  } as never
}

export declare namespace fromHex {
  type ErrorType =
    | Hex.from.ErrorType
    | InvalidSerializedSizeError
    | Errors.GlobalErrorType
}

fromHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromHex.ErrorType

/**
 * Extracts a {@link ox#Signature.Signature} from an arbitrary object that may include signature properties.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Signature } from 'ox'
 *
 * Signature.extract({
 *   baz: 'barry',
 *   foo: 'bar',
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1,
 *   zebra: 'stripes',
 * })
 * // @log: {
 * // @log:   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 * // @log:   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * // @log:   yParity: 1
 * // @log: }
 * ```
 *
 * @param value - The arbitrary object to extract the signature from.
 * @returns The extracted {@link ox#Signature.Signature}.
 */
export function extract(value: extract.Value): Signature | undefined {
  if (typeof value.r === 'undefined') return undefined
  if (typeof value.s === 'undefined') return undefined
  return from(value as any)
}

export declare namespace extract {
  type Value = {
    r?: bigint | Hex.Hex | undefined
    s?: bigint | Hex.Hex | undefined
    yParity?: number | Hex.Hex | undefined
    v?: number | Hex.Hex | undefined
  }
  type ErrorType = Errors.GlobalErrorType
}

extract.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as extract.ErrorType

/**
 * Instantiates a typed {@link ox#Signature.Signature} object from a {@link ox#Signature.Signature}, {@link ox#Signature.Legacy}, {@link ox#Bytes.Bytes}, or {@link ox#Hex.Hex}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * Signature.from({
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1,
 * })
 * // @log: {
 * // @log:   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 * // @log:   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * // @log:   yParity: 1
 * // @log: }
 * ```
 *
 * @example
 * ### From Serialized
 *
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * Signature.from('0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db801')
 * // @log: {
 * // @log:   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 * // @log:   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * // @log:   yParity: 1,
 * // @log: }
 * ```
 *
 * @example
 * ### From Legacy
 *
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * Signature.from({
 *   r: 47323457007453657207889730243826965761922296599680473886588287015755652701072n,
 *   s: 57228803202727131502949358313456071280488184270258293674242124340113824882788n,
 *   v: 27,
 * })
 * // @log: {
 * // @log:   r: 47323457007453657207889730243826965761922296599680473886588287015755652701072n,
 * // @log:   s: 57228803202727131502949358313456071280488184270258293674242124340113824882788n,
 * // @log:   yParity: 0
 * // @log: }
 * ```
 *
 * @param signature - The signature value to instantiate.
 * @returns The instantiated {@link ox#Signature.Signature}.
 */
export function from<
  const signature extends
    | OneOf<Signature<boolean> | Rpc<boolean> | Legacy | LegacyRpc>
    | Hex.Hex
    | Bytes.Bytes,
>(
  signature:
    | signature
    | OneOf<Signature<boolean> | Rpc<boolean> | Legacy | LegacyRpc>
    | Hex.Hex
    | Bytes.Bytes,
): from.ReturnType<signature> {
  const signature_ = (() => {
    if (typeof signature === 'string') return fromHex(signature)
    if (signature instanceof Uint8Array) return fromBytes(signature)
    if (typeof signature.r === 'string') return fromRpc(signature)
    if (signature.v) return fromLegacy(signature)
    return {
      r: signature.r,
      s: signature.s,
      ...(typeof signature.yParity !== 'undefined'
        ? { yParity: signature.yParity }
        : {}),
    }
  })()
  assert(signature_)
  return signature_ as never
}

export declare namespace from {
  type ReturnType<
    signature extends
      | OneOf<Signature<boolean> | Rpc<boolean> | Legacy | LegacyRpc>
      | Hex.Hex
      | Bytes.Bytes,
  > = signature extends Signature<boolean> & { v?: undefined }
    ? signature
    : Signature

  type ErrorType =
    | assert.ErrorType
    | fromBytes.ErrorType
    | fromHex.ErrorType
    | vToYParity.ErrorType
    | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Converts a DER-encoded signature to a {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Signature } from 'ox'
 *
 * const signature = Signature.fromDerBytes(new Uint8Array([132, 51, 23, ...]))
 * // @log: {
 * // @log:   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 * // @log:   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * // @log: }
 * ```
 *
 * @param signature - The DER-encoded signature to convert.
 * @returns The {@link ox#Signature.Signature}.
 */
export function fromDerBytes(signature: Bytes.Bytes): Signature<false> {
  return fromDerHex(Hex.fromBytes(signature))
}

export declare namespace fromDerBytes {
  type ErrorType = Errors.GlobalErrorType
}

fromDerBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromDerBytes.ErrorType

/**
 * Converts a DER-encoded signature to a {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.fromDerHex('0x304402206e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf02204a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db8')
 * // @log: {
 * // @log:   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 * // @log:   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * // @log: }
 * ```
 *
 * @param signature - The DER-encoded signature to convert.
 * @returns The {@link ox#Signature.Signature}.
 */
export function fromDerHex(signature: Hex.Hex): Signature<false> {
  const { r, s } = secp256k1.Signature.fromDER(Hex.from(signature).slice(2))
  return { r, s }
}

export declare namespace fromDerHex {
  type ErrorType = Errors.GlobalErrorType
}

fromDerHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromDerHex.ErrorType

/**
 * Converts a {@link ox#Signature.Legacy} into a {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const legacy = Signature.fromLegacy({ r: 1n, s: 2n, v: 28 })
 * // @log: { r: 1n, s: 2n, yParity: 1 }
 * ```
 *
 * @param signature - The {@link ox#Signature.Legacy} to convert.
 * @returns The converted {@link ox#Signature.Signature}.
 */
export function fromLegacy(signature: Legacy): Signature {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity(signature.v),
  }
}

export declare namespace fromLegacy {
  type ErrorType = vToYParity.ErrorType | Errors.GlobalErrorType
}

fromLegacy.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromLegacy.ErrorType

/**
 * Converts a {@link ox#Signature.Rpc} into a {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.fromRpc({
 *   r: '0x635dc2033e60185bb36709c29c75d64ea51dfbd91c32ef4be198e4ceb169fb4d',
 *   s: '0x50c2667ac4c771072746acfdcf1f1483336dcca8bd2df47cd83175dbe60f0540',
 *   yParity: '0x0',
 * })
 * ```
 *
 * @param signature - The {@link ox#Signature.Rpc} to convert.
 * @returns The converted {@link ox#Signature.Signature}.
 */
export function fromRpc(signature: {
  r: Hex.Hex
  s: Hex.Hex
  yParity?: Hex.Hex | undefined
  v?: Hex.Hex | undefined
}): Signature {
  const yParity = (() => {
    const v = signature.v ? Number(signature.v) : undefined
    let yParity = signature.yParity ? Number(signature.yParity) : undefined
    if (typeof v === 'number' && typeof yParity !== 'number')
      yParity = vToYParity(v)
    if (typeof yParity !== 'number')
      throw new InvalidYParityError({ value: signature.yParity })
    return yParity
  })()

  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity,
  }
}

export declare namespace fromRpc {
  type ErrorType = Errors.GlobalErrorType
}

fromRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromRpc.ErrorType

/**
 * Converts a {@link ox#Signature.Tuple} to a {@link ox#Signature.Signature}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.fromTuple(['0x01', '0x7b', '0x1c8'])
 * // @log: {
 * // @log:   r: 123n,
 * // @log:   s: 456n,
 * // @log:   yParity: 1,
 * // @log: }
 * ```
 *
 * @param tuple - The {@link ox#Signature.Tuple} to convert.
 * @returns The {@link ox#Signature.Signature}.
 */
export function fromTuple(tuple: Tuple): Signature {
  const [yParity, r, s] = tuple
  return from({
    r: r === '0x' ? 0n : BigInt(r),
    s: s === '0x' ? 0n : BigInt(s),
    yParity: yParity === '0x' ? 0 : Number(yParity),
  })
}

export declare namespace fromTuple {
  type ErrorType = from.ErrorType | Errors.GlobalErrorType
}

fromTuple.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as fromTuple.ErrorType

/**
 * Serializes a {@link ox#Signature.Signature} to {@link ox#Bytes.Bytes}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.toBytes({
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1
 * })
 * // @log: Uint8Array [102, 16, 10, ...]
 * ```
 *
 * @param signature - The signature to serialize.
 * @returns The serialized signature.
 */
export function toBytes(signature: Signature<boolean>): Bytes.Bytes {
  return Bytes.fromHex(toHex(signature))
}

export declare namespace toBytes {
  type ErrorType =
    | toHex.ErrorType
    | Bytes.fromHex.ErrorType
    | Errors.GlobalErrorType
}

toBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toBytes.ErrorType

/**
 * Serializes a {@link ox#Signature.Signature} to {@link ox#Hex.Hex}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.toHex({
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1
 * })
 * // @log: '0x6e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf4a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db81c'
 * ```
 *
 * @param signature - The signature to serialize.
 * @returns The serialized signature.
 */
export function toHex(signature: Signature<boolean>): Hex.Hex {
  assert(signature)

  const r = signature.r
  const s = signature.s

  const signature_ = Hex.concat(
    Hex.fromNumber(r, { size: 32 }),
    Hex.fromNumber(s, { size: 32 }),
    // If the signature is recovered, add the recovery byte to the signature.
    typeof signature.yParity === 'number'
      ? Hex.fromNumber(signature.yParity, { size: 1 })
      : '0x',
  )

  return signature_
}

export declare namespace toHex {
  type ErrorType =
    | Hex.concat.ErrorType
    | Hex.fromNumber.ErrorType
    | Errors.GlobalErrorType
}

toHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toHex.ErrorType

/**
 * Converts a {@link ox#Signature.Signature} to DER-encoded format.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.from({
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * })
 *
 * const signature_der = Signature.toDerBytes(signature)
 * // @log: Uint8Array [132, 51, 23, ...]
 * ```
 *
 * @param signature - The signature to convert.
 * @returns The DER-encoded signature.
 */
export function toDerBytes(signature: Signature<boolean>): Bytes.Bytes {
  const sig = new secp256k1.Signature(signature.r, signature.s)
  return sig.toDERRawBytes()
}

export declare namespace toDerBytes {
  type ErrorType = Errors.GlobalErrorType
}

toDerBytes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toDerBytes.ErrorType

/**
 * Converts a {@link ox#Signature.Signature} to DER-encoded format.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.from({
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 * })
 *
 * const signature_der = Signature.toDerHex(signature)
 * // @log: '0x304402206e100a352ec6ad1b70802290e18aeed190704973570f3b8ed42cb9808e2ea6bf02204a90a229a244495b41890987806fcbd2d5d23fc0dbe5f5256c2613c039d76db8'
 * ```
 *
 * @param signature - The signature to convert.
 * @returns The DER-encoded signature.
 */
export function toDerHex(signature: Signature<boolean>): Hex.Hex {
  const sig = new secp256k1.Signature(signature.r, signature.s)
  return `0x${sig.toDERHex()}`
}

export declare namespace toDerHex {
  type ErrorType = Errors.GlobalErrorType
}

toDerHex.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toDerHex.ErrorType

/**
 * Converts a {@link ox#Signature.Signature} into a {@link ox#Signature.Legacy}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const legacy = Signature.toLegacy({ r: 1n, s: 2n, yParity: 1 })
 * // @log: { r: 1n, s: 2n, v: 28 }
 * ```
 *
 * @param signature - The {@link ox#Signature.Signature} to convert.
 * @returns The converted {@link ox#Signature.Legacy}.
 */
export function toLegacy(signature: Signature): Legacy {
  return {
    r: signature.r,
    s: signature.s,
    v: yParityToV(signature.yParity),
  }
}

export declare namespace toLegacy {
  type ErrorType = yParityToV.ErrorType | Errors.GlobalErrorType
}

toLegacy.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toLegacy.ErrorType

/**
 * Converts a {@link ox#Signature.Signature} into a {@link ox#Signature.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signature = Signature.toRpc({
 *   r: 49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1
 * })
 * ```
 *
 * @param signature - The {@link ox#Signature.Signature} to convert.
 * @returns The converted {@link ox#Signature.Rpc}.
 */
export function toRpc(signature: Signature): Rpc {
  const { r, s, yParity } = signature
  return {
    r: Hex.fromNumber(r, { size: 32 }),
    s: Hex.fromNumber(s, { size: 32 }),
    yParity: yParity === 0 ? '0x0' : '0x1',
  }
}

export declare namespace toRpc {
  type ErrorType = Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType

/**
 * Converts a {@link ox#Signature.Signature} to a serialized {@link ox#Signature.Tuple} to be used for signatures in Transaction Envelopes, EIP-7702 Authorization Lists, etc.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const signatureTuple = Signature.toTuple({
 *   r: 123n,
 *   s: 456n,
 *   yParity: 1,
 * })
 * // @log: [yParity: '0x01', r: '0x7b', s: '0x1c8']
 * ```
 *
 * @param signature - The {@link ox#Signature.Signature} to convert.
 * @returns The {@link ox#Signature.Tuple}.
 */
export function toTuple(signature: Signature): Tuple {
  const { r, s, yParity } = signature

  return [
    yParity ? '0x01' : '0x',
    r === 0n ? '0x' : Hex.trimLeft(Hex.fromNumber(r!)),
    s === 0n ? '0x' : Hex.trimLeft(Hex.fromNumber(s!)),
  ] as const
}

export declare namespace toTuple {
  type ErrorType =
    | Hex.trimLeft.ErrorType
    | Hex.fromNumber.ErrorType
    | Errors.GlobalErrorType
}

/**
 * Validates a Signature. Returns `true` if the signature is valid, `false` otherwise.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const valid = Signature.validate({
 *   r: -49782753348462494199823712700004552394425719014458918871452329774910450607807n,
 *   s: 33726695977844476214676913201140481102225469284307016937915595756355928419768n,
 *   yParity: 1,
 * })
 * // @log: false
 * ```
 *
 * @param signature - The signature object to assert.
 */
export function validate(
  signature: ExactPartial<Signature>,
  options: validate.Options = {},
): boolean {
  try {
    assert(signature, options)
    return true
  } catch {
    return false
  }
}

export declare namespace validate {
  type Options = {
    /** Whether or not the signature should be recovered (contain `yParity`). */
    recovered?: boolean
  }

  type ErrorType = Errors.GlobalErrorType
}

/**
 * Converts a ECDSA `v` value to a `yParity` value.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const yParity = Signature.vToYParity(28)
 * // @log: 1
 * ```
 *
 * @param v - The ECDSA `v` value to convert.
 * @returns The `yParity` value.
 */
export function vToYParity(v: number): Signature['yParity'] {
  if (v === 0 || v === 27) return 0
  if (v === 1 || v === 28) return 1
  if (v >= 35) return v % 2 === 0 ? 1 : 0
  throw new InvalidVError({ value: v })
}

export declare namespace vToYParity {
  type ErrorType = InvalidVError | Errors.GlobalErrorType
}

/* v8 ignore next */
vToYParity.parseError = (error: unknown) => error as vToYParity.ErrorType

/**
 * Converts a ECDSA `v` value to a `yParity` value.
 *
 * @example
 * ```ts twoslash
 * import { Signature } from 'ox'
 *
 * const v = Signature.yParityToV(1)
 * // @log: 28
 * ```
 *
 * @param yParity - The ECDSA `yParity` value to convert.
 * @returns The `v` value.
 */
export function yParityToV(yParity: number): number {
  if (yParity === 0) return 27
  if (yParity === 1) return 28
  throw new InvalidYParityError({ value: yParity })
}

export declare namespace yParityToV {
  type ErrorType = InvalidVError | Errors.GlobalErrorType
}

/* v8 ignore next */
yParityToV.parseError = (error: unknown) => error as yParityToV.ErrorType

/** Thrown when the serialized signature is of an invalid size. */
export class InvalidSerializedSizeError extends Errors.BaseError {
  override readonly name = 'Signature.InvalidSerializedSizeError'

  constructor({ signature }: { signature: Hex.Hex | Bytes.Bytes }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        'Expected: 64 bytes or 65 bytes.',
        `Received ${Hex.size(Hex.from(signature))} bytes.`,
      ],
    })
  }
}

/** Thrown when the signature is missing either an `r`, `s`, or `yParity` property. */
export class MissingPropertiesError extends Errors.BaseError {
  override readonly name = 'Signature.MissingPropertiesError'

  constructor({ signature }: { signature: unknown }) {
    super(
      `Signature \`${Json.stringify(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`,
    )
  }
}

/** Thrown when the signature has an invalid `r` value. */
export class InvalidRError extends Errors.BaseError {
  override readonly name = 'Signature.InvalidRError'

  constructor({ value }: { value: unknown }) {
    super(
      `Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`,
    )
  }
}

/** Thrown when the signature has an invalid `s` value. */
export class InvalidSError extends Errors.BaseError {
  override readonly name = 'Signature.InvalidSError'

  constructor({ value }: { value: unknown }) {
    super(
      `Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`,
    )
  }
}

/** Thrown when the signature has an invalid `yParity` value. */
export class InvalidYParityError extends Errors.BaseError {
  override readonly name = 'Signature.InvalidYParityError'

  constructor({ value }: { value: unknown }) {
    super(
      `Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`,
    )
  }
}

/** Thrown when the signature has an invalid `v` value. */
export class InvalidVError extends Errors.BaseError {
  override readonly name = 'Signature.InvalidVError'

  constructor({ value }: { value: number }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`)
  }
}
