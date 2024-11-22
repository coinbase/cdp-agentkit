import type { Assign } from './internal/types.js'

import type { PartialBy, UnionPartialBy } from './internal/types.js'

import * as AccessList from './AccessList.js'
import * as Address from './Address.js'
import * as Authorization from './Authorization.js'
import type * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as Rlp from './Rlp.js'
import * as Signature from './Signature.js'
import * as TransactionEnvelope from './TransactionEnvelope.js'
import * as TransactionEnvelopeEip1559 from './TransactionEnvelopeEip1559.js'
import type { Compute } from './internal/types.js'

export type TransactionEnvelopeEip7702<
  signed extends boolean = boolean,
  bigintType = bigint,
  numberType = number,
  type extends string = Type,
> = Compute<
  TransactionEnvelope.Base<type, signed, bigintType, numberType> & {
    /** EIP-2930 Access List. */
    accessList?: AccessList.AccessList | undefined
    /** EIP-7702 Authorization List. */
    authorizationList: Authorization.ListSigned<bigintType, numberType>
    /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
    maxFeePerGas?: bigintType | undefined
    /** Max priority fee per gas (in wei). */
    maxPriorityFeePerGas?: bigintType | undefined
  }
>

export type Rpc<signed extends boolean = boolean> = TransactionEnvelopeEip7702<
  signed,
  Hex.Hex,
  Hex.Hex,
  '0x4'
>

export type Serialized = `${SerializedType}${string}`

export type Signed = TransactionEnvelopeEip7702<true>

export const serializedType = '0x04' as const
export type SerializedType = typeof serializedType

export const type = 'eip7702' as const
export type Type = typeof type

/**
 * Asserts a {@link ox#TransactionEnvelopeEip7702.TransactionEnvelopeEip7702} is valid.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip7702, Value } from 'ox'
 *
 * TransactionEnvelopeEip7702.assert({
 *   authorizationList: [],
 *   maxFeePerGas: 2n ** 256n - 1n + 1n,
 *   chainId: 1,
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 * // @error: FeeCapTooHighError:
 * // @error: The fee cap (`masFeePerGas` = 115792089237316195423570985008687907853269984665640564039457584007913 gwei) cannot be
 * // @error: higher than the maximum allowed value (2^256-1).
 * ```
 *
 * @param envelope - The transaction envelope to assert.
 */
export function assert(
  envelope: PartialBy<TransactionEnvelopeEip7702, 'type'>,
) {
  const { authorizationList } = envelope
  if (authorizationList) {
    for (const authorization of authorizationList) {
      const { address, chainId } = authorization
      if (address) Address.assert(address, { strict: false })
      if (Number(chainId) < 0)
        throw new TransactionEnvelope.InvalidChainIdError({ chainId })
    }
  }
  TransactionEnvelopeEip1559.assert(
    envelope as {} as TransactionEnvelopeEip1559.TransactionEnvelopeEip1559,
  )
}

export declare namespace assert {
  type ErrorType =
    | Address.assert.ErrorType
    | TransactionEnvelope.InvalidChainIdError
    | Errors.GlobalErrorType
}

assert.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as assert.ErrorType

