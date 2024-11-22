import type * as abitype from 'abitype'
import * as AbiParameters from './AbiParameters.js'
import * as Address from './Address.js'
import * as Bytes from './Bytes.js'
import * as Errors from './Errors.js'
import * as Hash from './Hash.js'
import * as Hex from './Hex.js'
import * as Json from './Json.js'
import * as Solidity from './Solidity.js'
import type { Compute } from './internal/types.js'

export type TypedData = abitype.TypedData
export type Domain = abitype.TypedDataDomain
export type Parameter = abitype.TypedDataParameter

// TODO: Make reusable for Viem?
export type Definition<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  ///
  primaryTypes = typedData extends TypedData ? keyof typedData : string,
> = primaryType extends 'EIP712Domain'
  ? EIP712DomainDefinition<typedData, primaryType>
  : MessageDefinition<typedData, primaryType, primaryTypes>

export type EIP712DomainDefinition<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends 'EIP712Domain' = 'EIP712Domain',
  ///
  schema extends Record<string, unknown> = typedData extends TypedData
    ? abitype.TypedDataToPrimitiveTypes<typedData>
    : Record<string, unknown>,
> = {
  types?: typedData | undefined
} & {
  primaryType:
    | 'EIP712Domain'
    | (primaryType extends 'EIP712Domain' ? primaryType : never)
  domain: schema extends { EIP712Domain: infer domain }
    ? domain
    : Compute<Domain>
  message?: undefined
}

export type MessageDefinition<
  typedData extends TypedData | Record<string, unknown> = TypedData,
  primaryType extends keyof typedData = keyof typedData,
  ///
  primaryTypes = typedData extends TypedData ? keyof typedData : string,
  schema extends Record<string, unknown> = typedData extends TypedData
    ? abitype.TypedDataToPrimitiveTypes<typedData>
    : Record<string, unknown>,
  message = schema[primaryType extends keyof schema
    ? primaryType
    : keyof schema],
> = {
  types: typedData
} & {
  primaryType:
    | primaryTypes // show all values
    | (primaryType extends primaryTypes ? primaryType : never) // infer value
  domain?:
    | (schema extends { EIP712Domain: infer domain } ? domain : Compute<Domain>)
    | undefined
  message: { [_: string]: any } extends message // Check if message was inferred
    ? Record<string, unknown>
    : message
}

/**
 * Asserts that [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) is valid.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.assert({
 *   domain: {
 *     name: 'Ether!',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   primaryType: 'Foo',
 *   types: {
 *     Foo: [
 *       { name: 'address', type: 'address' },
 *       { name: 'name', type: 'string' },
 *       { name: 'foo', type: 'string' },
 *     ],
 *   },
 *   message: {
 *     address: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *     name: 'jxom',
 *     foo: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *   },
 * })
 * ```
 *
 * @param value - The Typed Data to validate.
 */
export function assert<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(value: assert.Value<typedData, primaryType>): void {
  const { domain, message, primaryType, types } =
    value as unknown as assert.Value

  const validateData = (
    struct: readonly Parameter[],
    data: Record<string, unknown>,
  ) => {
    for (const param of struct) {
      const { name, type } = param
      const value = data[name]

      const integerMatch = type.match(Solidity.integerRegex)
      if (
        integerMatch &&
        (typeof value === 'number' || typeof value === 'bigint')
      ) {
        const [, base, size_] = integerMatch
        // If number cannot be cast to a sized hex value, it is out of range
        // and will throw.
        Hex.fromNumber(value, {
          signed: base === 'int',
          size: Number.parseInt(size_ ?? '') / 8,
        })
      }

      if (
        type === 'address' &&
        typeof value === 'string' &&
        !Address.validate(value)
      )
        throw new Address.InvalidAddressError({
          address: value,
          cause: new Address.InvalidInputError(),
        })

      const bytesMatch = type.match(Solidity.bytesRegex)
      if (bytesMatch) {
        const [, size] = bytesMatch
        if (size && Hex.size(value as Hex.Hex) !== Number.parseInt(size))
          throw new BytesSizeMismatchError({
            expectedSize: Number.parseInt(size),
            givenSize: Hex.size(value as Hex.Hex),
          })
      }

      const struct = types[type]
      if (struct) {
        validateReference(type)
        validateData(struct, value as Record<string, unknown>)
      }
    }
  }

  // Validate domain types.
  if (types.EIP712Domain && domain) validateData(types.EIP712Domain, domain)

  // Validate message types.
  if (primaryType !== 'EIP712Domain') {
    if (types[primaryType]) validateData(types[primaryType], message)
    else throw new InvalidPrimaryTypeError({ primaryType, types })
  }
}

