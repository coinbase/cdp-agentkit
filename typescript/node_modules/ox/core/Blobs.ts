import * as Bytes from './Bytes.js'
import * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as Kzg from './Kzg.js'
import * as Cursor from './internal/cursor.js'
import type { Compute, Mutable, OneOf, UnionCompute } from './internal/types.js'

/** Blob limit per transaction. */
const blobsPerTransaction = 6

/** The number of bytes in a BLS scalar field element. */
export const bytesPerFieldElement = 32

/** The number of field elements in a blob. */
export const fieldElementsPerBlob = 4096

/** The number of bytes in a blob. */
export const bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob

/** Blob bytes limit per transaction. */
export const maxBytesPerTransaction =
  bytesPerBlob * blobsPerTransaction -
  // terminator byte (0x80).
  1 -
  // zero byte (0x00) appended to each field element.
  1 * fieldElementsPerBlob * blobsPerTransaction

/** Root type for a Blob. */
export type Blob<type extends Hex.Hex | Bytes.Bytes = Hex.Hex | Bytes.Bytes> =
  type

/** A list of {@link ox#Blobs.Blob}. */
export type Blobs<type extends Hex.Hex | Bytes.Bytes = Hex.Hex | Bytes.Bytes> =
  readonly Blob<type>[]

/** Type for a Blob Sidecar that contains a blob, as well as its KZG commitment and proof. */
export type BlobSidecar<
  type extends Hex.Hex | Bytes.Bytes = Hex.Hex | Bytes.Bytes,
> = Compute<{
  /** The blob associated with the transaction. */
  blob: type
  /** The KZG commitment corresponding to this blob. */
  commitment: type
  /** The KZG proof corresponding to this blob and commitment. */
  proof: type
}>

/**
 * Transform a list of Commitments to Blob Versioned Hashes.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, { kzg })
 * const versionedHashes = Blobs.commitmentsToVersionedHashes(commitments) // [!code focus]
 * // @log: ['0x...', '0x...']
 * ```
 *
 * @example
 * ### Configuring Return Type
 *
 * It is possible to configure the return type for the Versioned Hashes with the `as` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, { kzg })
 * const versionedHashes = Blobs.commitmentsToVersionedHashes(commitments, {
 *   as: 'Bytes', // [!code focus]
 * })
 * // @log: [Uint8Array [ ... ], Uint8Array [ ... ]]
 * ```
 *
 * @example
 * ### Versioning Hashes
 *
 * It is possible to configure the version for the Versioned Hashes with the `version` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, { kzg })
 * const versionedHashes = Blobs.commitmentsToVersionedHashes(commitments, {
 *   version: 2, // [!code focus]
 * })
 * ```
 *
 * @param commitments - A list of commitments.
 * @param options - Options.
 * @returns A list of Blob Versioned Hashes.
 */
export function commitmentsToVersionedHashes<
  const commitments extends readonly Bytes.Bytes[] | readonly Hex.Hex[],
  as extends 'Hex' | 'Bytes' =
    | (commitments extends readonly Hex.Hex[] ? 'Hex' : never)
    | (commitments extends readonly Bytes.Bytes[] ? 'Bytes' : never),
>(
  commitments: commitments | readonly Bytes.Bytes[] | readonly Hex.Hex[],
  options: commitmentsToVersionedHashes.Options<as> = {},
): commitmentsToVersionedHashes.ReturnType<as> {
  const { version } = options

  const as =
    options.as ?? (typeof commitments[0] === 'string' ? 'Hex' : 'Bytes')

  const hashes: Uint8Array[] | Hex.Hex[] = []
  for (const commitment of commitments) {
    hashes.push(
      commitmentToVersionedHash(commitment, {
        as,
        version,
      }) as never,
    )
  }
  return hashes as never
}

export declare namespace commitmentsToVersionedHashes {
  type Options<as extends 'Hex' | 'Bytes' | undefined = undefined> = {
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
    /** Version to tag onto the hashes. */
    version?: number | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? readonly Bytes.Bytes[] : never)
    | (as extends 'Hex' ? readonly Hex.Hex[] : never)

  type ErrorType = Errors.GlobalErrorType
}

