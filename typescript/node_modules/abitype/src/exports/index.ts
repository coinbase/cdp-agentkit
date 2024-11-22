export type {
  Abi,
  AbiConstructor,
  AbiError,
  AbiEvent,
  AbiEventParameter,
  AbiFallback,
  AbiFunction,
  AbiInternalType,
  AbiItemType,
  AbiParameter,
  AbiParameterKind,
  AbiReceive,
  AbiStateMutability,
  AbiType,
  Address,
  SolidityAddress,
  SolidityArray,
  SolidityArrayWithoutTuple,
  SolidityArrayWithTuple,
  SolidityBool,
  SolidityBytes,
  SolidityFixedArrayRange,
  SolidityFixedArraySizeLookup,
  SolidityFunction,
  SolidityInt,
  SolidityString,
  SolidityTuple,
  TypedData,
  TypedDataDomain,
  TypedDataParameter,
  TypedDataType,
} from '../abi.js'

// biome-ignore lint/performance/noBarrelFile: <explanation>
export { BaseError } from '../errors.js'

export type { Narrow } from '../narrow.js'
export { narrow } from '../narrow.js'

export type {
  Register,
  DefaultRegister,
  ResolvedRegister,
} from '../register.js'

export type {
  AbiParameterToPrimitiveType,
  AbiParametersToPrimitiveTypes,
  AbiTypeToPrimitiveType,
  ExtractAbiError,
  ExtractAbiErrorNames,
  ExtractAbiErrors,
  ExtractAbiEvent,
  ExtractAbiEventNames,
  ExtractAbiEvents,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
  ExtractAbiFunctions,
  IsAbi,
  IsTypedData,
  TypedDataToPrimitiveTypes,
} from '../utils.js'

////////////////////////////////////////////////////////////////////////////////////////////////////
// Human-Readable

export {
  formatAbi,
  type FormatAbi,
} from '../human-readable/formatAbi.js'

export {
  formatAbiItem,
  type FormatAbiItem,
} from '../human-readable/formatAbiItem.js'

export {
  formatAbiParameter,
  type FormatAbiParameter,
} from '../human-readable/formatAbiParameter.js'

export {
  formatAbiParameters,
  type FormatAbiParameters,
} from '../human-readable/formatAbiParameters.js'

export { parseAbi, type ParseAbi } from '../human-readable/parseAbi.js'

export {
  parseAbiItem,
  type ParseAbiItem,
} from '../human-readable/parseAbiItem.js'

export {
  parseAbiParameter,
  type ParseAbiParameter,
} from '../human-readable/parseAbiParameter.js'

export {
  parseAbiParameters,
  type ParseAbiParameters,
} from '../human-readable/parseAbiParameters.js'

export {
  UnknownTypeError,
  InvalidAbiItemError,
  UnknownSolidityTypeError,
} from '../human-readable/errors/abiItem.js'

export {
  InvalidAbiTypeParameterError,
  InvalidFunctionModifierError,
  InvalidModifierError,
  SolidityProtectedKeywordError,
  InvalidParameterError,
  InvalidAbiParametersError,
  InvalidAbiParameterError,
} from '../human-readable/errors/abiParameter.js'

export {
  InvalidStructSignatureError,
  InvalidSignatureError,
  UnknownSignatureError,
} from '../human-readable/errors/signature.js'

export { InvalidParenthesisError } from '../human-readable/errors/splitParameters.js'

export { CircularReferenceError } from '../human-readable/errors/struct.js'