export declare namespace assert {
  type Value<
    typedData extends TypedData | Record<string, unknown> = TypedData,
    primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  > = Definition<typedData, primaryType>

  type ErrorType =
    | Address.InvalidAddressError
    | BytesSizeMismatchError
    | InvalidPrimaryTypeError
    | Hex.fromNumber.ErrorType
    | Hex.size.ErrorType
    | Errors.GlobalErrorType
}

assert.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as assert.ErrorType

/**
 * Creates [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) [`domainSeparator`](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator) for the provided domain.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.domainSeparator({
 *   name: 'Ether!',
 *   version: '1',
 *   chainId: 1,
 *   verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 * })
 * // @log: '0x9911ee4f58a7059a8f5385248040e6984d80e2c849500fe6a4d11c4fa98c2af3'
 * ```
 *
 * @param domain - The domain for which to create the domain separator.
 * @returns The domain separator.
 */
export function domainSeparator(domain: Domain): Hex.Hex {
  return hashDomain({
    domain,
  })
}

export declare namespace domainSeparator {
  type ErrorType = hashDomain.ErrorType | Errors.GlobalErrorType
}

domainSeparator.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as domainSeparator.ErrorType

/**
 * Encodes typed data in [EIP-712 format](https://eips.ethereum.org/EIPS/eip-712): `0x19 ‖ 0x01 ‖ domainSeparator ‖ hashStruct(message)`.
 *
 * @example
 * ```ts twoslash
 * import { TypedData, Hash } from 'ox'
 *
 * const data = TypedData.encode({ // [!code focus:33]
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0x0000000000000000000000000000000000000000',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 * })
 * // @log: '0x19012fdf3441fcaf4f30c7e16292b258a5d7054a4e2e00dbd7b7d2f467f2b8fb9413c52c0ee5d84264471806290a3f2c4cecfc5490626bf912d01f240d7a274b371e'
 * // @log: (0x19 ‖ 0x01 ‖ domainSeparator ‖ hashStruct(message))
 *
 * const hash = Hash.keccak256(data)
 * ```
 *
 * @param value - The Typed Data to encode.
 * @returns The encoded Typed Data.
 */
export function encode<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(value: encode.Value<typedData, primaryType>): Hex.Hex {
  const { domain = {}, message, primaryType } = value as encode.Value

  const types = {
    EIP712Domain: extractEip712DomainTypes(domain),
    ...value.types,
  } as TypedData

  // Need to do a runtime validation check on addresses, byte ranges, integer ranges, etc
  // as we can't statically check this with TypeScript.
  assert({
    domain,
    message,
    primaryType,
    types,
  })

  // Typed Data Format: `0x19 ‖ 0x01 ‖ domainSeparator ‖ hashStruct(message)`
  const parts: Hex.Hex[] = ['0x19', '0x01']
  if (domain)
    parts.push(
      hashDomain({
        domain,
        types,
      }),
    )
  if (primaryType !== 'EIP712Domain')
    parts.push(
      hashStruct({
        data: message,
        primaryType,
        types,
      }),
    )

  return Hex.concat(...parts)
}

export declare namespace encode {
  type Value<
    typedData extends TypedData | Record<string, unknown> = TypedData,
    primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  > = Definition<typedData, primaryType>

  type ErrorType =
    | extractEip712DomainTypes.ErrorType
    | hashDomain.ErrorType
    | hashStruct.ErrorType
    | assert.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
encode.parseError = (error: unknown) => error as encode.ErrorType

/**
 * Encodes [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) schema for the provided primaryType.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.encodeType({
 *   types: {
 *     Foo: [
 *       { name: 'address', type: 'address' },
 *       { name: 'name', type: 'string' },
 *       { name: 'foo', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Foo',
 * })
 * // @log: 'Foo(address address,string name,string foo)'
 * ```
 *
 * @param value - The Typed Data schema.
 * @returns The encoded type.
 */
export function encodeType(value: encodeType.Value): string {
  const { primaryType, types } = value

  let result = ''
  const unsortedDeps = findTypeDependencies({ primaryType, types })
  unsortedDeps.delete(primaryType)

  const deps = [primaryType, ...Array.from(unsortedDeps).sort()]
  for (const type of deps) {
    result += `${type}(${(types[type] ?? [])
      .map(({ name, type: t }) => `${t} ${name}`)
      .join(',')})`
  }

  return result
}

export declare namespace encodeType {
  type Value = {
    primaryType: string
    types: TypedData
  }