commitmentsToVersionedHashes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as commitmentsToVersionedHashes.ErrorType

/**
 * Transform a Commitment to its Blob Versioned Hash.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const [commitment] = Blobs.toCommitments(blobs, { kzg })
 * const versionedHash = Blobs.commitmentToVersionedHash(commitment) // [!code focus]
 * ```
 *
 * @example
 * ### Configuring Return Type
 *
 * It is possible to configure the return type for the Versioned Hash with the `as` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const [commitment] = Blobs.toCommitments(blobs, { kzg })
 * const versionedHashes = Blobs.commitmentToVersionedHash(commitment, {
 *   as: 'Bytes', // [!code focus]
 * })
 * // @log: [Uint8Array [ ... ], Uint8Array [ ... ]]
 * ```
 *
 * @example
 * ### Versioning Hashes
 *
 * It is possible to configure the version for the Versioned Hash with the `version` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const [commitment] = Blobs.toCommitments(blobs, { kzg })
 * const versionedHashes = Blobs.commitmentToVersionedHash(commitment, {
 *   version: 2, // [!code focus]
 * })
 * ```
 *
 * @param commitment - The commitment.
 * @param options - Options.
 * @returns The Blob Versioned Hash.
 */
export function commitmentToVersionedHash<
  const commitment extends Hex.Hex | Bytes.Bytes,
  as extends 'Hex' | 'Bytes' =
    | (commitment extends Hex.Hex ? 'Hex' : never)
    | (commitment extends Bytes.Bytes ? 'Bytes' : never),
>(
  commitment: commitment | Hex.Hex | Bytes.Bytes,
  options: commitmentToVersionedHash.Options<as> = {},
): commitmentToVersionedHash.ReturnType<as> {
  const { version = 1 } = options
  const as = options.as ?? (typeof commitment === 'string' ? 'Hex' : 'Bytes')

  const versionedHash = Hash.sha256(commitment, { as: 'Bytes' })
  versionedHash.set([version], 0)
  return (
    as === 'Bytes' ? versionedHash : Hex.fromBytes(versionedHash)
  ) as commitmentToVersionedHash.ReturnType<as>
}

export declare namespace commitmentToVersionedHash {
  type Options<as extends 'Hex' | 'Bytes' | undefined = undefined> = {
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
    /** Version to tag onto the hash. */
    version?: number | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? Bytes.Bytes : never)
    | (as extends 'Hex' ? Hex.Hex : never)

  type ErrorType = Errors.GlobalErrorType
}

commitmentToVersionedHash.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as commitmentToVersionedHash.ErrorType

/**
 * Transforms arbitrary data to {@link ox#Blobs.Blobs}.
 *
 * @example
 * ```ts twoslash
 * import { Blobs } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * ```
 *
 * @example
 * ### Creating Blobs from a String
 *
 * An example of creating Blobs from a string using  {@link ox#Hex.(from:function)}:
 *
 * ```ts twoslash
 * import { Blobs, Hex } from 'ox'
 *
 * const blobs = Blobs.from(Hex.fromString('Hello world!'))
 * ```
 *
 * @example
 * ### Configuring Return Type
 *
 * It is possible to configure the return type for the Blobs with the `as` option.
 *
 * ```ts twoslash
 * import { Blobs } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef', { as: 'Bytes' })
 * //    ^?
 *
 *
 * ```
 *
 * @param data - The data to convert to {@link ox#Blobs.Blobs}.
 * @param options - Options.
 * @returns The {@link ox#Blobs.Blobs}.
 */
export function from<
  const data extends Hex.Hex | Bytes.Bytes,
  as extends 'Hex' | 'Bytes' =
    | (data extends Hex.Hex ? 'Hex' : never)
    | (data extends Bytes.Bytes ? 'Bytes' : never),
