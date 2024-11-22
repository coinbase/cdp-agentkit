import * as abitype from 'abitype'
import * as Address from './Address.js'
import * as Bytes from './Bytes.js'
import * as Errors from './Errors.js'
import * as Hex from './Hex.js'
import * as Solidity from './Solidity.js'
import * as internal from './internal/abiParameters.js'
import * as Cursor from './internal/cursor.js'

/** Root type for ABI parameters. */
export type AbiParameters = readonly abitype.AbiParameter[]

/** A parameter on an {@link ox#AbiParameters.AbiParameters}. */
export type Parameter = abitype.AbiParameter

/** A packed ABI type. */
export type PackedAbiType =
  | abitype.SolidityAddress
  | abitype.SolidityBool
  | abitype.SolidityBytes
  | abitype.SolidityInt
  | abitype.SolidityString
  | abitype.SolidityArrayWithoutTuple

/**
 * Decodes ABI-encoded data into its respective primitive values based on ABI Parameters.
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const data = AbiParameters.decode(
 *   AbiParameters.from(['string', 'uint', 'bool']),
 *   '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000',
 * )
 * // @log: ['wagmi', 420n, true]
 * ```
 *
 * @example
 * ### JSON Parameters
 *
 * You can pass **JSON ABI** Parameters:
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const data = AbiParameters.decode(
 *   [
 *     { name: 'x', type: 'string' },
 *     { name: 'y', type: 'uint' },
 *     { name: 'z', type: 'bool' },
 *   ],
 *   '0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000',
 * )
 * // @log: ['wagmi', 420n, true]
 * ```
 *
 * @param parameters - The set of ABI parameters to decode, in the shape of the `inputs` or `outputs` attribute of an ABI Item. These parameters must include valid [ABI types](https://docs.soliditylang.org/en/latest/types.html).
 * @param data - ABI encoded data.
 * @param options - Decoding options.
 * @returns Array of decoded values.
 */
export function decode<
  const parameters extends AbiParameters,
  as extends 'Object' | 'Array' = 'Array',
>(
  parameters: parameters,
  data: Bytes.Bytes | Hex.Hex,
  options?: decode.Options<as>,
): decode.ReturnType<parameters, as>

// eslint-disable-next-line jsdoc/require-jsdoc
export function decode(
  parameters: AbiParameters,
  data: Bytes.Bytes | Hex.Hex,
  options: { as?: 'Array' | 'Object' | undefined } = {},
): readonly unknown[] | Record<string, unknown> {
  const { as = 'Array' } = options

  const bytes = typeof data === 'string' ? Bytes.fromHex(data) : data
  const cursor = Cursor.create(bytes)

  if (Bytes.size(bytes) === 0 && parameters.length > 0)
    throw new ZeroDataError()
  if (Bytes.size(bytes) && Bytes.size(bytes) < 32)
    throw new DataSizeTooSmallError({
      data: typeof data === 'string' ? data : Hex.fromBytes(data),
      parameters: parameters as readonly Parameter[],
      size: Bytes.size(bytes),
    })

  let consumed = 0
  const values: any = as === 'Array' ? [] : {}
  for (let i = 0; i < parameters.length; ++i) {
    const param = parameters[i] as Parameter
    cursor.setPosition(consumed)
    const [data, consumed_] = internal.decodeParameter(cursor, param, {
      staticPosition: 0,
    })
    consumed += consumed_
    if (as === 'Array') values.push(data)
    else values[param.name ?? i] = data
  }
  return values
}

export declare namespace decode {
  type Options<as extends 'Object' | 'Array'> = {
    /**
     * Whether the decoded values should be returned as an `Object` or `Array`.
     *
     * @default "Array"
     */
    as?: as | 'Object' | 'Array' | undefined
  }

  type ReturnType<
    parameters extends AbiParameters = AbiParameters,
    as extends 'Object' | 'Array' = 'Array',
  > = parameters extends readonly []
    ? as extends 'Object'
      ? {}
      : []
    : as extends 'Object'
      ? internal.ToObject<parameters>
      : internal.ToPrimitiveTypes<parameters>