  type ErrorType = findTypeDependencies.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
encodeType.parseError = (error: unknown) => error as encodeType.ErrorType

/**
 * Gets [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) schema for EIP-721 domain.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.extractEip712DomainTypes({
 *   name: 'Ether!',
 *   version: '1',
 *   chainId: 1,
 *   verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 * })
 * // @log: [
 * // @log:   { 'name': 'name', 'type': 'string' },
 * // @log:   { 'name': 'version', 'type': 'string' },
 * // @log:   { 'name': 'chainId', 'type': 'uint256' },
 * // @log:   { 'name': 'verifyingContract', 'type': 'address' },
 * // @log: ]
 * ```
 *
 * @param domain - The EIP-712 domain.
 * @returns The EIP-712 domain schema.
 */
export function extractEip712DomainTypes(
  domain: Domain | undefined,
): Parameter[] {
  return [
    typeof domain?.name === 'string' && { name: 'name', type: 'string' },
    domain?.version && { name: 'version', type: 'string' },
    typeof domain?.chainId === 'number' && {
      name: 'chainId',
      type: 'uint256',
    },
    domain?.verifyingContract && {
      name: 'verifyingContract',
      type: 'address',
    },
    domain?.salt && { name: 'salt', type: 'bytes32' },
  ].filter(Boolean) as Parameter[]
}

export declare namespace extractEip712DomainTypes {
  type ErrorType = Errors.GlobalErrorType
}

extractEip712DomainTypes.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as extractEip712DomainTypes.ErrorType

/**
 * Gets the payload to use for signing typed data in [EIP-712 format](https://eips.ethereum.org/EIPS/eip-712).
 *
 * @example
 * ```ts twoslash
 * import { Secp256k1, TypedData, Hash } from 'ox'
 *
 * const payload = TypedData.getSignPayload({ // [!code focus:99]
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0x0000000000000000000000000000000000000000',
 *   },
 *   types: {
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' },
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 * })
 *
 * const signature = Secp256k1.sign({ payload, privateKey: '0x...' })
 * ```
 *
 * @param value - The typed data to get the sign payload for.
 * @returns The payload to use for signing.
 */
export function getSignPayload<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(value: encode.Value<typedData, primaryType>): Hex.Hex {
  return Hash.keccak256(encode(value))
}

export declare namespace getSignPayload {
  type ErrorType =
    | Hash.keccak256.ErrorType
    | encode.ErrorType
    | Errors.GlobalErrorType
}

getSignPayload.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as getSignPayload.ErrorType

/**
 * Hashes [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) domain.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.hashDomain({
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0x0000000000000000000000000000000000000000',
 *   },
 * })
 * // @log: '0x6192106f129ce05c9075d319c1fa6ea9b3ae37cbd0c1ef92e2be7137bb07baa1'
 * ```
 *
 * @param value - The Typed Data domain and types.
 * @returns The hashed domain.
 */
export function hashDomain(value: hashDomain.Value): Hex.Hex {
  const { domain, types } = value
  return hashStruct({
    data: domain,
    primaryType: 'EIP712Domain',
    types: {
      ...types,
      EIP712Domain: types?.EIP712Domain || extractEip712DomainTypes(domain),
    },
  })
}

export declare namespace hashDomain {
  type Value = {
    /** The Typed Data domain. */
    domain: Domain
    /** The Typed Data types. */
    types?:
      | {
          EIP712Domain?: readonly Parameter[] | undefined
          [key: string]: readonly Parameter[] | undefined
        }
      | undefined
  }

  type ErrorType = hashStruct.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
hashDomain.parseError = (error: unknown) => error as hashDomain.ErrorType

/**
 * Hashes [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) struct.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.hashStruct({
 *   types: {
 *     Foo: [
 *       { name: 'address', type: 'address' },
 *       { name: 'name', type: 'string' },
 *       { name: 'foo', type: 'string' },
 *     ],
 *   },
 *   primaryType: 'Foo',
 *   data: {
 *     address: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *     name: 'jxom',
 *     foo: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *   },
 * })
 * // @log: '0x996fb3b6d48c50312d69abdd4c1b6fb02057c85aa86bb8d04c6f023326a168ce'
 * ```
 *
 * @param value - The Typed Data struct to hash.
 * @returns The hashed Typed Data struct.
 */
export function hashStruct(value: hashStruct.Value): Hex.Hex {
  const { data, primaryType, types } = value
  const encoded = encodeData({
    data,
    primaryType,
    types,
  })
  return Hash.keccak256(encoded)
}

export declare namespace hashStruct {
  type Value = {
    /** The Typed Data struct to hash. */
    data: Record<string, unknown>
    /** The primary type of the Typed Data struct. */
    primaryType: string
    /** The types of the Typed Data struct. */
    types: TypedData
  }