>(
  data: data | Hex.Hex | Bytes.Bytes,
  options: from.Options<as> = {},
): from.ReturnType<as> {
  const as = options.as ?? (typeof data === 'string' ? 'Hex' : 'Bytes')
  const data_ = (
    typeof data === 'string' ? Bytes.fromHex(data) : data
  ) as Bytes.Bytes

  const size_ = Bytes.size(data_)
  if (!size_) throw new EmptyBlobError()
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_,
    })

  const blobs = []

  let active = true
  let position = 0
  while (active) {
    const blob = Cursor.create(new Uint8Array(bytesPerBlob))

    let size = 0
    while (size < fieldElementsPerBlob) {
      const bytes = data_.slice(position, position + (bytesPerFieldElement - 1))

      // Push a zero byte so the field element doesn't overflow the BLS modulus.
      blob.pushByte(0x00)

      // Push the current segment of data bytes.
      blob.pushBytes(bytes)

      // If we detect that the current segment of data bytes is less than 31 bytes,
      // we can stop processing and push a terminator byte to indicate the end of the blob.
      if (bytes.length < 31) {
        blob.pushByte(0x80)
        active = false
        break
      }

      size++
      position += 31
    }

    blobs.push(blob)
  }

  return (
    as === 'Bytes'
      ? blobs.map((x) => x.bytes)
      : blobs.map((x) => Hex.fromBytes(x.bytes))
  ) as never
}

export declare namespace from {
  type Options<as extends 'Hex' | 'Bytes' | undefined = undefined> = {
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? readonly Bytes.Bytes[] : never)
    | (as extends 'Hex' ? readonly Hex.Hex[] : never)

  type ErrorType =
    | BlobSizeTooLargeError
    | EmptyBlobError
    | Bytes.fromHex.ErrorType
    | Hex.fromBytes.ErrorType
    | Cursor.create.ErrorType
    | Bytes.size.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
from.parseError = (error: unknown) => error as from.ErrorType

/**
 * Transforms a list of {@link ox#Blobs.BlobSidecars} to their Blob Versioned Hashes.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const sidecars = Blobs.toSidecars(blobs, { kzg })
 * const versionedHashes = Blobs.sidecarsToVersionedHashes(sidecars) // [!code focus]
 * ```
 *
 * @example
 * ### Configuring Return Type
 *
 * It is possible to configure the return type for the Versioned Hashes with the `as` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const sidecars = Blobs.toSidecars(blobs, { kzg })
 * const versionedHashes = Blobs.sidecarsToVersionedHashes(sidecars, {
 *   as: 'Bytes', // [!code focus]
 * })
 * // @log: [Uint8Array [ ... ], Uint8Array [ ... ]]
 * ```
 *
 * @example
 * ### Versioning Hashes
 *
 * It is possible to configure the version for the Versioned Hashes with the `version` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const sidecars = Blobs.toSidecars(blobs, { kzg })
 * const versionedHashes = Blobs.sidecarsToVersionedHashes(sidecars, {
 *   version: 2, // [!code focus]
 * })
 * ```
 *
 * @param sidecars - The {@link ox#Blobs.BlobSidecars} to transform to Blob Versioned Hashes.
 * @param options - Options.
 * @returns The versioned hashes.
 */
export function sidecarsToVersionedHashes<
  const sidecars extends BlobSidecars,
  as extends 'Hex' | 'Bytes' =
    | (sidecars extends BlobSidecars<Hex.Hex> ? 'Hex' : never)
    | (sidecars extends BlobSidecars<Bytes.Bytes> ? 'Bytes' : never),
>(
  sidecars: sidecars | BlobSidecars,
  options: sidecarsToVersionedHashes.Options<as> = {},
): sidecarsToVersionedHashes.ReturnType<as> {
  const { version } = options

  const as =
    options.as ?? (typeof sidecars[0]!.blob === 'string' ? 'Hex' : 'Bytes')

  const hashes: Uint8Array[] | Hex.Hex[] = []
  for (const { commitment } of sidecars) {
    hashes.push(
      commitmentToVersionedHash(commitment, {
        as,
        version,
      }) as any,
    )
  }
  return hashes as any
}

export declare namespace sidecarsToVersionedHashes {
  type Options<as extends 'Hex' | 'Bytes' | undefined = undefined> = {
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
    /** Version to tag onto the hashes. */
    version?: number | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? readonly Bytes.Bytes[] : never)
    | (as extends 'Hex' ? readonly Hex.Hex[] : never)