/**
 * Deserializes a {@link ox#TransactionEnvelopeEip7702.TransactionEnvelopeEip7702} from its serialized form.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip7702 } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip7702.deserialize('0x04ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0')
 * // @log: {
 * // @log:   authorizationList: [...],
 * // @log:   type: 'eip7702',
 * // @log:   nonce: 785n,
 * // @log:   maxFeePerGas: 2000000000n,
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
  serialized: Serialized,
): Compute<TransactionEnvelopeEip7702> {
  const transactionArray = Rlp.toHex(Hex.slice(serialized, 1))

  const [
    chainId,
    nonce,
    maxPriorityFeePerGas,
    maxFeePerGas,
    gas,
    to,
    value,
    data,
    accessList,
    authorizationList,
    yParity,
    r,
    s,
  ] = transactionArray as readonly Hex.Hex[]

  if (!(transactionArray.length === 10 || transactionArray.length === 13))
    throw new TransactionEnvelope.InvalidSerializedError({
      attributes: {
        chainId,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        gas,
        to,
        value,
        data,
        accessList,
        authorizationList,
        ...(transactionArray.length > 9
          ? {
              yParity,
              r,
              s,
            }
          : {}),
      },
      serialized,
      type,
    })

  let transaction = {
    chainId: Number(chainId),
    type,
  } as TransactionEnvelopeEip7702
  if (Hex.validate(to) && to !== '0x') transaction.to = to
  if (Hex.validate(gas) && gas !== '0x') transaction.gas = BigInt(gas)
  if (Hex.validate(data) && data !== '0x') transaction.data = data
  if (Hex.validate(nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce)
  if (Hex.validate(value) && value !== '0x') transaction.value = BigInt(value)
  if (Hex.validate(maxFeePerGas) && maxFeePerGas !== '0x')
    transaction.maxFeePerGas = BigInt(maxFeePerGas)
  if (Hex.validate(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
    transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas)
  if (accessList!.length !== 0 && accessList !== '0x')
    transaction.accessList = AccessList.fromTupleList(accessList as never)
  if (authorizationList !== '0x')
    transaction.authorizationList = Authorization.fromTupleList(
      authorizationList as never,
    )

  const signature =
    r && s && yParity ? Signature.fromTuple([yParity, r, s]) : undefined
  if (signature)
    transaction = {
      ...transaction,
      ...signature,
    } as TransactionEnvelopeEip7702

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
 * Converts an arbitrary transaction object into an EIP-7702 Transaction Envelope.
 *
 * @example
 * ```ts twoslash
 * import { Authorization, Secp256k1, TransactionEnvelopeEip7702, Value } from 'ox'
 *
 * const authorization = Authorization.from({
 *   address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   chainId: 1,
 *   nonce: 0n,
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: Authorization.getSignPayload(authorization),
 *   privateKey: '0x...',
 * })
 *
 * const authorizationList = [Authorization.from(authorization, { signature })]
 *
 * const envelope = TransactionEnvelopeEip7702.from({ // [!code focus]
 *   authorizationList, // [!code focus]
 *   chainId: 1, // [!code focus]
 *   maxFeePerGas: Value.fromGwei('10'), // [!code focus]
 *   maxPriorityFeePerGas: Value.fromGwei('1'), // [!code focus]
 *   to: '0x0000000000000000000000000000000000000000', // [!code focus]
 *   value: Value.fromEther('1'), // [!code focus]
 * }) // [!code focus]
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the transaction envelope.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, TransactionEnvelopeEip7702, Value } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip7702.from({
 *   authorizationList: [...],
 *   chainId: 1,
 *   maxFeePerGas: Value.fromGwei('10'),
 *   maxPriorityFeePerGas: Value.fromGwei('1'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeEip7702.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const envelope_signed = TransactionEnvelopeEip7702.from(envelope, { // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   authorizationList: [...],
 * // @log:   chainId: 1,
 * // @log:   maxFeePerGas: 10000000000n,
 * // @log:   maxPriorityFeePerGas: 1000000000n,
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
 * It is possible to instantiate an EIP-7702 Transaction Envelope from a {@link ox#TransactionEnvelopeEip7702.Serialized} value.
 *
 * ```ts twoslash
 * import { TransactionEnvelopeEip7702 } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip7702.from('0x04f858018203118502540be4008504a817c800809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c08477359400e1a001627c687261b0e7f8638af1112efa8a77e23656f6e7945275b19e9deed80261')
 * // @log: {
 * // @log:   authorizationList: [...],
 * // @log:   chainId: 1,
 * // @log:   maxFeePerGas: 10000000000n,
 * // @log:   to: '0x0000000000000000000000000000000000000000',
 * // @log:   type: 'eip7702',
 * // @log:   value: 1000000000000000000n,
 * // @log: }
 * ```
 *
 * @param envelope - The transaction object to convert.
 * @param options - Options.
 * @returns An EIP-7702 Transaction Envelope.
 */
export function from<
  const envelope extends
    | UnionPartialBy<TransactionEnvelopeEip7702, 'type'>
    | Serialized,
  const signature extends Signature.Signature | undefined = undefined,
>(
  envelope:
    | envelope
    | UnionPartialBy<TransactionEnvelopeEip7702, 'type'>
    | Serialized,
  options: from.Options<signature> = {},
): from.ReturnType<envelope, signature> {
  const { signature } = options

  const envelope_ = (
    typeof envelope === 'string' ? deserialize(envelope) : envelope
  ) as TransactionEnvelopeEip7702

  assert(envelope_)

  return {
    ...envelope_,
    ...(signature ? Signature.from(signature) : {}),
    type: 'eip7702',
  } as never
}

export declare namespace from {
  type Options<signature extends Signature.Signature | undefined = undefined> =
    {
      signature?: signature | Signature.Signature | undefined
    }

