import type {
  AbiParameter,
  AbiParameterKind,
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
} from 'abitype'
import * as AbiParameters from '../AbiParameters.js'
import * as Address from '../Address.js'
import * as Bytes from '../Bytes.js'
import * as Errors from '../Errors.js'
import * as Hex from '../Hex.js'
import type * as Cursor from './cursor.js'
import type { Compute, IsNarrowable, UnionToIntersection } from './types.js'

/** @internal */
export type ParameterToPrimitiveType<
  abiParameter extends AbiParameter | { name: string; type: unknown },
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
> = AbiParameterToPrimitiveType<abiParameter, abiParameterKind>

/** @internal */
export type PreparedParameter = { dynamic: boolean; encoded: Hex.Hex }

/** @internal */
export type ToObject<
  parameters extends readonly AbiParameter[],
  kind extends AbiParameterKind = AbiParameterKind,
> = IsNarrowable<parameters, AbiParameters.AbiParameters> extends true
  ? Compute<
      UnionToIntersection<
        {
          [index in keyof parameters]: parameters[index] extends {
            name: infer name extends string
          }
            ? {
                [key in name]: AbiParameterToPrimitiveType<
                  parameters[index],
                  kind
                >
              }
            : {
                [key in index]: AbiParameterToPrimitiveType<
                  parameters[index],
                  kind
                >
              }
        }[number]
      >
    >
  : unknown

/** @internal */
export type ToPrimitiveTypes<
  abiParameters extends readonly AbiParameter[],
  abiParameterKind extends AbiParameterKind = AbiParameterKind,
> = AbiParametersToPrimitiveTypes<abiParameters, abiParameterKind>

/** @internal */
export type Tuple = ParameterToPrimitiveType<TupleAbiParameter>

/** @internal */
export function decodeParameter(
  cursor: Cursor.Cursor,
  param: AbiParameters.Parameter,
  { staticPosition }: { staticPosition: number },
) {
  const arrayComponents = getArrayComponents(param.type)
  if (arrayComponents) {
    const [length, type] = arrayComponents
    return decodeArray(cursor, { ...param, type }, { length, staticPosition })
  }
  if (param.type === 'tuple')
    return decodeTuple(cursor, param as TupleAbiParameter, { staticPosition })

  if (param.type === 'address') return decodeAddress(cursor)
  if (param.type === 'bool') return decodeBool(cursor)
  if (param.type.startsWith('bytes'))
    return decodeBytes(cursor, param, { staticPosition })
  if (param.type.startsWith('uint') || param.type.startsWith('int'))
    return decodeNumber(cursor, param)
  if (param.type === 'string') return decodeString(cursor, { staticPosition })
  throw new AbiParameters.InvalidTypeError(param.type)
}

export declare namespace decodeParameter {
  type ErrorType =
    | decodeArray.ErrorType
    | decodeTuple.ErrorType
    | decodeAddress.ErrorType
    | decodeBool.ErrorType
    | decodeBytes.ErrorType
    | decodeNumber.ErrorType
    | decodeString.ErrorType
    | AbiParameters.InvalidTypeError
    | Errors.GlobalErrorType
}

const sizeOfLength = 32
const sizeOfOffset = 32

/** @internal */
export function decodeAddress(cursor: Cursor.Cursor) {
  const value = cursor.readBytes(32)
  return [Hex.fromBytes(Bytes.slice(value, -20)), 32]
}

export declare namespace decodeAddress {
  type ErrorType =
    | Hex.fromBytes.ErrorType
    | Bytes.slice.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function decodeArray(
  cursor: Cursor.Cursor,
  param: AbiParameters.Parameter,
  { length, staticPosition }: { length: number | null; staticPosition: number },
) {
  // If the length of the array is not known in advance (dynamic array),
  // this means we will need to wonder off to the pointer and decode.
  if (!length) {
    // Dealing with a dynamic type, so get the offset of the array data.
    const offset = Bytes.toNumber(cursor.readBytes(sizeOfOffset))

    // Start is the static position of current slot + offset.
    const start = staticPosition + offset
    const startOfData = start + sizeOfLength

    // Get the length of the array from the offset.
    cursor.setPosition(start)
    const length = Bytes.toNumber(cursor.readBytes(sizeOfLength))

    // Check if the array has any dynamic children.
    const dynamicChild = hasDynamicChild(param)

    let consumed = 0
    const value: unknown[] = []
    for (let i = 0; i < length; ++i) {
      // If any of the children is dynamic, then all elements will be offset pointer, thus size of one slot (32 bytes).
      // Otherwise, elements will be the size of their encoding (consumed bytes).
      cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed))
      const [data, consumed_] = decodeParameter(cursor, param, {
        staticPosition: startOfData,
      })
      consumed += consumed_
      value.push(data)
    }