  type ErrorType =
    | Bytes.fromHex.ErrorType
    | internal.decodeParameter.ErrorType
    | ZeroDataError
    | DataSizeTooSmallError
    | Errors.GlobalErrorType
}

decode.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as decode.ErrorType

/**
 * Encodes primitive values into ABI encoded data as per the [Application Binary Interface (ABI) Specification](https://docs.soliditylang.org/en/latest/abi-spec).
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const data = AbiParameters.encode(
 *   AbiParameters.from(['string', 'uint', 'bool']),
 *   ['wagmi', 420n, true],
 * )
 * ```
 *
 * @example
 * ### JSON Parameters
 *
 * Specify **JSON ABI** Parameters as schema:
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const data = AbiParameters.encode(
 *   [
 *     { type: 'string', name: 'name' },
 *     { type: 'uint', name: 'age' },
 *     { type: 'bool', name: 'isOwner' },
 *   ],
 *   ['wagmi', 420n, true],
 * )
 * ```
 *
 * @param parameters - The set of ABI parameters to encode, in the shape of the `inputs` or `outputs` attribute of an ABI Item. These parameters must include valid [ABI types](https://docs.soliditylang.org/en/latest/types.html).
 * @param values - The set of primitive values that correspond to the ABI types defined in `parameters`.
 * @returns ABI encoded data.
 */
export function encode<
  const parameters extends AbiParameters | readonly unknown[],
>(
  parameters: parameters,
  values: parameters extends AbiParameters
    ? internal.ToPrimitiveTypes<parameters>
    : never,
): Hex.Hex {
  if (parameters.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: parameters.length as number,
      givenLength: values.length as any,
    })
  // Prepare the parameters to determine dynamic types to encode.
  const preparedParameters = internal.prepareParameters({
    parameters: parameters as readonly Parameter[],
    values: values as any,
  })
  const data = internal.encode(preparedParameters)
  if (data.length === 0) return '0x'
  return data
}

export declare namespace encode {
  type ErrorType =
    | LengthMismatchError
    | internal.encode.ErrorType
    | internal.prepareParameters.ErrorType
    | Errors.GlobalErrorType
}

encode.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as encode.ErrorType

/**
 * Encodes an array of primitive values to a [packed ABI encoding](https://docs.soliditylang.org/en/latest/abi-spec.html#non-standard-packed-mode).
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const encoded = AbiParameters.encodePacked(
 *   ['address', 'string'],
 *   ['0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 'hello world'],
 * )
 * // @log: '0xd8da6bf26964af9d7eed9e03e53415d37aa9604568656c6c6f20776f726c64'
 * ```
 *
 * @param types - Set of ABI types to pack encode.
 * @param values - The set of primitive values that correspond to the ABI types defined in `types`.
 * @returns The encoded packed data.
 */
export function encodePacked<
  const packedAbiTypes extends readonly PackedAbiType[] | readonly unknown[],
>(types: packedAbiTypes, values: encodePacked.Values<packedAbiTypes>): Hex.Hex {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length as number,
      givenLength: values.length as number,
    })

  const data: Hex.Hex[] = []
  for (let i = 0; i < (types as unknown[]).length; i++) {
    const type = types[i]
    const value = values[i]
    data.push(encodePacked.encode(type, value))
  }
  return Hex.concat(...data)
}

export namespace encodePacked {
  export type ErrorType =
    | Hex.concat.ErrorType
    | LengthMismatchError
    | Errors.GlobalErrorType