  type ErrorType =
    | encodeData.ErrorType
    | Hash.keccak256.ErrorType
    | Errors.GlobalErrorType
}

/* v8 ignore next */
hashStruct.parseError = (error: unknown) => error as hashStruct.ErrorType

/**
 * Serializes [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) schema into string.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * TypedData.serialize({
 *   domain: {
 *     name: 'Ether!',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   primaryType: 'Foo',
 *   types: {
 *     Foo: [
 *       { name: 'address', type: 'address' },
 *       { name: 'name', type: 'string' },
 *       { name: 'foo', type: 'string' },
 *     ],
 *   },
 *   message: {
 *     address: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *     name: 'jxom',
 *     foo: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *   },
 * })
 * // @log: "{"domain":{},"message":{"address":"0xb9cab4f0e46f7f6b1024b5a7463734fa68e633f9","name":"jxom","foo":"0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9"},"primaryType":"Foo","types":{"Foo":[{"name":"address","type":"address"},{"name":"name","type":"string"},{"name":"foo","type":"string"}]}}"
 * ```
 *
 * @param value - The Typed Data schema to serialize.
 * @returns The serialized Typed Data schema. w
 */
export function serialize<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(value: serialize.Value<typedData, primaryType>): string {
  const {
    domain: domain_,
    message: message_,
    primaryType,
    types,
  } = value as unknown as serialize.Value

  const normalizeData = (
    struct: readonly Parameter[],
    value: Record<string, unknown>,
  ) => {
    const data = { ...value }
    for (const param of struct) {
      const { name, type } = param
      if (type === 'address') data[name] = (data[name] as string).toLowerCase()
    }
    return data
  }

  const domain = (() => {
    if (!types.EIP712Domain) return {}
    if (!domain_) return {}
    return normalizeData(types.EIP712Domain, domain_)
  })()

  const message = (() => {
    if (primaryType === 'EIP712Domain') return undefined
    if (!types[primaryType]) return {}
    return normalizeData(types[primaryType], message_)
  })()

  return Json.stringify({ domain, message, primaryType, types }, (_, value) => {
    if (typeof value === 'bigint') return value.toString()
    return value
  })
}

export declare namespace serialize {
  type Value<
    typedData extends TypedData | Record<string, unknown> = TypedData,
    primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  > = Definition<typedData, primaryType>

  type ErrorType = Json.stringify.ErrorType | Errors.GlobalErrorType
}

serialize.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as serialize.ErrorType

/**
 * Checks if [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) is valid.
 *
 * @example
 * ```ts twoslash
 * import { TypedData } from 'ox'
 *
 * const valid = TypedData.validate({
 *   domain: {
 *     name: 'Ether!',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   primaryType: 'Foo',
 *   types: {
 *     Foo: [
 *       { name: 'address', type: 'address' },
 *       { name: 'name', type: 'string' },
 *       { name: 'foo', type: 'string' },
 *     ],
 *   },
 *   message: {
 *     address: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *     name: 'jxom',
 *     foo: '0xb9CAB4F0E46F7F6b1024b5A7463734fa68E633f9',
 *   },
 * })
 * // @log: true
 * ```
 *
 * @param value - The Typed Data to validate.
 */
export function validate<
  const typedData extends TypedData | Record<string, unknown>,
  primaryType extends keyof typedData | 'EIP712Domain',
>(value: assert.Value<typedData, primaryType>): boolean {
  try {
    assert(value)
    return true
  } catch {
    return false
  }
}

export declare namespace validate {
  type ErrorType = assert.ErrorType | Errors.GlobalErrorType
}

/* v8 ignore next */
validate.parseError = (error: unknown) => error as validate.ErrorType

/** Thrown when the bytes size of a typed data value does not match the expected size. */
export class BytesSizeMismatchError extends Errors.BaseError {
  override readonly name = 'TypedData.BytesSizeMismatchError'

