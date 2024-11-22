// biome-ignore lint/suspicious/noEmptyInterface: <explanation>
export interface Register {}

// TODO: Remove deprecated properties next major version
export type ResolvedRegister = {
  /**
   * TypeScript type to use for `address` values
   * @default `0x${string}`
   */
  addressType: Register extends { addressType: infer type }
    ? type
    : Register extends { AddressType: infer type }
      ? type
      : DefaultRegister['addressType']
  /**
   * TypeScript type to use for `int<M>` and `uint<M>` values, where `M > 48`
   * @default bigint
   */
  bigIntType: Register extends { bigIntType: infer type }
    ? type
    : Register extends { BigIntType: infer type }
      ? type
      : DefaultRegister['bigIntType']
  /**
   * TypeScript type to use for `bytes` values
   * @default { inputs: `0x${string}`; outputs: `0x${string}`; }
   */
  bytesType: Register extends {
    bytesType: infer type extends { inputs: unknown; outputs: unknown }
  }
    ? type
    : Register extends {
          BytesType: infer type extends { inputs: unknown; outputs: unknown }
        }
      ? type
      : DefaultRegister['bytesType']
  /**
   * TypeScript type to use for `int<M>` and `uint<M>` values, where `M <= 48`
   * @default number
   */
  intType: Register extends { intType: infer type }
    ? type
    : Register extends { IntType: infer type }
      ? type
      : DefaultRegister['intType']

  /**
   * Maximum depth for nested array types (e.g. string[][])
   *
   * Note: You probably only want to set this to a specific number if parsed types are returning as `unknown`
   * and you want to figure out why. If you set this, you should probably also reduce `FixedArrayMaxLength`.
   *
   * @default false
   */
  arrayMaxDepth: Register extends {
    arrayMaxDepth: infer type extends number | false
  }
    ? type
    : Register extends {
          ArrayMaxDepth: infer type extends number | false
        }
      ? type
      : DefaultRegister['arrayMaxDepth']
  /**
   * Lower bound for fixed array length
   * @default 1
   */
  fixedArrayMinLength: Register extends {
    fixedArrayMinLength: infer type extends number
  }
    ? type
    : Register extends {
          FixedArrayMinLength: infer type extends number
        }
      ? type
      : DefaultRegister['fixedArrayMinLength']
  /**
   * Upper bound for fixed array length
   * @default 99
   */
  fixedArrayMaxLength: Register extends {
    fixedArrayMaxLength: infer type extends number
  }
    ? type
    : Register extends {
          FixedArrayMaxLength: infer type extends number
        }
      ? type
      : DefaultRegister['fixedArrayMaxLength']

  /**
   * When set, validates {@link AbiParameter}'s `type` against {@link AbiType}
   *
   * Note: You probably only want to set this to `true` if parsed types are returning as `unknown`
   * and you want to figure out why.
   *
   * @default false
   */
  strictAbiType: Register extends { strictAbiType: infer type extends boolean }
    ? type
    : Register extends { StrictAbiType: infer type extends boolean }
      ? type
      : DefaultRegister['strictAbiType']

  /** @deprecated Use `addressType` instead */
  AddressType: ResolvedRegister['addressType']
  /** @deprecated Use `addressType` instead */
  BigIntType: ResolvedRegister['bigIntType']
  /** @deprecated Use `bytesType` instead */
  BytesType: ResolvedRegister['bytesType']
  /** @deprecated Use `intType` instead */
  IntType: ResolvedRegister['intType']
  /** @deprecated Use `arrayMaxDepth` instead */
  ArrayMaxDepth: ResolvedRegister['arrayMaxDepth']
  /** @deprecated Use `fixedArrayMinLength` instead */
  FixedArrayMinLength: ResolvedRegister['fixedArrayMinLength']
  /** @deprecated Use `fixedArrayMaxLength` instead */
  FixedArrayMaxLength: ResolvedRegister['fixedArrayMaxLength']
  /** @deprecated Use `strictAbiType` instead */
  StrictAbiType: ResolvedRegister['strictAbiType']
}

export type DefaultRegister = {
  /** Maximum depth for nested array types (e.g. string[][]) */
  arrayMaxDepth: false
  /** Lower bound for fixed array length */
  fixedArrayMinLength: 1
  /** Upper bound for fixed array length */
  fixedArrayMaxLength: 99

  /** TypeScript type to use for `address` values */
  addressType: `0x${string}`
  /** TypeScript type to use for `bytes` values */
  bytesType: {
    /** TypeScript type to use for `bytes` input values */
    inputs: `0x${string}`
    /** TypeScript type to use for `bytes` output values */
    outputs: `0x${string}`
  }
  /** TypeScript type to use for `int<M>` and `uint<M>` values, where `M > 48` */
  bigIntType: bigint
  /** TypeScript type to use for `int<M>` and `uint<M>` values, where `M <= 48` */
  intType: number

  /** When set, validates {@link AbiParameter}'s `type` against {@link AbiType} */
  strictAbiType: false

  /** @deprecated Use `arrayMaxDepth` instead */
  ArrayMaxDepth: DefaultRegister['arrayMaxDepth']
  /** @deprecated Use `fixedArrayMinLength` instead */
  FixedArrayMinLength: DefaultRegister['fixedArrayMinLength']
  /** @deprecated Use `fixedArrayMaxLength` instead */
  FixedArrayMaxLength: DefaultRegister['fixedArrayMaxLength']
  /** @deprecated Use `addressType` instead */
  AddressType: DefaultRegister['addressType']
  /** @deprecated Use `bytesType` instead */
  BytesType: {
    inputs: DefaultRegister['bytesType']['inputs']
    outputs: DefaultRegister['bytesType']['outputs']
  }
  /** @deprecated Use `bigIntType` instead */
  BigIntType: DefaultRegister['bigIntType']
  /** @deprecated Use `intType` instead */
  IntType: DefaultRegister['intType']
  /** @deprecated Use `strictAbiType` instead */
  StrictAbiType: DefaultRegister['strictAbiType']
}
