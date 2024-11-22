import * as AccessList from './AccessList.js'
import * as Blobs from './Blobs.js'
import type * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as Kzg from './Kzg.js'
import * as Rlp from './Rlp.js'
import * as Signature from './Signature.js'
import * as TransactionEnvelope from './TransactionEnvelope.js'
import * as TransactionEnvelopeEip1559 from './TransactionEnvelopeEip1559.js'
import type {
  Assign,
  Compute,
  PartialBy,
  UnionPartialBy,
} from './internal/types.js'

export type TransactionEnvelopeEip4844<
  signed extends boolean = boolean,
  bigintType = bigint,
  numberType = number,
  type extends string = Type,
> = Compute<
  TransactionEnvelope.Base<type, signed, bigintType, numberType> & {
    /** EIP-2930 Access List. */
    accessList?: AccessList.AccessList | undefined
    /** Versioned hashes of blobs to be included in the transaction. */
    blobVersionedHashes: readonly Hex.Hex[]
    /** Maximum total fee per gas sender is willing to pay for blob gas (in wei). */
    maxFeePerBlobGas?: bigintType | undefined
    /** Total fee per gas in wei (gasPrice/baseFeePerGas + maxPriorityFeePerGas). */
    maxFeePerGas?: bigintType | undefined
    /** Max priority fee per gas (in wei). */
    maxPriorityFeePerGas?: bigintType | undefined
    /** The sidecars associated with this transaction. When defined, the envelope is in the "network wrapper" format. */
    sidecars?: readonly Blobs.BlobSidecar<Hex.Hex>[] | undefined
  }
>

export type Rpc<signed extends boolean = boolean> = TransactionEnvelopeEip4844<
  signed,
  Hex.Hex,
  Hex.Hex,
  '0x3'
>

export type Serialized = `${SerializedType}${string}`

export const serializedType = '0x03' as const
export type SerializedType = typeof serializedType

export type Signed = TransactionEnvelopeEip4844<true>

export const type = 'eip4844' as const
export type Type = 'eip4844'

/**
 * Asserts a {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844} is valid.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip4844, Value } from 'ox'
 *
 * TransactionEnvelopeEip4844.assert({
 *   blobVersionedHashes: [],
 *   chainId: 1,
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 * // @error: EmptyBlobVersionedHashesError: Blob versioned hashes must not be empty.
 * ```
 *
 * @param envelope - The transaction envelope to assert.
 */
export function assert(
  envelope: PartialBy<TransactionEnvelopeEip4844, 'type'>,
) {
  const { blobVersionedHashes } = envelope
  if (blobVersionedHashes) {
    if (blobVersionedHashes.length === 0)
      throw new Blobs.EmptyBlobVersionedHashesError()
    for (const hash of blobVersionedHashes) {
      const size = Hex.size(hash)
      const version = Hex.toNumber(Hex.slice(hash, 0, 1))
      if (size !== 32)
        throw new Blobs.InvalidVersionedHashSizeError({ hash, size })
      if (version !== Kzg.versionedHashVersion)
        throw new Blobs.InvalidVersionedHashVersionError({
          hash,
          version,
        })
    }
  }
  TransactionEnvelopeEip1559.assert(
    envelope as {} as TransactionEnvelopeEip1559.TransactionEnvelopeEip1559,
  )
}

export declare namespace assert {
  type ErrorType =
    | TransactionEnvelopeEip1559.assert.ErrorType
    | Hex.size.ErrorType
    | Hex.toNumber.ErrorType
    | Hex.slice.ErrorType
    | Blobs.EmptyBlobVersionedHashesError
    | Blobs.InvalidVersionedHashSizeError
    | Blobs.InvalidVersionedHashVersionError
    | Errors.GlobalErrorType
}

assert.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as assert.ErrorType