  export type Values<
    packedAbiTypes extends readonly PackedAbiType[] | readonly unknown[],
  > = {
    [key in keyof packedAbiTypes]: packedAbiTypes[key] extends abitype.AbiType
      ? abitype.AbiParameterToPrimitiveType<{ type: packedAbiTypes[key] }>
      : unknown
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  export function encode<const packedAbiType extends PackedAbiType | unknown>(
    type: packedAbiType,
    value: Values<[packedAbiType]>[0],
    isArray = false,
  ): Hex.Hex {
    if (type === 'address') {
      const address = value as Address.Address
      Address.assert(address)
      return Hex.padLeft(
        address.toLowerCase() as Hex.Hex,
        isArray ? 32 : 0,
      ) as Address.Address
    }
    if (type === 'string') return Hex.fromString(value as string)
    if (type === 'bytes') return value as Hex.Hex
    if (type === 'bool')
      return Hex.padLeft(Hex.fromBoolean(value as boolean), isArray ? 32 : 1)

    const intMatch = (type as string).match(Solidity.integerRegex)
    if (intMatch) {
      const [_type, baseType, bits = '256'] = intMatch
      const size = Number.parseInt(bits) / 8
      return Hex.fromNumber(value as number, {
        size: isArray ? 32 : size,
        signed: baseType === 'int',
      })
    }

    const bytesMatch = (type as string).match(Solidity.bytesRegex)
    if (bytesMatch) {
      const [_type, size] = bytesMatch
      if (Number.parseInt(size!) !== ((value as Hex.Hex).length - 2) / 2)
        throw new BytesSizeMismatchError({
          expectedSize: Number.parseInt(size!),
          value: value as Hex.Hex,
        })
      return Hex.padRight(value as Hex.Hex, isArray ? 32 : 0) as Hex.Hex
    }

    const arrayMatch = (type as string).match(Solidity.arrayRegex)
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch
      const data: Hex.Hex[] = []
      for (let i = 0; i < value.length; i++) {
        data.push(encode(childType, value[i], true))
      }
      if (data.length === 0) return '0x'
      return Hex.concat(...data)
    }

    throw new InvalidTypeError(type as string)
  }
}

/* v8 ignore next */
encodePacked.parseError = (error: unknown) => error as encodePacked.ErrorType

/**
 * Formats {@link ox#AbiParameters.AbiParameters} into **Human Readable ABI Parameters**.
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const formatted = AbiParameters.format([
 *   {
 *     name: 'spender',
 *     type: 'address',
 *   },
 *   {
 *     name: 'amount',
 *     type: 'uint256',
 *   },
 * ])
 *
 * formatted
 * //    ^?
 *
 *
 * ```
 *
 * @param parameters - The ABI Parameters to format.
 * @returns The formatted ABI Parameters  .
 */
export function format<
  const parameters extends readonly [
    Parameter | abitype.AbiEventParameter,
    ...(readonly (Parameter | abitype.AbiEventParameter)[]),
  ],
>(
  parameters:
    | parameters
    | readonly [
        Parameter | abitype.AbiEventParameter,
        ...(readonly (Parameter | abitype.AbiEventParameter)[]),
      ],
): abitype.FormatAbiParameters<parameters> {
  return abitype.formatAbiParameters(parameters)
}

export declare namespace format {
  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/**
 * Parses arbitrary **JSON ABI Parameters** or **Human Readable ABI Parameters** into typed {@link ox#AbiParameters.AbiParameters}.
 *
 * @example
 * ### JSON Parameters
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const parameters = AbiParameters.from([
 *   {
 *     name: 'spender',
 *     type: 'address',
 *   },
 *   {
 *     name: 'amount',
 *     type: 'uint256',
 *   },
 * ])
 *
 * parameters
 * //^?
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @example
 * ### Human Readable Parameters
 *
 * Human Readable ABI Parameters can be parsed into a typed {@link ox#AbiParameters.AbiParameters}:
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const parameters = AbiParameters.from('address spender, uint256 amount')
 *
 * parameters
 * //^?
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @example
 * It is possible to specify `struct`s along with your definitions:
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * const parameters = AbiParameters.from([
 *   'struct Foo { address spender; uint256 amount; }', // [!code hl]
 *   'Foo foo, address bar',
 * ])
 *
 * parameters
 * //^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 *
 *
 * @param parameters - The ABI Parameters to parse.
 * @returns The typed ABI Parameters.
 */
export function from<
  const parameters extends AbiParameters | string | readonly string[],
>(
  parameters: parameters | AbiParameters | string | readonly string[],
): from.ReturnType<parameters> {
  if (Array.isArray(parameters) && typeof parameters[0] === 'string')
    return abitype.parseAbiParameters(parameters) as never
  if (typeof parameters === 'string')
    return abitype.parseAbiParameters(parameters) as never
  return parameters as never
}

export declare namespace from {
  type ReturnType<
    parameters extends AbiParameters | string | readonly string[],
  > = parameters extends string
    ? abitype.ParseAbiParameters<parameters>
    : parameters extends readonly string[]
      ? abitype.ParseAbiParameters<parameters>
      : parameters