  type ErrorType = commitmentToVersionedHash.ErrorType | Errors.GlobalErrorType
}

sidecarsToVersionedHashes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as sidecarsToVersionedHashes.ErrorType

/**
 * Transforms Ox-shaped {@link ox#Blobs.Blobs} into the originating data.
 *
 * @example
 * ```ts twoslash
 * import { Blobs, Hex } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const data = Blobs.to(blobs) // [!code focus]
 * // @log: '0xdeadbeef'
 * ```
 *
 * @example
 * ### Configuring Return Type
 *
 * It is possible to configure the return type with second argument.
 *
 * ```ts twoslash
 * import { Blobs } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const data = Blobs.to(blobs, 'Bytes')
 * // @log: Uint8Array [ 13, 174, 190, 239 ]
 * ```
 *
 * @param blobs - The {@link ox#Blobs.Blobs} to transform.
 * @param to - The type to transform to.
 * @returns The originating data.
 */
export function to<
  const blobs extends Blobs<Hex.Hex> | Blobs<Bytes.Bytes>,
  to extends 'Hex' | 'Bytes' =
    | (blobs extends Blobs<Hex.Hex> ? 'Hex' : never)
    | (blobs extends Blobs<Bytes.Bytes> ? 'Bytes' : never),
>(
  blobs: blobs | Blobs<Hex.Hex> | Blobs<Bytes.Bytes>,
  to?: to | 'Hex' | 'Bytes' | undefined,
): to.ReturnType<to> {
  const to_ = to ?? (typeof blobs[0] === 'string' ? 'Hex' : 'Bytes')
  const blobs_ = (
    typeof blobs[0] === 'string'
      ? blobs.map((x) => Bytes.fromHex(x as Hex.Hex))
      : blobs
  ) as Bytes.Bytes[]

  const length = blobs_.reduce((length, blob) => length + blob.length, 0)
  const data = Cursor.create(new Uint8Array(length))
  let active = true

  for (const blob of blobs_) {
    const cursor = Cursor.create(blob)
    while (active && cursor.position < blob.length) {
      // First byte will be a zero 0x00 byte – we can skip.
      cursor.incrementPosition(1)

      let consume = 31
      if (blob.length - cursor.position < 31)
        consume = blob.length - cursor.position

      for (const _ in Array.from({ length: consume })) {
        const byte = cursor.readByte()
        const isTerminator =
          byte === 0x80 && !cursor.inspectBytes(cursor.remaining).includes(0x80)
        if (isTerminator) {
          active = false
          break
        }
        data.pushByte(byte)
      }
    }
  }

  const trimmedData = data.bytes.slice(0, data.position)
  return (to_ === 'Hex' ? Hex.fromBytes(trimmedData) : trimmedData) as never
}

export declare namespace to {
  type ReturnType<to extends 'Hex' | 'Bytes' = 'Hex'> =
    | (to extends 'Bytes' ? Bytes.Bytes : never)
    | (to extends 'Hex' ? Hex.Hex : never)