  type ReturnType<
    envelope extends
      | UnionPartialBy<TransactionEnvelopeEip7702, 'type'>
      | Hex.Hex = TransactionEnvelopeEip7702 | Hex.Hex,
    signature extends Signature.Signature | undefined = undefined,
  > = Compute<
    envelope extends Hex.Hex
      ? TransactionEnvelopeEip7702
      : Assign<
          envelope,
          (signature extends Signature.Signature ? Readonly<signature> : {}) & {
            readonly type: 'eip7702'
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
 * Returns the payload to sign for a {@link ox#TransactionEnvelopeEip7702.TransactionEnvelopeEip7702}.
 *
 * @example
 * The example below demonstrates how to compute the sign payload which can be used
 * with ECDSA signing utilities like {@link ox#Secp256k1.(sign:function)}.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, TransactionEnvelopeEip7702 } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip7702.from({
 *   authorizationList: [...],
 *   chainId: 1,
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * const payload = TransactionEnvelopeEip7702.getSignPayload(envelope) // [!code focus]
 * // @log: '0x...'
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param envelope - The transaction envelope to get the sign payload for.
 * @returns The sign payload.
 */
export function getSignPayload(
  envelope: TransactionEnvelopeEip7702,
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
 * Hashes a {@link ox#TransactionEnvelopeEip7702.TransactionEnvelopeEip7702}. This is the "transaction hash".
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, TransactionEnvelopeEip7702 } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip7702.from({
 *   authorizationList: [...],
 *   chainId: 1,
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeEip7702.getSignPayload(envelope),
 *   privateKey: '0x...'
 * })
 *
 * const envelope_signed = TransactionEnvelopeEip7702.from(envelope, { signature })
 *
 * const hash = TransactionEnvelopeEip7702.hash(envelope_signed) // [!code focus]
 * ```
 *
 * @param envelope - The EIP-7702 Transaction Envelope to hash.
 * @param options - Options.
 * @returns The hash of the transaction envelope.
 */
export function hash<presign extends boolean = false>(
  envelope: TransactionEnvelopeEip7702<presign extends true ? false : true>,
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
 * Serializes a {@link ox#TransactionEnvelopeEip7702.TransactionEnvelopeEip7702}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Authorization, Secp256k1, TransactionEnvelopeEip7702, Value } from 'ox'
 *
 * const authorization = Authorization.from({
 *   address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   chainId: 1,
 *   nonce: 0n,
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: Authorization.getSignPayload(authorization),
 *   privateKey: '0x...',
 * })
 *
 * const authorizationList = [Authorization.from(authorization, { signature })]
 *
 * const envelope = TransactionEnvelopeEip7702.from({
 *   authorizationList,
 *   chainId: 1,
 *   maxFeePerGas: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const serialized = TransactionEnvelopeEip7702.serialize(envelope) // [!code focus]
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the serialized Transaction Envelope.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Secp256k1, TransactionEnvelopeEip7702, Value } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip7702.from({
 *   authorizationList: [...],
 *   chainId: 1,
 *   maxFeePerGas: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeEip7702.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const serialized = TransactionEnvelopeEip7702.serialize(envelope, { // [!code focus]
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
  envelope: PartialBy<TransactionEnvelopeEip7702, 'type'>,
  options: serialize.Options = {},
): Serialized {
  const {
    authorizationList,
    chainId,
    gas,
    nonce,
    to,
    value,
    maxFeePerGas,
    maxPriorityFeePerGas,
    accessList,
    data,
    input,
  } = envelope

  assert(envelope)

  const accessTupleList = AccessList.toTupleList(accessList)
  const authorizationTupleList = Authorization.toTupleList(authorizationList)

  const signature = Signature.extract(options.signature || envelope)

  const serialized = [
    Hex.fromNumber(chainId),
    nonce ? Hex.fromNumber(nonce) : '0x',
    maxPriorityFeePerGas ? Hex.fromNumber(maxPriorityFeePerGas) : '0x',
    maxFeePerGas ? Hex.fromNumber(maxFeePerGas) : '0x',
    gas ? Hex.fromNumber(gas) : '0x',
    to ?? '0x',
    value ? Hex.fromNumber(value) : '0x',
    data ?? input ?? '0x',
    accessTupleList,
    authorizationTupleList,
    ...(signature ? Signature.toTuple(signature) : []),
  ]

  return Hex.concat(serializedType, Rlp.fromHex(serialized)) as Serialized
}

export declare namespace serialize {
  type Options = {
    /** Signature to append to the serialized Transaction Envelope. */
    signature?: Signature.Signature | undefined
  }

  type ErrorType =
    | assert.ErrorType
    | Hex.fromNumber.ErrorType
    | Signature.toTuple.ErrorType
    | Hex.concat.ErrorType
    | Rlp.fromHex.ErrorType
    | Errors.GlobalErrorType
}

serialize.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as serialize.ErrorType

/**
 * Validates a {@link ox#TransactionEnvelopeEip7702.TransactionEnvelopeEip7702}. Returns `true` if the envelope is valid, `false` otherwise.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip7702, Value } from 'ox'
 *
 * const valid = TransactionEnvelopeEip7702.validate({
 *   authorizationList: [],
 *   maxFeePerGas: 2n ** 256n - 1n + 1n,
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
  envelope: PartialBy<TransactionEnvelopeEip7702, 'type'>,
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