  constructor({
    expectedSize,
    givenSize,
  }: { expectedSize: number; givenSize: number }) {
    super(`Expected bytes${expectedSize}, got bytes${givenSize}.`)
  }
}

/** Thrown when the primary type of a typed data value is invalid. */
export class InvalidPrimaryTypeError extends Errors.BaseError {
  override readonly name = 'TypedData.InvalidPrimaryTypeError'

  constructor({
    primaryType,
    types,
  }: { primaryType: string; types: TypedData | Record<string, unknown> }) {
    super(
      `Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`,
      {
        metaMessages: ['Check that the primary type is a key in `types`.'],
      },
    )
  }
}

/** Thrown when the struct type is not a valid type. */
export class InvalidStructTypeError extends Errors.BaseError {
  override readonly name = 'TypedData.InvalidStructTypeError'

  constructor({ type }: { type: string }) {
    super(`Struct type "${type}" is invalid.`, {
      metaMessages: ['Struct type must not be a Solidity type.'],
    })
  }
}

/** @internal */
export function encodeData(value: {
  data: Record<string, unknown>
  primaryType: string
  types: TypedData
}): Hex.Hex {
  const { data, primaryType, types } = value
  const encodedTypes: AbiParameters.Parameter[] = [{ type: 'bytes32' }]
  const encodedValues: unknown[] = [hashType({ primaryType, types })]

  for (const field of types[primaryType] ?? []) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name],
    })
    encodedTypes.push(type)
    encodedValues.push(value)
  }

  return AbiParameters.encode(encodedTypes, encodedValues)
}

/** @internal */
export declare namespace encodeData {
  type ErrorType =
    | AbiParameters.encode.ErrorType
    | encodeField.ErrorType
    | hashType.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function hashType(value: {
  primaryType: string
  types: TypedData
}): Hex.Hex {
  const { primaryType, types } = value
  const encodedHashType = Hex.fromString(encodeType({ primaryType, types }))
  return Hash.keccak256(encodedHashType)
}

/** @internal */
export declare namespace hashType {
  type ErrorType =
    | Hex.fromString.ErrorType
    | encodeType.ErrorType
    | Hash.keccak256.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeField(properties: {
  types: TypedData
  name: string
  type: string
  value: any
}): [type: AbiParameters.Parameter, value: Hex.Hex] {
  let { types, name, type, value } = properties

  if (types[type] !== undefined)
    return [
      { type: 'bytes32' },
      Hash.keccak256(encodeData({ data: value, primaryType: type, types })),
    ]

  if (type === 'bytes') {
    const prepend = value.length % 2 ? '0' : ''
    value = `0x${prepend + value.slice(2)}`
    return [{ type: 'bytes32' }, Hash.keccak256(value, { as: 'Hex' })]
  }

  if (type === 'string')
    return [
      { type: 'bytes32' },
      Hash.keccak256(Bytes.fromString(value), { as: 'Hex' }),
    ]

  if (type.lastIndexOf(']') === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf('['))
    const typeValuePairs = (value as [AbiParameters.Parameter, any][]).map(
      (item) =>
        encodeField({
          name,
          type: parsedType,
          types,
          value: item,
        }),
    )
    return [
      { type: 'bytes32' },
      Hash.keccak256(
        AbiParameters.encode(
          typeValuePairs.map(([t]) => t),
          typeValuePairs.map(([, v]) => v),
        ),
      ),
    ]
  }

  return [{ type }, value]
}

/** @internal */
export declare namespace encodeField {
  type ErrorType =
    | AbiParameters.encode.ErrorType
    | Hash.keccak256.ErrorType
    | Bytes.fromString.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function findTypeDependencies(
  value: {
    primaryType: string
    types: TypedData
  },
  results: Set<string> = new Set(),
): Set<string> {
  const { primaryType: primaryType_, types } = value
  const match = primaryType_.match(/^\w*/u)
  const primaryType = match?.[0]!
  if (results.has(primaryType) || types[primaryType] === undefined)
    return results

  results.add(primaryType)

  for (const field of types[primaryType])
    findTypeDependencies({ primaryType: field.type, types }, results)
  return results
}

/** @internal */
export declare namespace findTypeDependencies {
  type ErrorType = Errors.GlobalErrorType
}

/** @internal */
function validateReference(type: string) {
  // Struct type must not be a Solidity type.
  if (
    type === 'address' ||
    type === 'bool' ||
    type === 'string' ||
    type.startsWith('bytes') ||
    type.startsWith('uint') ||
    type.startsWith('int')
  )
    throw new InvalidStructTypeError({ type })
}