    // As we have gone wondering, restore to the original position + next slot.
    cursor.setPosition(staticPosition + 32)
    return [value, 32]
  }

  // If the length of the array is known in advance,
  // and the length of an element deeply nested in the array is not known,
  // we need to decode the offset of the array data.
  if (hasDynamicChild(param)) {
    // Dealing with dynamic types, so get the offset of the array data.
    const offset = Bytes.toNumber(cursor.readBytes(sizeOfOffset))

    // Start is the static position of current slot + offset.
    const start = staticPosition + offset

    const value: unknown[] = []
    for (let i = 0; i < length; ++i) {
      // Move cursor along to the next slot (next offset pointer).
      cursor.setPosition(start + i * 32)
      const [data] = decodeParameter(cursor, param, {
        staticPosition: start,
      })
      value.push(data)
    }

    // As we have gone wondering, restore to the original position + next slot.
    cursor.setPosition(staticPosition + 32)
    return [value, 32]
  }

  // If the length of the array is known in advance and the array is deeply static,
  // then we can just decode each element in sequence.
  let consumed = 0
  const value: unknown[] = []
  for (let i = 0; i < length; ++i) {
    const [data, consumed_] = decodeParameter(cursor, param, {
      staticPosition: staticPosition + consumed,
    })
    consumed += consumed_
    value.push(data)
  }
  return [value, consumed]
}

export declare namespace decodeArray {
  type ErrorType = Bytes.toNumber.ErrorType | Errors.GlobalErrorType
}

/** @internal */
export function decodeBool(cursor: Cursor.Cursor) {
  return [Bytes.toBoolean(cursor.readBytes(32), { size: 32 }), 32]
}

export declare namespace decodeBool {
  type ErrorType = Bytes.toBoolean.ErrorType | Errors.GlobalErrorType
}

/** @internal */
export function decodeBytes(
  cursor: Cursor.Cursor,
  param: AbiParameters.Parameter,
  { staticPosition }: { staticPosition: number },
) {
  const [_, size] = param.type.split('bytes')
  if (!size) {
    // Dealing with dynamic types, so get the offset of the bytes data.
    const offset = Bytes.toNumber(cursor.readBytes(32))

    // Set position of the cursor to start of bytes data.
    cursor.setPosition(staticPosition + offset)

    const length = Bytes.toNumber(cursor.readBytes(32))

    // If there is no length, we have zero data.
    if (length === 0) {
      // As we have gone wondering, restore to the original position + next slot.
      cursor.setPosition(staticPosition + 32)
      return ['0x', 32]
    }

    const data = cursor.readBytes(length)

    // As we have gone wondering, restore to the original position + next slot.
    cursor.setPosition(staticPosition + 32)
    return [Hex.fromBytes(data), 32]
  }

  const value = Hex.fromBytes(cursor.readBytes(Number.parseInt(size), 32))
  return [value, 32]
}