/**
 * Deserializes a {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844} from its serialized form.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip4844 } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip4844.deserialize('0x03ef0182031184773594008477359400809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c0')
 * // @log: {
 * // @log:   blobVersionedHashes: [...],
 * // @log:   type: 'eip4844',
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
): Compute<TransactionEnvelopeEip4844> {
  const transactionOrWrapperArray = Rlp.toHex(Hex.slice(serialized, 1))

  const hasNetworkWrapper = transactionOrWrapperArray.length === 4

  const transactionArray = hasNetworkWrapper
    ? transactionOrWrapperArray[0]!
    : transactionOrWrapperArray
  const wrapperArray = hasNetworkWrapper
    ? transactionOrWrapperArray.slice(1)
    : []

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
    maxFeePerBlobGas,
    blobVersionedHashes,
    yParity,
    r,
    s,
  ] = transactionArray
  const [blobs, commitments, proofs] = wrapperArray

  if (!(transactionArray.length === 11 || transactionArray.length === 14))
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
    blobVersionedHashes: blobVersionedHashes as Hex.Hex[],
    chainId: Number(chainId),
    type,
  } as TransactionEnvelopeEip4844
  if (Hex.validate(to) && to !== '0x') transaction.to = to
  if (Hex.validate(gas) && gas !== '0x') transaction.gas = BigInt(gas)
  if (Hex.validate(data) && data !== '0x') transaction.data = data
  if (Hex.validate(nonce) && nonce !== '0x') transaction.nonce = BigInt(nonce)
  if (Hex.validate(value) && value !== '0x') transaction.value = BigInt(value)
  if (Hex.validate(maxFeePerBlobGas) && maxFeePerBlobGas !== '0x')
    transaction.maxFeePerBlobGas = BigInt(maxFeePerBlobGas)
  if (Hex.validate(maxFeePerGas) && maxFeePerGas !== '0x')
    transaction.maxFeePerGas = BigInt(maxFeePerGas)
  if (Hex.validate(maxPriorityFeePerGas) && maxPriorityFeePerGas !== '0x')
    transaction.maxPriorityFeePerGas = BigInt(maxPriorityFeePerGas)
  if (accessList?.length !== 0 && accessList !== '0x')
    transaction.accessList = AccessList.fromTupleList(accessList as any)
  if (blobs && commitments && proofs)
    transaction.sidecars = Blobs.toSidecars(blobs as Hex.Hex[], {
      commitments: commitments as Hex.Hex[],
      proofs: proofs as Hex.Hex[],
    })

  const signature =
    r && s && yParity
      ? Signature.fromTuple([yParity as Hex.Hex, r as Hex.Hex, s as Hex.Hex])
      : undefined
  if (signature)
    transaction = {
      ...transaction,
      ...signature,
    } as TransactionEnvelopeEip4844

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
 * Converts an arbitrary transaction object into an EIP-4844 Transaction Envelope.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs, TransactionEnvelopeEip4844, Value } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const blobVersionedHashes = Blobs.toVersionedHashes(blobs, { kzg })
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   chainId: 1,
 *   blobVersionedHashes,
 *   maxFeePerBlobGas: Value.fromGwei('3'),
 *   maxFeePerGas: Value.fromGwei('10'),
 *   maxPriorityFeePerGas: Value.fromGwei('1'),
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
 * // @noErrors
 * import { Blobs, Secp256k1, TransactionEnvelopeEip4844, Value } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const sidecars = Blobs.toSidecars(blobs, { kzg })
 * const blobVersionedHashes = Blobs.sidecarsToVersionedHashes(sidecars)
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   blobVersionedHashes,
 *   chainId: 1,
 *   maxFeePerBlobGas: Value.fromGwei('3'),
 *   maxFeePerGas: Value.fromGwei('10'),
 *   maxPriorityFeePerGas: Value.fromGwei('1'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeEip4844.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const envelope_signed = TransactionEnvelopeEip4844.from(envelope, { // [!code focus]
 *   sidecars, // [!code focus]
 *   signature, // [!code focus]
 * }) // [!code focus]
 * // @log: {
 * // @log:   blobVersionedHashes: [...],
 * // @log:   chainId: 1,
 * // @log:   maxFeePerBlobGas: 3000000000n,
 * // @log:   maxFeePerGas: 10000000000n,
 * // @log:   maxPriorityFeePerGas: 1000000000n,
 * // @log:   to: '0x0000000000000000000000000000000000000000',
 * // @log:   type: 'eip4844',
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
 * It is possible to instantiate an EIP-4844 Transaction Envelope from a {@link ox#TransactionEnvelopeEip4844.Serialized} value.
 *
 * ```ts twoslash
 * import { TransactionEnvelopeEip4844 } from 'ox'
 *
 * const envelope = TransactionEnvelopeEip4844.from('0x03f858018203118502540be4008504a817c800809470997970c51812dc3a010c7d01b50e0d17dc79c8880de0b6b3a764000080c08477359400e1a001627c687261b0e7f8638af1112efa8a77e23656f6e7945275b19e9deed80261')
 * // @log: {
 * // @log:   blobVersionedHashes: [...],
 * // @log:   chainId: 1,
 * // @log:   maxFeePerGas: 10000000000n,
 * // @log:   to: '0x0000000000000000000000000000000000000000',
 * // @log:   type: 'eip4844',
 * // @log:   value: 1000000000000000000n,
 * // @log: }
 * ```
 *
 * @param envelope - The transaction object to convert.
 * @param options - Options.
 * @returns An EIP-4844 Transaction Envelope.
 */
export function from<
  const envelope extends
    | UnionPartialBy<TransactionEnvelopeEip4844, 'type'>
    | Serialized,
  const signature extends Signature.Signature | undefined = undefined,
