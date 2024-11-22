import * as Address from './Address.js'
import type * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as Rlp from './Rlp.js'
import * as Signature from './Signature.js'
import * as TransactionEnvelope from './TransactionEnvelope.js'
import type {
  Assign,
  Branded,
  Compute,
  PartialBy,
  UnionPartialBy,
} from './internal/types.js'

export type TransactionEnvelopeLegacy<
  signed extends boolean = boolean,
  bigintType = bigint,
  numberType = number,
  type extends string = Type,
> = Compute<
  PartialBy<
    TransactionEnvelope.Base<type, signed, bigintType, numberType>,
    'chainId'
  > & {
    /** Base fee per gas. */
    gasPrice?: bigintType | undefined
  }
>

export type Rpc<signed extends boolean = boolean> = TransactionEnvelopeLegacy<
  signed,
  Hex.Hex,
  Hex.Hex,
  '0x0'
>

export type Serialized = Branded<`0x${string}`, 'legacy'>

export type Signed = TransactionEnvelopeLegacy<true>

export const type = 'legacy'
export type Type = typeof type

/**
 * Asserts a {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy} is valid.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeLegacy, Value } from 'ox'
 *
 * TransactionEnvelopeLegacy.assert({
 *   gasPrice: 2n ** 256n - 1n + 1n,
 *   chainId: 1,
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 * // @error: GasPriceTooHighError:
 * // @error: The gas price (`gasPrice` = 115792089237316195423570985008687907853269984665640564039457584007913 gwei) cannot be
 * // @error: higher than the maximum allowed value (2^256-1).
 * ```
 *
 * @param envelope - The transaction envelope to assert.
 */
export function assert(envelope: PartialBy<TransactionEnvelopeLegacy, 'type'>) {
  const { chainId, gasPrice, to } = envelope
  if (to) Address.assert(to, { strict: false })
  if (typeof chainId !== 'undefined' && chainId <= 0)
    throw new TransactionEnvelope.InvalidChainIdError({ chainId })
  if (gasPrice && BigInt(gasPrice) > 2n ** 256n - 1n)
    throw new TransactionEnvelope.GasPriceTooHighError({ gasPrice })
}

export declare namespace assert {
  type ErrorType =
    | Address.assert.ErrorType
    | TransactionEnvelope.InvalidChainIdError
    | TransactionEnvelope.GasPriceTooHighError
    | Errors.GlobalErrorType
}

assert.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as assert.ErrorType

/**
 * Deserializes a {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy} from its serialized form.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeLegacy } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.deserialize('0x01ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0')
 * // @log: {
 * // @log:   type: 'legacy',
 * // @log:   nonce: 785n,
 * // @log:   gasPrice: 2000000000n,
 * // @log:   gas: 1000000n,
 * // @log:   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 * // @log:   value: 1000000000000000000n,
 * // @log: }
 * ```
 *
 * @param serialized - The serialized transaction.
 * @returns Deserialized Transaction Envelope.
 */