export declare namespace decodeBytes {
  type ErrorType =
    | Hex.fromBytes.ErrorType
    | Bytes.toNumber.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function decodeNumber(
  cursor: Cursor.Cursor,
  param: AbiParameters.Parameter,
) {
  const signed = param.type.startsWith('int')
  const size = Number.parseInt(param.type.split('int')[1] || '256')
  const value = cursor.readBytes(32)
  return [
    size > 48
      ? Bytes.toBigInt(value, { signed })
      : Bytes.toNumber(value, { signed }),
    32,
  ]
}

export declare namespace decodeNumber {
  type ErrorType =
    | Bytes.toNumber.ErrorType
    | Bytes.toBigInt.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export type TupleAbiParameter = AbiParameters.Parameter & {
  components: readonly AbiParameters.Parameter[]
}

/** @internal */
export function decodeTuple(
  cursor: Cursor.Cursor,
  param: TupleAbiParameter,
  { staticPosition }: { staticPosition: number },
) {
  // Tuples can have unnamed components (i.e. they are arrays), so we must
  // determine whether the tuple is named or unnamed. In the case of a named
  // tuple, the value will be an object where each property is the name of the
  // component. In the case of an unnamed tuple, the value will be an array.
  const hasUnnamedChild =
    param.components.length === 0 || param.components.some(({ name }) => !name)

  // Initialize the value to an object or an array, depending on whether the
  // tuple is named or unnamed.
  const value: any = hasUnnamedChild ? [] : {}
  let consumed = 0

  // If the tuple has a dynamic child, we must first decode the offset to the
  // tuple data.
  if (hasDynamicChild(param)) {
    // Dealing with dynamic types, so get the offset of the tuple data.
    const offset = Bytes.toNumber(cursor.readBytes(sizeOfOffset))

    // Start is the static position of referencing slot + offset.
    const start = staticPosition + offset

    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i]!
      cursor.setPosition(start + consumed)
      const [data, consumed_] = decodeParameter(cursor, component, {
        staticPosition: start,
      })
      consumed += consumed_
      value[hasUnnamedChild ? i : component?.name!] = data
    }

    // As we have gone wondering, restore to the original position + next slot.
    cursor.setPosition(staticPosition + 32)
    return [value, 32]
  }

  // If the tuple has static children, we can just decode each component
  // in sequence.
  for (let i = 0; i < param.components.length; ++i) {
    const component = param.components[i]!
    const [data, consumed_] = decodeParameter(cursor, component, {
      staticPosition,
    })
    value[hasUnnamedChild ? i : component?.name!] = data
    consumed += consumed_
  }
  return [value, consumed]
}

export declare namespace decodeTuple {
  type ErrorType = Bytes.toNumber.ErrorType | Errors.GlobalErrorType
}

/** @internal */
export function decodeString(
  cursor: Cursor.Cursor,
  { staticPosition }: { staticPosition: number },
) {
  // Get offset to start of string data.
  const offset = Bytes.toNumber(cursor.readBytes(32))

  // Start is the static position of current slot + offset.
  const start = staticPosition + offset
  cursor.setPosition(start)

  const length = Bytes.toNumber(cursor.readBytes(32))

  // If there is no length, we have zero data (empty string).
  if (length === 0) {
    cursor.setPosition(staticPosition + 32)
    return ['', 32]
  }

  const data = cursor.readBytes(length, 32)
  const value = Bytes.toString(Bytes.trimLeft(data))

  // As we have gone wondering, restore to the original position + next slot.
  cursor.setPosition(staticPosition + 32)

  return [value, 32]
}