  type ErrorType =
    | Hex.fromBytes.ErrorType
    | Bytes.fromHex.ErrorType
    | Cursor.create.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
to.parseError = (error: unknown) => error as to.ErrorType

/**
 * Transforms Ox-shaped {@link ox#Blobs.Blobs} into the originating data.
 *
 * @example
 * ```ts twoslash
 * import { Blobs, Hex } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const data = Blobs.toHex(blobs) // [!code focus]
 * // @log: '0xdeadbeef'
 * ```
 */
export function toHex(
  blobs: Blobs<Hex.Hex> | Blobs<Bytes.Bytes>,
): toHex.ReturnType {
  return to(blobs, 'Hex')
}

export declare namespace toHex {
  type ReturnType = to.ReturnType<'Hex'>
  type ErrorType = to.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
toHex.parseError = (error: unknown) => error as toHex.ErrorType

/**
 * Transforms Ox-shaped {@link ox#Blobs.Blobs} into the originating data.
 *
 * @example
 * ```ts
 * import { Blobs, Hex } from 'ox'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const data = Blobs.toBytes(blobs) // [!code focus]
 * // @log: Uint8Array [ 13, 174, 190, 239 ]
 * ```
 */
export function toBytes(
  blobs: Blobs<Hex.Hex> | Blobs<Bytes.Bytes>,
): toBytes.ReturnType {
  return to(blobs, 'Bytes')
}

/* v8 ignore next */
toBytes.parseError = (error: unknown) => error as toBytes.ErrorType

/**
 * Compute commitments from a list of {@link ox#Blobs.Blobs}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, { kzg }) // [!code focus]
 * ```
 *
 * @example
 * ### Configuring Return Type
 *
 * It is possible to configure the return type with the `as` option.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, {
 *   as: 'Bytes', // [!code focus]
 *   kzg,
 * })
 * // @log: [Uint8Array [ ... ], Uint8Array [ ... ]]
 * ```
 *
 * @param blobs - The {@link ox#Blobs.Blobs} to transform to commitments.
 * @param options - Options.
 * @returns The commitments.
 */
export function toCommitments<
  const blobs extends Blobs<Bytes.Bytes> | Blobs<Hex.Hex>,
  as extends 'Hex' | 'Bytes' =
    | (blobs extends Blobs<Hex.Hex> ? 'Hex' : never)
    | (blobs extends Blobs<Bytes.Bytes> ? 'Bytes' : never),
>(
  blobs: blobs | Blobs<Bytes.Bytes> | Blobs<Hex.Hex>,
  options: toCommitments.Options<as>,
): toCommitments.ReturnType<as> {
  const { kzg } = options

  const as = options.as ?? (typeof blobs[0] === 'string' ? 'Hex' : 'Bytes')
  const blobs_ = (
    typeof blobs[0] === 'string'
      ? blobs.map((x) => Bytes.fromHex(x as any))
      : blobs
  ) as Bytes.Bytes[]

  const commitments: Bytes.Bytes[] = []
  for (const blob of blobs_)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)))

  return (
    as === 'Bytes' ? commitments : commitments.map((x) => Hex.fromBytes(x))
  ) as never
}

export declare namespace toCommitments {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex'> = {
    /** KZG implementation. */
    kzg: Pick<Kzg.Kzg, 'blobToKzgCommitment'>
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex'> = Compute<
    | (as extends 'Bytes' ? readonly Bytes.Bytes[] : never)
    | (as extends 'Hex' ? readonly Hex.Hex[] : never)
  >

  type ErrorType =
    | Bytes.fromHex.ErrorType
    | Hex.fromBytes.ErrorType
    | Errors.GlobalErrorType
}

toCommitments.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toCommitments.ErrorType

export declare namespace toBytes {
  type ReturnType = to.ReturnType<'Bytes'>
  type ErrorType = to.ErrorType | Errors.GlobalErrorType
}

/**
 * Compute the proofs for a list of {@link ox#Blobs.Blobs} and their commitments.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'viem'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, { kzg })
 * const proofs = Blobs.toProofs(blobs, { commitments, kzg }) // [!code focus]
 * ```
 *
 * @param blobs - The {@link ox#Blobs.Blobs} to compute proofs for.
 * @param options - Options.
 * @returns The Blob proofs.
 */
export function toProofs<
  const blobs extends readonly Bytes.Bytes[] | readonly Hex.Hex[],
  const commitments extends readonly Bytes.Bytes[] | readonly Hex.Hex[],
  as extends 'Hex' | 'Bytes' =
    | (blobs extends readonly Hex.Hex[] ? 'Hex' : never)
    | (blobs extends readonly Bytes.Bytes[] ? 'Bytes' : never),
>(
  blobs: blobs | Blobs<Bytes.Bytes> | Blobs<Hex.Hex>,
  options: toProofs.Options<blobs, commitments, as>,
): toProofs.ReturnType<as> {
  const { kzg } = options

  const as = options.as ?? (typeof blobs[0] === 'string' ? 'Hex' : 'Bytes')

  const blobs_ = (
    typeof blobs[0] === 'string'
      ? blobs.map((x) => Bytes.fromHex(x as any))
      : blobs
  ) as Bytes.Bytes[]
  const commitments = (
    typeof options.commitments[0] === 'string'
      ? options.commitments.map((x) => Bytes.fromHex(x as any))
      : options.commitments
  ) as Bytes.Bytes[]

  const proofs: Bytes.Bytes[] = []
  for (let i = 0; i < blobs_.length; i++) {
    const blob = blobs_[i]!
    const commitment = commitments[i]!
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)))
  }

  return (
    as === 'Bytes' ? proofs : proofs.map((x) => Hex.fromBytes(x))
  ) as never
}

