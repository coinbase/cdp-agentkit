import type { ResolvedRegister } from './register.js'
import type { Pretty, Range } from './types.js'

export type Address = ResolvedRegister['addressType']

////////////////////////////////////////////////////////////////////////////////////////////////////
// Solidity Types

// Could use `Range`, but listed out for zero overhead
// biome-ignore format: no formatting
type MBytes =
  | '' | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9
  | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19
  | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29
  | 30 | 31 | 32
// biome-ignore format: no formatting
export type MBits =
  | ''  | 8   | 16  | 24  | 32  | 40  | 48  | 56  | 64  | 72
  | 80  | 88  | 96  | 104 | 112 | 120 | 128 | 136 | 144 | 152
  | 160 | 168 | 176 | 184 | 192 | 200 | 208 | 216 | 224 | 232
  | 240 | 248 | 256

// From https://docs.soliditylang.org/en/latest/abi-spec.html#types
export type SolidityAddress = 'address'
export type SolidityBool = 'bool'
export type SolidityBytes = `bytes${MBytes}` // `bytes<M>`: binary type of `M` bytes, `0 < M <= 32`
export type SolidityFunction = 'function'
export type SolidityString = 'string'
export type SolidityTuple = 'tuple'
export type SolidityInt = `${'u' | ''}int${MBits}` // `(u)int<M>`: (un)signed integer type of `M` bits, `0 < M <= 256`, `M % 8 == 0`
// No need to support "fixed" until Solidity does
// https://github.com/ethereum/solidity/issues/409
// `(u)fixed<M>x<N>`: (un)signed fixed-point decimal number of `M` bits, `8 <= M <= 256`, `M % 8 == 0`,
// and `0 < N <= 80`, which denotes the value `v` as `v / (10 ** N)`
// export type SolidityFixed =
//   | `${'u' | ''}fixed`
//   | `${'u' | ''}fixed${MBits}x${Range<1, 20>[number]}`

export type SolidityFixedArrayRange = Range<
  ResolvedRegister['fixedArrayMinLength'],
  ResolvedRegister['fixedArrayMaxLength']
>[number]
export type SolidityFixedArraySizeLookup = {
  [Prop in SolidityFixedArrayRange as `${Prop}`]: Prop
}

/**
 * Recursively build arrays up to maximum depth
 * or use a more broad type when maximum depth is switched "off"
 */
type _BuildArrayTypes<
  T extends string,
  Depth extends readonly number[] = [],
> = ResolvedRegister['arrayMaxDepth'] extends false
  ? `${T}[${string}]`
  : Depth['length'] extends ResolvedRegister['arrayMaxDepth']
    ? T
    : T extends `${any}[${SolidityFixedArrayRange | ''}]`
      ? _BuildArrayTypes<
          T | `${T}[${SolidityFixedArrayRange | ''}]`,
          [...Depth, 1]
        >
      : _BuildArrayTypes<`${T}[${SolidityFixedArrayRange | ''}]`, [...Depth, 1]>

// Modeling fixed-length (`<type>[M]`) and dynamic (`<type>[]`) arrays
// Tuple and non-tuple versions are separated out for narrowing anywhere structs show up
export type SolidityArrayWithoutTuple = _BuildArrayTypes<
  | SolidityAddress
  | SolidityBool
  | SolidityBytes
  | SolidityFunction
  | SolidityInt
  | SolidityString
>
export type SolidityArrayWithTuple = _BuildArrayTypes<SolidityTuple>
export type SolidityArray = SolidityArrayWithoutTuple | SolidityArrayWithTuple

////////////////////////////////////////////////////////////////////////////////////////////////////
// Abi Types

export type AbiType =
  | SolidityArray
  | SolidityAddress
  | SolidityBool
  | SolidityBytes
  | SolidityFunction
  | SolidityInt
  | SolidityString
  | SolidityTuple
type ResolvedAbiType = ResolvedRegister['strictAbiType'] extends true
  ? AbiType
  : string

export type AbiInternalType =
  | ResolvedAbiType
  | `address ${string}`
  | `contract ${string}`
  | `enum ${string}`
  | `struct ${string}`