>(
  envelope:
    | envelope
    | UnionPartialBy<TransactionEnvelopeEip4844, 'type'>
    | Serialized,
  options: from.Options<signature> = {},
): from.ReturnType<envelope, signature> {
  const { signature } = options

  const envelope_ = (
    typeof envelope === 'string' ? deserialize(envelope) : envelope
  ) as TransactionEnvelopeEip4844

  assert(envelope_)

  return {
    ...envelope_,
    ...(signature ? Signature.from(signature) : {}),
    type: 'eip4844',
  } as never
}

export declare namespace from {
  type Options<signature extends Signature.Signature | undefined = undefined> =
    {
      signature?: signature | Signature.Signature | undefined
    }

  type ReturnType<
    envelope extends
      | UnionPartialBy<TransactionEnvelopeEip4844, 'type'>
      | Hex.Hex = TransactionEnvelopeEip4844 | Hex.Hex,
    signature extends Signature.Signature | undefined = undefined,
  > = Compute<
    envelope extends Hex.Hex
      ? TransactionEnvelopeEip4844
      : Assign<
          envelope,
          (signature extends Signature.Signature ? Readonly<signature> : {}) & {
            readonly type: 'eip4844'
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
 * Returns the payload to sign for a {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844}.
 *
 * @example
 * The example below demonstrates how to compute the sign payload which can be used
 * with ECDSA signing utilities like {@link ox#Secp256k1.(sign:function)}.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs, Secp256k1, TransactionEnvelopeEip4844 } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const blobVersionedHashes = Blobs.toVersionedHashes(blobs, { kzg })
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   blobVersionedHashes,
 *   chainId: 1,
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * const payload = TransactionEnvelopeEip4844.getSignPayload(envelope) // [!code focus]
 * // @log: '0x...'
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param envelope - The transaction envelope to get the sign payload for.
 * @returns The sign payload.
 */
export function getSignPayload(
  envelope: TransactionEnvelopeEip4844,
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
 * Hashes a {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844}. This is the "transaction hash".
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs, TransactionEnvelopeEip4844 } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const blobVersionedHashes = Blobs.toVersionedHashes(blobs, { kzg })
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   blobVersionedHashes,
 *   chainId: 1,
 *   nonce: 0n,
 *   maxFeePerGas: 1000000000n,
 *   gas: 21000n,
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: 1000000000000000000n,
 * })
 *
 * const hash = TransactionEnvelopeEip4844.hash(envelope) // [!code focus]
 * ```
 *
 * @param envelope - The EIP-4844 Transaction Envelope to hash.
 * @param options - Options.
 * @returns The hash of the transaction envelope.
 */
export function hash<presign extends boolean = false>(
  envelope: TransactionEnvelopeEip4844<presign extends true ? false : true>,
  options: hash.Options<presign> = {},
): hash.ReturnType {
  const { presign } = options
  return Hash.keccak256(
    serialize({
      ...envelope,
      ...(presign
        ? {
            sidecars: undefined,
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
 * Serializes a {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs, TransactionEnvelopeEip4844 } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const blobVersionedHashes = Blobs.toVersionedHashes(blobs, { kzg })
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   blobVersionedHashes,
 *   chainId: 1,
 *   maxFeePerGas: Value.fromGwei('10'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const serialized = TransactionEnvelopeEip4844.serialize(envelope) // [!code focus]
 * ```
 *
 * @example
 * ### Attaching Signatures
 *
 * It is possible to attach a `signature` to the serialized Transaction Envelope.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs, Secp256k1, TransactionEnvelopeEip4844, Value } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const sidecars = Blobs.toSidecars(blobs, { kzg })
 * const blobVersionedHashes = Blobs.sidecarsToVersionedHashes(blobs)
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   blobVersionedHashes,
 *   chainId: 1,
 *   maxFeePerBlobGas: Value.fromGwei('3'),
 *   maxFeePerGas: Value.fromGwei('10'),
 *   maxPriorityFeePerGas: Value.fromGwei('1'),
 *   to: '0x0000000000000000000000000000000000000000',
 *   value: Value.fromEther('1'),
 * })
 *
 * const signature = Secp256k1.sign({
 *   payload: TransactionEnvelopeEip4844.getSignPayload(envelope),
 *   privateKey: '0x...',
 * })
 *
 * const serialized = TransactionEnvelopeEip4844.serialize(envelope, { // [!code focus]
 *   sidecars, // [!code focus]
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
  envelope: PartialBy<TransactionEnvelopeEip4844, 'type'>,
  options: serialize.Options = {},
): Serialized {
  const {
    blobVersionedHashes,
    chainId,
    gas,
    nonce,
    to,
    value,
    maxFeePerBlobGas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    accessList,
    data,
  } = envelope

  assert(envelope)

  const accessTupleList = AccessList.toTupleList(accessList)

  const signature = Signature.extract(options.signature || envelope)

  const serialized = [
    Hex.fromNumber(chainId),
    nonce ? Hex.fromNumber(nonce) : '0x',
    maxPriorityFeePerGas ? Hex.fromNumber(maxPriorityFeePerGas) : '0x',
    maxFeePerGas ? Hex.fromNumber(maxFeePerGas) : '0x',
    gas ? Hex.fromNumber(gas) : '0x',
    to ?? '0x',
    value ? Hex.fromNumber(value) : '0x',
    data ?? '0x',
    accessTupleList,
    maxFeePerBlobGas ? Hex.fromNumber(maxFeePerBlobGas) : '0x',
    blobVersionedHashes ?? [],
    ...(signature ? Signature.toTuple(signature) : []),
  ] as const

  const sidecars = options.sidecars || envelope.sidecars
  const blobs: Hex.Hex[] = []
  const commitments: Hex.Hex[] = []
  const proofs: Hex.Hex[] = []
  if (sidecars)
    for (let i = 0; i < sidecars.length; i++) {
      const { blob, commitment, proof } = sidecars[i]!
      blobs.push(blob)
      commitments.push(commitment)
      proofs.push(proof)
    }

  return Hex.concat(
    '0x03',
    sidecars
      ? // If sidecars are provided, envelope turns into a "network wrapper":
        Rlp.fromHex([serialized, blobs, commitments, proofs])
      : // Otherwise, standard envelope is used:
        Rlp.fromHex(serialized),
  ) as Serialized
}

export declare namespace serialize {
  type Options = {
    /** Signature to append to the serialized Transaction Envelope. */
    signature?: Signature.Signature | undefined
    /** Sidecars to append to the serialized Transaction Envelope. */
    sidecars?: Blobs.BlobSidecars<Hex.Hex> | undefined
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
 * Converts an {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844} to an {@link ox#TransactionEnvelopeEip4844.Rpc}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs, RpcRequest, TransactionEnvelopeEip4844, Value } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const blobVersionedHashes = Blobs.toVersionedHashes(blobs, { kzg })
 *
 * const envelope = TransactionEnvelopeEip4844.from({
 *   blobVersionedHashes,
 *   chainId: 1,
 *   nonce: 0n,
 *   gas: 21000n,
 *   maxFeePerBlobGas: Value.fromGwei('20'),
 *   to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *   value: Value.fromEther('1'),
 * })
 *
 * const envelope_rpc = TransactionEnvelopeEip4844.toRpc(envelope) // [!code focus]
 *
 * const request = RpcRequest.from({
 *   id: 0,
 *   method: 'eth_sendTransaction',
 *   params: [envelope_rpc],
 * })
 * ```
 *
 * @param envelope - The EIP-4844 transaction envelope to convert.
 * @returns An RPC-formatted EIP-4844 transaction envelope.
 */
export function toRpc(envelope: Omit<TransactionEnvelopeEip4844, 'type'>): Rpc {
  const signature = Signature.extract(envelope)

  return {
    ...envelope,
    chainId: Hex.fromNumber(envelope.chainId),
    data: envelope.data ?? envelope.input,
    ...(typeof envelope.gas === 'bigint'
      ? { gas: Hex.fromNumber(envelope.gas) }
      : {}),
    ...(typeof envelope.nonce === 'bigint'
      ? { nonce: Hex.fromNumber(envelope.nonce) }
      : {}),
    ...(typeof envelope.value === 'bigint'
      ? { value: Hex.fromNumber(envelope.value) }
      : {}),
    ...(typeof envelope.maxFeePerBlobGas === 'bigint'
      ? { maxFeePerBlobGas: Hex.fromNumber(envelope.maxFeePerBlobGas) }
      : {}),
    ...(typeof envelope.maxFeePerGas === 'bigint'
      ? { maxFeePerGas: Hex.fromNumber(envelope.maxFeePerGas) }
      : {}),
    ...(typeof envelope.maxPriorityFeePerGas === 'bigint'
      ? { maxPriorityFeePerGas: Hex.fromNumber(envelope.maxPriorityFeePerGas) }
      : {}),
    type: '0x3',
    ...(signature ? Signature.toRpc(signature) : {}),
  } as never
}

export declare namespace toRpc {
  export type ErrorType = Signature.extract.ErrorType | Errors.GlobalErrorType
}

toRpc.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toRpc.ErrorType

/**
 * Validates a {@link ox#TransactionEnvelopeEip4844.TransactionEnvelopeEip4844}. Returns `true` if the envelope is valid, `false` otherwise.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip4844, Value } from 'ox'
 *
 * const valid = TransactionEnvelopeEip4844.assert({
 *   blobVersionedHashes: [],
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
  envelope: PartialBy<TransactionEnvelopeEip4844, 'type'>,
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