export declare namespace toProofs {
  type Options<
    blobs extends Blobs<Bytes.Bytes> | Blobs<Hex.Hex> =
      | Blobs<Bytes.Bytes>
      | Blobs<Hex.Hex>,
    commitments extends readonly Bytes.Bytes[] | readonly Hex.Hex[] =
      | readonly Bytes.Bytes[]
      | readonly Hex.Hex[],
    as extends 'Hex' | 'Bytes' =
      | (blobs extends Blobs<Hex.Hex> ? 'Hex' : never)
      | (blobs extends Blobs<Bytes.Bytes> ? 'Bytes' : never),
  > = {
    /** Commitments for the blobs. */
    commitments: (commitments | readonly Bytes.Bytes[] | readonly Hex.Hex[]) &
      (commitments extends blobs
        ? {}
        : `commitments must be the same type as blobs`)
    /** KZG implementation. */
    kzg: Pick<Kzg.Kzg, 'computeBlobKzgProof'>
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex' | 'Bytes'> =
    | (as extends 'Bytes' ? readonly Bytes.Bytes[] : never)
    | (as extends 'Hex' ? readonly Hex.Hex[] : never)

  type ErrorType =
    | Hex.fromBytes.ErrorType
    | Bytes.fromHex.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
toProofs.parseError = (error: unknown) => error as toProofs.ErrorType

/**
 * Transforms {@link ox#Blobs.Blobs} into a {@link ox#Blobs.BlobSidecars} array.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const sidecars = Blobs.toSidecars(blobs, { kzg }) // [!code focus]
 * ```
 *
 * @example
 * You can also provide your own commitments and proofs if you do not want `toSidecars`
 * to compute them.
 *
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const commitments = Blobs.toCommitments(blobs, { kzg })
 * const proofs = Blobs.toProofs(blobs, { commitments, kzg })
 *
 * const sidecars = Blobs.toSidecars(blobs, { commitments, kzg, proofs }) // [!code focus]
 * ```
 *
 * @param blobs - The {@link ox#Blobs.Blobs} to transform into {@link ox#Blobs.BlobSidecars}.
 * @param options - Options.
 * @returns The {@link ox#Blobs.BlobSidecars}.
 */
export function toSidecars<
  const blobs extends Blobs<Hex.Hex> | Blobs<Bytes.Bytes>,
>(
  blobs: blobs,
  options: toSidecars.Options<blobs>,
): toSidecars.ReturnType<blobs> {
  const { kzg } = options

  const commitments = options.commitments ?? toCommitments(blobs, { kzg: kzg! })
  const proofs =
    options.proofs ??
    toProofs(blobs, { commitments: commitments as any, kzg: kzg! })

  const sidecars: Mutable<BlobSidecars> = []
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i]!,
      commitment: commitments[i]!,
      proof: proofs[i]!,
    })

  return sidecars as never
}

export declare namespace toSidecars {
  type Options<
    blobs extends Blobs<Hex.Hex> | Blobs<Bytes.Bytes> =
      | Blobs<Hex.Hex>
      | Blobs<Bytes.Bytes>,
  > = {
    kzg?: Kzg.Kzg | undefined
  } & OneOf<
    | {}
    | {
        /** Commitment for each blob. */
        commitments: blobs | readonly Hex.Hex[] | readonly Bytes.Bytes[]
        /** Proof for each blob. */
        proofs: blobs | readonly Hex.Hex[] | readonly Bytes.Bytes[]
      }
  >

  type ReturnType<blobs extends Blobs<Hex.Hex> | Blobs<Bytes.Bytes>> =
    UnionCompute<
      | (blobs extends Blobs<Hex.Hex> ? BlobSidecars<Hex.Hex> : never)
      | (blobs extends Blobs<Bytes.Bytes> ? BlobSidecars<Bytes.Bytes> : never)
    >

  type ErrorType = Errors.GlobalErrorType
}