export type AbiParameter = Pretty<
  {
    type: ResolvedAbiType
    name?: string | undefined
    /** Representation used by Solidity compiler */
    internalType?: AbiInternalType | undefined
  } & (
    | { type: Exclude<ResolvedAbiType, SolidityTuple | SolidityArrayWithTuple> }
    | {
        type: SolidityTuple | SolidityArrayWithTuple
        components: readonly AbiParameter[]
      }
  )
>

export type AbiEventParameter = AbiParameter & { indexed?: boolean | undefined }

/**
 * State mutability for {@link AbiFunction}
 *
 * @see https://docs.soliditylang.org/en/latest/contracts.html#state-mutability
 */
export type AbiStateMutability = 'pure' | 'view' | 'nonpayable' | 'payable'

/** Kind of {@link AbiParameter} */
export type AbiParameterKind = 'inputs' | 'outputs'

/** ABI ["function"](https://docs.soliditylang.org/en/latest/abi-spec.html#json) type */
export type AbiFunction = {
  type: 'function'
  /**
   * @deprecated use `pure` or `view` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  constant?: boolean | undefined
  /**
   * @deprecated Vyper used to provide gas estimates
   * @see https://github.com/vyperlang/vyper/issues/2151
   */
  gas?: number | undefined
  inputs: readonly AbiParameter[]
  name: string
  outputs: readonly AbiParameter[]
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean | undefined
  stateMutability: AbiStateMutability
}

/** ABI ["constructor"](https://docs.soliditylang.org/en/latest/abi-spec.html#json) type */
export type AbiConstructor = {
  type: 'constructor'
  inputs: readonly AbiParameter[]
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean | undefined
  stateMutability: Extract<AbiStateMutability, 'payable' | 'nonpayable'>
}

/** ABI ["fallback"](https://docs.soliditylang.org/en/latest/abi-spec.html#json) type */
export type AbiFallback = {
  type: 'fallback'
  /**
   * @deprecated use `payable` or `nonpayable` from {@link AbiStateMutability} instead
   * @see https://github.com/ethereum/solidity/issues/992
   */
  payable?: boolean | undefined
  stateMutability: Extract<AbiStateMutability, 'payable' | 'nonpayable'>
}

/** ABI ["receive"](https://docs.soliditylang.org/en/latest/contracts.html#receive-ether-function) type */
export type AbiReceive = {
  type: 'receive'
  stateMutability: Extract<AbiStateMutability, 'payable'>
}

/** ABI ["event"](https://docs.soliditylang.org/en/latest/abi-spec.html#events) type */
export type AbiEvent = {
  type: 'event'
  anonymous?: boolean | undefined
  inputs: readonly AbiEventParameter[]
  name: string
}

/** ABI ["error"](https://docs.soliditylang.org/en/latest/abi-spec.html#errors) type */
export type AbiError = {
  type: 'error'
  inputs: readonly AbiParameter[]
  name: string
}

/** `"type"` name for {@link Abi} items. */
export type AbiItemType =
  | 'constructor'
  | 'error'
  | 'event'
  | 'fallback'
  | 'function'
  | 'receive'

/**
 * Contract [ABI Specification](https://docs.soliditylang.org/en/latest/abi-spec.html#json)
 */
export type Abi = readonly (
  | AbiConstructor
  | AbiError
  | AbiEvent
  | AbiFallback
  | AbiFunction
  | AbiReceive
)[]

////////////////////////////////////////////////////////////////////////////////////////////////////
// Typed Data Types

export type TypedDataDomain = {
  chainId?: number | undefined
  name?: string | undefined
  salt?: ResolvedRegister['bytesType']['outputs'] | undefined
  verifyingContract?: Address | undefined
  version?: string | undefined
}

// Subset of `AbiType` that excludes `tuple`, `function`, and dynamic aliases `int` and `uint`
export type TypedDataType = Exclude<
  AbiType,
  SolidityFunction | SolidityTuple | SolidityArrayWithTuple | 'int' | 'uint'
>

export type TypedDataParameter = {
  name: string
  type: TypedDataType | keyof TypedData | `${keyof TypedData}[${string | ''}]`
}

/**
 * [EIP-712](https://eips.ethereum.org/EIPS/eip-712#definition-of-typed-structured-data-%F0%9D%95%8A) Typed Data Specification
 */
export type TypedData = Pretty<
  Record<string, readonly TypedDataParameter[]> & {
    // Disallow `TypedDataType` as key names (e.g. `address`)
    [_ in TypedDataType]?: never
  }
>