export declare namespace decodeString {
  type ErrorType =
    | Bytes.toNumber.ErrorType
    | Bytes.toString.ErrorType
    | Bytes.trimLeft.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function prepareParameters<
  const parameters extends AbiParameters.AbiParameters,
>({
  parameters,
  values,
}: {
  parameters: parameters
  values: parameters extends AbiParameters.AbiParameters
    ? ToPrimitiveTypes<parameters>
    : never
}) {
  const preparedParameters: PreparedParameter[] = []
  for (let i = 0; i < parameters.length; i++) {
    preparedParameters.push(
      prepareParameter({ parameter: parameters[i]!, value: values[i] }),
    )
  }
  return preparedParameters
}

/** @internal */
export declare namespace prepareParameters {
  type ErrorType = prepareParameter.ErrorType | Errors.GlobalErrorType
}

/** @internal */
export function prepareParameter<
  const parameter extends AbiParameters.Parameter,
>({
  parameter: parameter_,
  value,
}: {
  parameter: parameter
  value: parameter extends AbiParameters.Parameter
    ? ParameterToPrimitiveType<parameter>
    : never
}): PreparedParameter {
  const parameter = parameter_ as AbiParameters.Parameter

  const arrayComponents = getArrayComponents(parameter.type)
  if (arrayComponents) {
    const [length, type] = arrayComponents
    return encodeArray(value, {
      length,
      parameter: {
        ...parameter,
        type,
      },
    })
  }
  if (parameter.type === 'tuple') {
    return encodeTuple(value as unknown as Tuple, {
      parameter: parameter as TupleAbiParameter,
    })
  }
  if (parameter.type === 'address') {
    return encodeAddress(value as unknown as Hex.Hex)
  }
  if (parameter.type === 'bool') {
    return encodeBoolean(value as unknown as boolean)
  }
  if (parameter.type.startsWith('uint') || parameter.type.startsWith('int')) {
    const signed = parameter.type.startsWith('int')
    return encodeNumber(value as unknown as number, { signed })
  }
  if (parameter.type.startsWith('bytes')) {
    return encodeBytes(value as unknown as Hex.Hex, { type: parameter.type })
  }
  if (parameter.type === 'string') {
    return encodeString(value as unknown as string)
  }
  throw new AbiParameters.InvalidTypeError(parameter.type)
}

/** @internal */
export declare namespace prepareParameter {
  type ErrorType =
    | encodeArray.ErrorType
    | encodeTuple.ErrorType
    | encodeAddress.ErrorType
    | encodeBoolean.ErrorType
    | encodeBytes.ErrorType
    | encodeString.ErrorType
    | AbiParameters.InvalidTypeError
    | Errors.GlobalErrorType
}

/** @internal */
export function encode(preparedParameters: PreparedParameter[]): Hex.Hex {
  // 1. Compute the size of the static part of the parameters.
  let staticSize = 0
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i]!
    if (dynamic) staticSize += 32
    else staticSize += Hex.size(encoded)
  }

  // 2. Split the parameters into static and dynamic parts.
  const staticParameters: Hex.Hex[] = []
  const dynamicParameters: Hex.Hex[] = []
  let dynamicSize = 0
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i]!
    if (dynamic) {
      staticParameters.push(
        Hex.fromNumber(staticSize + dynamicSize, { size: 32 }),
      )
      dynamicParameters.push(encoded)
      dynamicSize += Hex.size(encoded)
    } else {
      staticParameters.push(encoded)
    }
  }

  // 3. Concatenate static and dynamic parts.
  return Hex.concat(...staticParameters, ...dynamicParameters)
}

/** @internal */
export declare namespace encode {
  type ErrorType =
    | Hex.concat.ErrorType
    | Hex.fromNumber.ErrorType
    | Hex.size.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeAddress(value: Hex.Hex): PreparedParameter {
  Address.assert(value, { strict: false })
  return {
    dynamic: false,
    encoded: Hex.padLeft(value.toLowerCase() as Hex.Hex),
  }
}

/** @internal */
export declare namespace encodeAddress {
  type ErrorType =
    | Address.assert.ErrorType
    | Hex.padLeft.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeArray<const parameter extends AbiParameters.Parameter>(
  value: ParameterToPrimitiveType<parameter>,
  {
    length,
    parameter,
  }: {
    length: number | null
    parameter: parameter
  },
): PreparedParameter {
  const dynamic = length === null

  if (!Array.isArray(value)) throw new AbiParameters.InvalidArrayError(value)
  if (!dynamic && value.length !== length)
    throw new AbiParameters.ArrayLengthMismatchError({
      expectedLength: length!,
      givenLength: value.length,
      type: `${parameter.type}[${length}]`,
    })

  let dynamicChild = false
  const preparedParameters: PreparedParameter[] = []
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParameter({ parameter, value: value[i] })
    if (preparedParam.dynamic) dynamicChild = true
    preparedParameters.push(preparedParam)
  }