export function deserialize(
  serialized: Hex.Hex,
): Compute<TransactionEnvelopeLegacy> {
  const tuple = Rlp.toHex(serialized)

  const [nonce, gasPrice, gas, to, value, data, chainIdOrV_, r, s] =
    tuple as readonly Hex.Hex[]

  if (!(tuple.length === 6 || tuple.length === 9))
    throw new TransactionEnvelope.InvalidSerializedError({
      attributes: {
        nonce,
        gasPrice,
        gas,
        to,
        value,
        data,
        ...(tuple.length > 6
          ? {
              v: chainIdOrV_,
              r,
              s,
            }
          : {}),
      },
      serialized,
      type,
    })

  const transaction = {
    type,
  } as TransactionEnvelopeLegacy
  if (Hex.validate(to) && to !== '0x') transaction.to = to
  if (Hex.validate(gas) && gas !== '0x') transaction.gas = BigInt(gas)
  if (Hex.validate(data) && data !== '0x') transaction.data = data
  if (Hex.validate(nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce)
  if (Hex.validate(value) && value !== '0x') transaction.value = BigInt(value)
  if (Hex.validate(gasPrice) && gasPrice !== '0x')
    transaction.gasPrice = BigInt(gasPrice)

  if (tuple.length === 6) return transaction

  const chainIdOrV =
    Hex.validate(chainIdOrV_) && chainIdOrV_ !== '0x'
      ? Number(chainIdOrV_ as Hex.Hex)
      : 0

  if (s === '0x' && r === '0x') {
    if (chainIdOrV > 0) transaction.chainId = Number(chainIdOrV)
    return transaction
  }

  const v = chainIdOrV
  const chainId: number | undefined = Math.floor((v - 35) / 2)
  if (chainId > 0) transaction.chainId = chainId
  else if (v !== 27 && v !== 28) throw new Signature.InvalidVError({ value: v })

  transaction.yParity = Signature.vToYParity(v)
  transaction.v = v
  transaction.s = s === '0x' ? 0n : BigInt(s!)
  transaction.r = r === '0x' ? 0n : BigInt(r!)

  assert(transaction)

  return transaction
}

export declare namespace deserialize {
  type ErrorType = Errors.GlobalErrorType
}

deserialize.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as deserialize.ErrorType

/**
 * Converts an arbitrary transaction object into a legacy Transaction Envelope.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeLegacy, Value } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   gasPrice: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the transaction envelope.
 *
 * ```ts twoslash
 * import { Secp256k1, TransactionEnvelopeLegacy, Value } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   chainId: 1,
 *   gasPrice: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeLegacy.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const envelope_signed = TransactionEnvelopeLegacy.from(envelope, { // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   authorizationList: [...],
 * // @log:   chainId: 1,
 * // @log:   gasPrice: 10000000000n,
 * // @log:   to: '0x0000000000000000000000000000000000000000',
 * // @log:   type: 'eip7702',
 * // @log:   value: 1000000000000000000n,
 * // @log:   r: 125...n,
 * // @log:   s: 642...n,
 * // @log:   yParity: 0,
 * // @log: }
 * ```
 *
 * @example
 * ### From Serialized
 *
 * It is possible to instantiate an legacy Transaction Envelope from a {@link ox#TransactionEnvelopeLegacy.Serialized} value.
 *
 * ```ts twoslash
 * import { TransactionEnvelopeLegacy } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from('0xf858018203118502540be4008504a817c800809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c08477359400e1a001627c687261b0e7f8638af1112efa8a77e23656f6e7945275b19e9deed80261')
 * // @log: {
 * // @log:   chainId: 1,
 * // @log:   gasPrice: 10000000000n,
 * // @log:   to: '0x0000000000000000000000000000000000000000',
 * // @log:   type: 'legacy',
 * // @log:   value: 1000000000000000000n,
 * // @log: }
 * ```
 *
 * @param envelope - The transaction object to convert.
 * @param options - Options.
 * @returns A legacy Transaction Envelope.
 */
export function from<
  const envelope extends
    | UnionPartialBy<TransactionEnvelopeLegacy, 'type'>
    | Hex.Hex,
  const signature extends Signature.Signature | undefined = undefined,
>(
  envelope:
    | envelope
    | UnionPartialBy<TransactionEnvelopeLegacy, 'type'>
    | Hex.Hex,
  options: from.Options<signature> = {},
): from.ReturnType<envelope, signature> {
  const { signature } = options

  const envelope_ = (
    typeof envelope === 'string' ? deserialize(envelope) : envelope
  ) as TransactionEnvelopeLegacy

  assert(envelope_)

  const signature_ = (() => {
    if (!signature) return {}
    const s = Signature.from(signature) as any
    s.v = Signature.yParityToV(s.yParity)
    return s
  })()

  return {
    ...envelope_,
    ...signature_,
    type: 'legacy',
  } as never
}

export declare namespace from {
  type Options<signature extends Signature.Signature | undefined = undefined> =
    {
      signature?: signature | Signature.Signature | undefined
    }

  type ReturnType<
    envelope extends
      | UnionPartialBy<TransactionEnvelopeLegacy, 'type'>
      | Hex.Hex = TransactionEnvelopeLegacy | Hex.Hex,
    signature extends Signature.Signature | undefined = undefined,
  > = Compute<
    envelope extends Hex.Hex
      ? TransactionEnvelopeLegacy
      : Assign<
          envelope,
          (signature extends Signature.Signature
            ? Readonly<
                signature & {
                  v: signature['yParity'] extends 0 ? 27 : 28
                }
              >
            : {}) & {
            readonly type: 'legacy'
          }
        >
  >

  type ErrorType =
    | deserialize.ErrorType
    | assert.ErrorType
    | Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Returns the payload to sign for a {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy}.
 *
 * @example
 * The example below demonstrates how to compute the sign payload which can be used
 * with ECDSA signing utilities like {@link ox#Secp256k1.(sign:function)}.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, TransactionEnvelopeLegacy } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   nonce: 0n,
 *   gasPrice: 1000000000n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * const payload = TransactionEnvelopeLegacy.getSignPayload(envelope) // [!code focus]
 * // @log: '0x...'
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param envelope - The transaction envelope to get the sign payload for.
 * @returns The sign payload.
 */
export function getSignPayload(
  envelope: TransactionEnvelopeLegacy<false>,
): getSignPayload.ReturnType {
  return hash(envelope, { presign: true })
}

export declare namespace getSignPayload {
  type ReturnType = Hex.Hex

  type ErrorType = hash.ErrorType | Errors.GlobalErrorType
}

getSignPayload.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getSignPayload.ErrorType

/**
 * Hashes a {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy}. This is the "transaction hash".
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1, TransactionEnvelopeLegacy } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   chainId: 1,
 *   nonce: 0n,
 *   gasPrice: 1000000000n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeLegacy.getSignPayload(envelope),
 *   privateKey: '0x...'
 * })
 *
 * const envelope_signed = TransactionEnvelopeLegacy.from(envelope, { signature })
 *
 * const hash = TransactionEnvelopeLegacy.hash(envelope_signed) // [!code focus]
 * ```
 *
 * @param envelope - The Legacy Transaction Envelope to hash.
 * @param options - Options.
 * @returns The hash of the transaction envelope.
 */
export function hash<presign extends boolean = false>(
  envelope: TransactionEnvelopeLegacy<presign extends true ? false : true>,
  options: hash.Options<presign> = {},
): hash.ReturnType {
  const { presign } = options
  return Hash.keccak256(
    serialize({
      ...envelope,
      ...(presign
        ? {
            r: undefined,
            s: undefined,
            yParity: undefined,
            v: undefined,
          }
        : {}),
    }),
  )
}

export declare namespace hash {
  type Options<presign extends boolean = false> = {
    /** Whether to hash this transaction for signing. @default false */
    presign?: presign | boolean | undefined
  }

  type ReturnType = Hex.Hex

  type ErrorType =
    | Hash.keccak256.ErrorType
    | serialize.ErrorType
    | Errors.GlobalErrorType
}

hash.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as hash.ErrorType

/**
 * Serializes a {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { TransactionEnvelopeLegacy } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   chainId: 1,
 *   gasPrice: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const serialized = TransactionEnvelopeLegacy.serialize(envelope) // [!code focus]
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the serialized Transaction Envelope.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, TransactionEnvelopeLegacy, Value } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   chainId: 1,
 *   gasPrice: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeLegacy.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const serialized = TransactionEnvelopeLegacy.serialize(envelope, { // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 *
 * // ... send `serialized` transaction to JSON-RPC `eth_sendRawTransaction`
 * ```
 *
 * @param envelope - The Transaction Envelope to serialize.
 * @param options - Options.
 * @returns The serialized Transaction Envelope.
 */
export function serialize(
  envelope: PartialBy<TransactionEnvelopeLegacy, 'type'>,
  options: serialize.Options = {},
): Serialized {
  const { chainId = 0, gas, data, input, nonce, to, value, gasPrice } = envelope

  assert(envelope)

  let serialized = [
    nonce ? Hex.fromNumber(nonce) : '0x',
    gasPrice ? Hex.fromNumber(gasPrice) : '0x',
    gas ? Hex.fromNumber(gas) : '0x',
    to ?? '0x',
    value ? Hex.fromNumber(value) : '0x',
    data ?? input ?? '0x',
  ]

  const signature = (() => {
    if (options.signature)
      return {
        r: options.signature.r,
        s: options.signature.s,
        v: Signature.yParityToV(options.signature.yParity),
      }

    if (typeof envelope.r === 'undefined' || typeof envelope.s === 'undefined')
      return undefined
    return {
      r: envelope.r,
      s: envelope.s,
      v: envelope.v!,
    }
  })()

  if (signature) {
    const v = (() => {
      // EIP-155 (inferred chainId)
      if (signature.v >= 35) {
        const inferredChainId = Math.floor((signature.v - 35) / 2)
        if (inferredChainId > 0) return signature.v
        return 27 + (signature.v === 35 ? 0 : 1)
      }

      // EIP-155 (explicit chainId)
      if (chainId > 0) return chainId * 2 + 35 + signature.v - 27

      // Pre-EIP-155 (no chainId)
      const v = 27 + (signature.v === 27 ? 0 : 1)
      if (signature.v !== v)
        throw new Signature.InvalidVError({ value: signature.v })
      return v
    })()

    serialized = [
      ...serialized,
      Hex.fromNumber(v),
      signature.r === 0n ? '0x' : Hex.trimLeft(Hex.fromNumber(signature.r)),
      signature.s === 0n ? '0x' : Hex.trimLeft(Hex.fromNumber(signature.s)),
    ]
  } else if (chainId > 0)
    serialized = [...serialized, Hex.fromNumber(chainId), '0x', '0x']

  return Rlp.fromHex(serialized) as never
}

export declare namespace serialize {
  type Options = {
    /** Signature to append to the serialized Transaction Envelope. */
    signature?: Signature.Signature | undefined
  }

  type ErrorType =
    | assert.ErrorType
    | Hex.fromNumber.ErrorType
    | Hex.trimLeft.ErrorType
    | Rlp.fromHex.ErrorType
    | Signature.InvalidVError
    | Errors.GlobalErrorType
}

serialize.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as serialize.ErrorType

/**
 * Converts an {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy} to an {@link ox#TransactionEnvelopeLegacy.Rpc}.
 *
 * @example
 * ```ts twoslash
 * import { RpcRequest, TransactionEnvelopeLegacy, Value } from 'ox'
 *
 * const envelope = TransactionEnvelopeLegacy.from({
 *   chainId: 1,
 *   nonce: 0n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: Value.fromEther('1'),
 * })
 *
 * const envelope_rpc = TransactionEnvelopeLegacy.toRpc(envelope) // [!code focus]
 *
 * const request = RpcRequest.from({
 *   id: 0,
 *   method: 'eth_sendTransaction',
 *   params: [envelope_rpc],
 * })
 * ```
 *
 * @param envelope - The legacy transaction envelope to convert.
 * @returns An RPC-formatted legacy transaction envelope.
 */
export function toRpc(envelope: Omit<TransactionEnvelopeLegacy, 'type'>): Rpc {
  const signature = Signature.extract(envelope)!

  return {
    ...envelope,
    chainId:
      typeof envelope.chainId === 'number'
        ? Hex.fromNumber(envelope.chainId)
        : undefined,
    data: envelope.data ?? envelope.input,
    type: '0x0',
    ...(typeof envelope.gas === 'bigint'
      ? { gas: Hex.fromNumber(envelope.gas) }
      : {}),
    ...(typeof envelope.nonce === 'bigint'
      ? { nonce: Hex.fromNumber(envelope.nonce) }
      : {}),
    ...(typeof envelope.value === 'bigint'
      ? { value: Hex.fromNumber(envelope.value) }
      : {}),
    ...(typeof envelope.gasPrice === 'bigint'
      ? { gasPrice: Hex.fromNumber(envelope.gasPrice) }
      : {}),
    ...(signature
      ? {
          ...Signature.toRpc(signature),
          v: signature.yParity === 0 ? '0x1b' : '0x1c',
        }
      : {}),
  } as never
}

export declare namespace toRpc {
  export type ErrorType = Signature.extract.ErrorType | Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType

/**
 * Validates a {@link ox#TransactionEnvelopeLegacy.TransactionEnvelopeLegacy}. Returns `true` if the envelope is valid, `false` otherwise.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeLegacy, Value } from 'ox'
 *
 * const valid = TransactionEnvelopeLegacy.assert({
 *   gasPrice: 2n ** 256n - 1n + 1n,
 *   chainId: 1,
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 * // @log: false
 * ```
 *
 * @param envelope - The transaction envelope to validate.
 */
export function validate(
  envelope: PartialBy<TransactionEnvelopeLegacy, 'type'>,
) {
  try {
    assert(envelope)
    return true
  } catch {
    return false
  }
}

export declare namespace validate {
  type ErrorType = Errors.GlobalErrorType
}

validate.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as validate.ErrorType