  type ErrorType = Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType

/**
 * Throws when the data size is too small for the given parameters.
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * AbiParameters.decode([{ type: 'uint256' }], '0x010f')
 * //                                             ↑ ❌ 2 bytes
 * // @error: AbiParameters.DataSizeTooSmallError: Data size of 2 bytes is too small for given parameters.
 * // @error: Params: (uint256)
 * // @error: Data:   0x010f (2 bytes)
 * ```
 *
 * ### Solution
 *
 * Pass a valid data size.
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * AbiParameters.decode([{ type: 'uint256' }], '0x00000000000000000000000000000000000000000000000000000000000010f')
 * //                                             ↑ ✅ 32 bytes
 * ```
 */
export class DataSizeTooSmallError extends Errors.BaseError {
  override readonly name = 'AbiParameters.DataSizeTooSmallError'
  constructor({
    data,
    parameters,
    size,
  }: { data: Hex.Hex; parameters: readonly Parameter[]; size: number }) {
    super(`Data size of ${size} bytes is too small for given parameters.`, {
      metaMessages: [
        `Params: (${abitype.formatAbiParameters(parameters as readonly [Parameter])})`,
        `Data:   ${data} (${size} bytes)`,
      ],
    })
  }
}

/**
 * Throws when zero data is provided, but data is expected.
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * AbiParameters.decode([{ type: 'uint256' }], '0x')
 * //                                           ↑ ❌ zero data
 * // @error: AbiParameters.DataSizeTooSmallError: Data size of 2 bytes is too small for given parameters.
 * // @error: Params: (uint256)
 * // @error: Data:   0x010f (2 bytes)
 * ```
 *
 * ### Solution
 *
 * Pass valid data.
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * AbiParameters.decode([{ type: 'uint256' }], '0x00000000000000000000000000000000000000000000000000000000000010f')
 * //                                             ↑ ✅ 32 bytes
 * ```
 */
export class ZeroDataError extends Errors.BaseError {
  override readonly name = 'AbiParameters.ZeroDataError'
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.')
  }
}

/**
 * The length of the array value does not match the length specified in the corresponding ABI parameter.
 *
 * ### Example
 *
 * ```ts twoslash
 * // @noErrors
 * import { AbiParameters } from 'ox'
 * // ---cut---
 * AbiParameters.encode(AbiParameters.from('uint256[3]'), [[69n, 420n]])
 * //                                               ↑ expected: 3  ↑ ❌ length: 2
 * // @error: AbiParameters.ArrayLengthMismatchError: ABI encoding array length mismatch
 * // @error: for type `uint256[3]`. Expected: `3`. Given: `2`.
 * ```
 *
 * ### Solution
 *
 * Pass an array of the correct length.
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 * // ---cut---
 * AbiParameters.encode(AbiParameters.from(['uint256[3]']), [[69n, 420n, 69n]])
 * //                                                         ↑ ✅ length: 3
 * ```
 */
export class ArrayLengthMismatchError extends Errors.BaseError {
  override readonly name = 'AbiParameters.ArrayLengthMismatchError'
  constructor({
    expectedLength,
    givenLength,
    type,
  }: { expectedLength: number; givenLength: number; type: string }) {
    super(
      `Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`,
    )
  }
}

/**
 * The size of the bytes value does not match the size specified in the corresponding ABI parameter.
 *
 * ### Example
 *
 * ```ts twoslash
 * // @noErrors
 * import { AbiParameters } from 'ox'
 * // ---cut---
 * AbiParameters.encode(AbiParameters.from('bytes8'), [['0xdeadbeefdeadbeefdeadbeef']])
 * //                                            ↑ expected: 8 bytes  ↑ ❌ size: 12 bytes
 * // @error: BytesSizeMismatchError: Size of bytes "0xdeadbeefdeadbeefdeadbeef"
 * // @error: (bytes12) does not match expected size (bytes8).
 * ```
 *
 * ### Solution
 *
 * Pass a bytes value of the correct size.
 *
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 * // ---cut---
 * AbiParameters.encode(AbiParameters.from(['bytes8']), ['0xdeadbeefdeadbeef'])
 * //                                                       ↑ ✅ size: 8 bytes
 * ```
 */
export class BytesSizeMismatchError extends Errors.BaseError {
  override readonly name = 'AbiParameters.BytesSizeMismatchError'
  constructor({
    expectedSize,
    value,
  }: { expectedSize: number; value: Hex.Hex }) {
    super(
      `Size of bytes "${value}" (bytes${Hex.size(
        value,
      )}) does not match expected size (bytes${expectedSize}).`,
    )
  }
}

/**
 * The length of the values to encode does not match the length of the ABI parameters.
 *
 * ### Example
 *
 * ```ts twoslash
 * // @noErrors
 * import { AbiParameters } from 'ox'
 * // ---cut---
 * AbiParameters.encode(AbiParameters.from(['string', 'uint256']), ['hello'])
 * // @error: LengthMismatchError: ABI encoding params/values length mismatch.
 * // @error: Expected length (params): 2
 * // @error: Given length (values): 1
 * ```
 *
 * ### Solution
 *
 * Pass the correct number of values to encode.
 *
 * ### Solution
 *
 * Pass a [valid ABI type](https://docs.soliditylang.org/en/develop/abi-spec.html#types).
 */
export class LengthMismatchError extends Errors.BaseError {
  override readonly name = 'AbiParameters.LengthMismatchError'
  constructor({
    expectedLength,
    givenLength,
  }: { expectedLength: number; givenLength: number }) {
    super(
      [
        'ABI encoding parameters/values length mismatch.',
        `Expected length (parameters): ${expectedLength}`,
        `Given length (values): ${givenLength}`,
      ].join('\n'),
    )
  }
}

/**
 * The value provided is not a valid array as specified in the corresponding ABI parameter.
 *
 * ### Example
 *
 * ```ts twoslash
 * // @noErrors
 * import { AbiParameters } from 'ox'
 * // ---cut---
 * AbiParameters.encode(AbiParameters.from(['uint256[3]']), [69])
 * ```
 *
 * ### Solution
 *
 * Pass an array value.
 */
export class InvalidArrayError extends Errors.BaseError {
  override readonly name = 'AbiParameters.InvalidArrayError'
  constructor(value: unknown) {
    super(`Value \`${value}\` is not a valid array.`)
  }
}

/**
 * Throws when the ABI parameter type is invalid.
 *
 * @example
 * ```ts twoslash
 * import { AbiParameters } from 'ox'
 *
 * AbiParameters.decode([{ type: 'lol' }], '0x00000000000000000000000000000000000000000000000000000000000010f')
 * //                             ↑ ❌ invalid type
 * // @error: AbiParameters.InvalidTypeError: Type `lol` is not a valid ABI Type.
 * ```
 */
export class InvalidTypeError extends Errors.BaseError {
  override readonly name = 'AbiParameters.InvalidTypeError'
  constructor(type: string) {
    super(`Type \`${type}\` is not a valid ABI Type.`)
  }
}