toSidecars.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toSidecars.ErrorType

/**
 * Compute Blob Versioned Hashes from a list of {@link ox#Blobs.Blobs}.
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Blobs } from 'ox'
 * import { kzg } from './kzg'
 *
 * const blobs = Blobs.from('0xdeadbeef')
 * const versionedHashes = Blobs.toVersionedHashes(blobs, { kzg }) // [!code focus]
 * ```
 *
 * @param blobs - The {@link ox#Blobs.Blobs} to transform into Blob Versioned Hashes.
 * @param options - Options.
 * @returns The Blob Versioned Hashes.
 */
export function toVersionedHashes<
  const blobs extends Blobs<Bytes.Bytes> | Blobs<Hex.Hex>,
  as extends 'Hex' | 'Bytes' =
    | (blobs extends Blobs<Hex.Hex> ? 'Hex' : never)
    | (blobs extends Blobs<Bytes.Bytes> ? 'Bytes' : never),
>(
  blobs: blobs | Blobs<Bytes.Bytes> | Blobs<Hex.Hex>,
  options: toVersionedHashes.Options<as>,
): toVersionedHashes.ReturnType<as> {
  const commitments = toCommitments(blobs, options)
  return commitmentsToVersionedHashes(commitments, options)
}

export declare namespace toVersionedHashes {
  type Options<as extends 'Hex' | 'Bytes' = 'Hex'> = {
    /** KZG implementation. */
    kzg: Pick<Kzg.Kzg, 'blobToKzgCommitment'>
    /** Return type. */
    as?: as | 'Hex' | 'Bytes' | undefined
  }

  type ReturnType<as extends 'Hex' | 'Bytes' = 'Hex'> = Compute<
    | (as extends 'Bytes' ? readonly Bytes.Bytes[] : never)
    | (as extends 'Hex' ? readonly Hex.Hex[] : never)
  >

  type ErrorType =
    | toCommitments.ErrorType
    | commitmentsToVersionedHashes.ErrorType
    | Errors.GlobalErrorType
}

toVersionedHashes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as toVersionedHashes.ErrorType

/** A list of {@link ox#Blobs.BlobSidecar}. */
export type BlobSidecars<
  type extends Hex.Hex | Bytes.Bytes = Hex.Hex | Bytes.Bytes,
> = readonly Compute<BlobSidecar<type>>[]

/** Thrown when the blob size is too large. */
export class BlobSizeTooLargeError extends Errors.BaseError {
  override readonly name = 'Blobs.BlobSizeTooLargeError'
  constructor({ maxSize, size }: { maxSize: number; size: number }) {
    super('Blob size is too large.', {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size} bytes`],
    })
  }
}

/** Thrown when the blob is empty. */
export class EmptyBlobError extends Errors.BaseError {
  override readonly name = 'Blobs.EmptyBlobError'
  constructor() {
    super('Blob data must not be empty.')
  }
}

/** Thrown when the blob versioned hashes are empty. */
export class EmptyBlobVersionedHashesError extends Errors.BaseError {
  override readonly name = 'Blobs.EmptyBlobVersionedHashesError'
  constructor() {
    super('Blob versioned hashes must not be empty.')
  }
}

/** Thrown when the blob versioned hash size is invalid. */
export class InvalidVersionedHashSizeError extends Errors.BaseError {
  override readonly name = 'Blobs.InvalidVersionedHashSizeError'
  constructor({
    hash,
    size,
  }: {
    hash: Hex.Hex
    size: number
  }) {
    super(`Versioned hash "${hash}" size is invalid.`, {
      metaMessages: ['Expected: 32', `Received: ${size}`],
    })
  }
}

/** Thrown when the blob versioned hash version is invalid. */
export class InvalidVersionedHashVersionError extends Errors.BaseError {
  override readonly name = 'Blobs.InvalidVersionedHashVersionError'
  constructor({
    hash,
    version,
  }: {
    hash: Hex.Hex
    version: number
  }) {
    super(`Versioned hash "${hash}" version is invalid.`, {
      metaMessages: [
        `Expected: ${Kzg.versionedHashVersion}`,
        `Received: ${version}`,
      ],
    })
  }
}