  if (dynamic || dynamicChild) {
    const data = encode(preparedParameters)
    if (dynamic) {
      const length = Hex.fromNumber(preparedParameters.length, { size: 32 })
      return {
        dynamic: true,
        encoded:
          preparedParameters.length > 0 ? Hex.concat(length, data) : length,
      }
    }
    if (dynamicChild) return { dynamic: true, encoded: data }
  }
  return {
    dynamic: false,
    encoded: Hex.concat(...preparedParameters.map(({ encoded }) => encoded)),
  }
}

/** @internal */
export declare namespace encodeArray {
  type ErrorType =
    | AbiParameters.InvalidArrayError
    | AbiParameters.ArrayLengthMismatchError
    | Hex.concat.ErrorType
    | Hex.fromNumber.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeBytes(
  value: Hex.Hex,
  { type }: { type: string },
): PreparedParameter {
  const [, parametersize] = type.split('bytes')
  const bytesSize = Hex.size(value)
  if (!parametersize) {
    let value_ = value
    // If the size is not divisible by 32 bytes, pad the end
    // with empty bytes to the ceiling 32 bytes.
    if (bytesSize % 32 !== 0)
      value_ = Hex.padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32)
    return {
      dynamic: true,
      encoded: Hex.concat(
        Hex.padLeft(Hex.fromNumber(bytesSize, { size: 32 })),
        value_,
      ),
    }
  }
  if (bytesSize !== Number.parseInt(parametersize))
    throw new AbiParameters.BytesSizeMismatchError({
      expectedSize: Number.parseInt(parametersize),
      value,
    })
  return { dynamic: false, encoded: Hex.padRight(value) }
}

/** @internal */
export declare namespace encodeBytes {
  type ErrorType =
    | Hex.padLeft.ErrorType
    | Hex.padRight.ErrorType
    | Hex.fromNumber.ErrorType
    | Hex.slice.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeBoolean(value: boolean): PreparedParameter {
  if (typeof value !== 'boolean')
    throw new Errors.BaseError(
      `Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`,
    )
  return { dynamic: false, encoded: Hex.padLeft(Hex.fromBoolean(value)) }
}

/** @internal */
export declare namespace encodeBoolean {
  type ErrorType =
    | Hex.padLeft.ErrorType
    | Hex.fromBoolean.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeNumber(
  value: number,
  { signed }: { signed: boolean },
): PreparedParameter {
  return {
    dynamic: false,
    encoded: Hex.fromNumber(value, {
      size: 32,
      signed,
    }),
  }
}

/** @internal */
export declare namespace encodeNumber {
  type ErrorType = Hex.fromNumber.ErrorType | Errors.GlobalErrorType
}

/** @internal */
export function encodeString(value: string): PreparedParameter {
  const hexValue = Hex.fromString(value)
  const partsLength = Math.ceil(Hex.size(hexValue) / 32)
  const parts: Hex.Hex[] = []
  for (let i = 0; i < partsLength; i++) {
    parts.push(Hex.padRight(Hex.slice(hexValue, i * 32, (i + 1) * 32)))
  }
  return {
    dynamic: true,
    encoded: Hex.concat(
      Hex.padRight(Hex.fromNumber(Hex.size(hexValue), { size: 32 })),
      ...parts,
    ),
  }
}

/** @internal */
export declare namespace encodeString {
  type ErrorType =
    | Hex.fromNumber.ErrorType
    | Hex.padRight.ErrorType
    | Hex.slice.ErrorType
    | Hex.size.ErrorType
    | Errors.GlobalErrorType
}

/** @internal */
export function encodeTuple<
  const parameter extends AbiParameters.Parameter & {
    components: readonly AbiParameters.Parameter[]
  },
>(
  value: ParameterToPrimitiveType<parameter>,
  { parameter }: { parameter: parameter },
): PreparedParameter {
  let dynamic = false
  const preparedParameters: PreparedParameter[] = []
  for (let i = 0; i < parameter.components.length; i++) {
    const param_ = parameter.components[i]!
    const index = Array.isArray(value) ? i : param_.name
    const preparedParam = prepareParameter({
      parameter: param_,
      value: (value as any)[index!] as readonly unknown[],
    })
    preparedParameters.push(preparedParam)
    if (preparedParam.dynamic) dynamic = true
  }
  return {
    dynamic,
    encoded: dynamic
      ? encode(preparedParameters)
      : Hex.concat(...preparedParameters.map(({ encoded }) => encoded)),
  }
}

/** @internal */
export declare namespace encodeTuple {
  type ErrorType = Hex.concat.ErrorType | Errors.GlobalErrorType
}

/** @internal */
export function getArrayComponents(
  type: string,
): [length: number | null, innerType: string] | undefined {
  const matches = type.match(/^(.*)\[(\d+)?\]$/)
  return matches
    ? // Return `null` if the array is dynamic.
      [matches[2]! ? Number(matches[2]!) : null, matches[1]!]
    : undefined
}

/** @internal */
export function hasDynamicChild(param: AbiParameters.Parameter) {
  const { type } = param
  if (type === 'string') return true
  if (type === 'bytes') return true
  if (type.endsWith('[]')) return true

  if (type === 'tuple') return (param as any).components?.some(hasDynamicChild)

  const arrayComponents = getArrayComponents(param.type)
  if (
    arrayComponents &&
    hasDynamicChild({
      ...param,
      type: arrayComponents[1],
    } as AbiParameters.Parameter)
  )
    return true

  return false
}
