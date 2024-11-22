import type * as abitype from 'abitype';
import type * as Abi from '../Abi.js';
import type * as AbiItem from '../AbiItem.js';
import type * as AbiParameters from '../AbiParameters.js';
import * as Errors from '../Errors.js';
import type { Compute, IsNever, IsUnion, TypeErrorMessage, UnionToTuple } from './types.js';
/** @internal */
export type ExtractArgs<abi extends Abi.Abi | readonly unknown[] = Abi.Abi, name extends AbiItem.Name<abi> = AbiItem.Name<abi>> = abitype.AbiParametersToPrimitiveTypes<AbiItem.FromAbi<abi extends Abi.Abi ? abi : Abi.Abi, name>['inputs'], 'inputs'> extends infer args ? [args] extends [never] ? readonly unknown[] : args : readonly unknown[];
/** @internal */
export type ExtractForArgs<abi extends Abi.Abi, name extends AbiItem.Name<abi>, args extends ExtractArgs<abi, name>> = IsUnion<name> extends true ? {
    [key in keyof abi]: abi[key] extends {
        name: name;
    } ? abi[key] : never;
}[number] : AbiItem.FromAbi<abi, name> extends infer abiItem extends AbiItem.AbiItem & {
    inputs: readonly abitype.AbiParameter[];
} ? IsUnion<abiItem> extends true ? UnionToTuple<abiItem> extends infer abiItems extends readonly (AbiItem.AbiItem & {
    inputs: readonly abitype.AbiParameter[];
})[] ? IsNever<TupleToUnion<abiItems, abi, name, args>> extends true ? Compute<abiItems[0] & {
    readonly overloads: UnionToTuple<Exclude<abiItems[number], abiItems[0]>>;
}> : TupleToUnion<abiItems, abi, name, args> : never : abiItem : never;
/** @internal */
export type TupleToUnion<abiItems extends readonly {
    inputs: readonly abitype.AbiParameter[];
}[], abi extends Abi.Abi, name extends AbiItem.Name<abi>, args extends ExtractArgs<abi, name>> = {
    [k in keyof abiItems]: (readonly [] extends args ? readonly [] : args) extends abitype.AbiParametersToPrimitiveTypes<abiItems[k]['inputs'], 'inputs'> ? abiItems[k] : never;
}[number];
/** @internal */
export type ErrorSignature<name extends string = string, parameters extends string = string> = `error ${name}(${parameters})`;
/** @internal */
export type IsErrorSignature<signature extends string> = signature extends ErrorSignature<infer name> ? IsName<name> : false;
/** @internal */
export type EventSignature<name extends string = string, parameters extends string = string> = `event ${name}(${parameters})`;
/** @internal */
export type IsEventSignature<signature extends string> = signature extends EventSignature<infer name> ? IsName<name> : false;
/** @internal */
export type FunctionSignature<name extends string = string, tail extends string = string> = `function ${name}(${tail}`;
export type IsFunctionSignature<signature> = signature extends FunctionSignature<infer name> ? IsName<name> extends true ? signature extends ValidFunctionSignatures ? true : signature extends `function ${string}(${infer parameters})` ? parameters extends InvalidFunctionParameters ? false : true : false : false : false;
/** @internal */
export type Scope = 'public' | 'external';
/** @internal */
export type Returns = `returns (${string})` | `returns(${string})`;
/** @internal */
export type ValidFunctionSignatures = `function ${string}()` | `function ${string}() ${Returns}` | `function ${string}() ${abitype.AbiStateMutability}` | `function ${string}() ${Scope}` | `function ${string}() ${abitype.AbiStateMutability} ${Returns}` | `function ${string}() ${Scope} ${Returns}` | `function ${string}() ${Scope} ${abitype.AbiStateMutability}` | `function ${string}() ${Scope} ${abitype.AbiStateMutability} ${Returns}` | `function ${string}(${string}) ${Returns}` | `function ${string}(${string}) ${abitype.AbiStateMutability}` | `function ${string}(${string}) ${Scope}` | `function ${string}(${string}) ${abitype.AbiStateMutability} ${Returns}` | `function ${string}(${string}) ${Scope} ${Returns}` | `function ${string}(${string}) ${Scope} ${abitype.AbiStateMutability}` | `function ${string}(${string}) ${Scope} ${abitype.AbiStateMutability} ${Returns}`;
/** @internal */
export type StructSignature<name extends string = string, properties extends string = string> = `struct ${name} {${properties}}`;
/** @internal */
export type IsStructSignature<signature extends string> = signature extends StructSignature<infer name> ? IsName<name> : false;
/** @internal */
export type ConstructorSignature<tail extends string = string> = `constructor(${tail}`;
/** @internal */
export type IsConstructorSignature<signature> = signature extends ConstructorSignature ? signature extends ValidConstructorSignatures ? true : false : false;
/** @internal */
export type ValidConstructorSignatures = `constructor(${string})` | `constructor(${string}) payable`;
/** @internal */
export type FallbackSignature<abiStateMutability extends '' | ' payable' = ''> = `fallback() external${abiStateMutability}`;
/** @internal */
export type ReceiveSignature = 'receive() external payable';
/** @internal */
export type IsSignature<type extends string> = (IsErrorSignature<type> extends true ? true : never) | (IsEventSignature<type> extends true ? true : never) | (IsFunctionSignature<type> extends true ? true : never) | (IsStructSignature<type> extends true ? true : never) | (IsConstructorSignature<type> extends true ? true : never) | (type extends FallbackSignature ? true : never) | (type extends ReceiveSignature ? true : never) extends infer condition ? [condition] extends [never] ? false : true : false;
/** @internal */
export type Signature<string1 extends string, string2 extends string | unknown = unknown> = IsSignature<string1> extends true ? string1 : string extends string1 ? string1 : TypeErrorMessage<`Signature "${string1}" is invalid${string2 extends string ? ` at position ${string2}` : ''}.`>;
/** @internal */
export type Signatures<signatures extends readonly string[]> = {
    [key in keyof signatures]: Signature<signatures[key], key>;
};
/** @internal */
export type IsName<name extends string> = name extends '' ? false : ValidateName<name> extends name ? true : false;
/** @internal */
export type ValidateName<name extends string, checkCharacters extends boolean = false> = name extends `${string}${' '}${string}` ? TypeErrorMessage<`Identifier "${name}" cannot contain whitespace.`> : IsSolidityKeyword<name> extends true ? TypeErrorMessage<`"${name}" is a protected Solidity keyword.`> : name extends `${number}` ? TypeErrorMessage<`Identifier "${name}" cannot be a number string.`> : name extends `${number}${string}` ? TypeErrorMessage<`Identifier "${name}" cannot start with a number.`> : checkCharacters extends true ? IsValidCharacter<name> extends true ? name : TypeErrorMessage<`"${name}" contains invalid character.`> : name;
/** @internal */
export type IsSolidityKeyword<type extends string> = type extends SolidityKeywords ? true : false;
/** @internal */
export type SolidityKeywords = 'after' | 'alias' | 'anonymous' | 'apply' | 'auto' | 'byte' | 'calldata' | 'case' | 'catch' | 'constant' | 'copyof' | 'default' | 'defined' | 'error' | 'event' | 'external' | 'false' | 'final' | 'function' | 'immutable' | 'implements' | 'in' | 'indexed' | 'inline' | 'internal' | 'let' | 'mapping' | 'match' | 'memory' | 'mutable' | 'null' | 'of' | 'override' | 'partial' | 'private' | 'promise' | 'public' | 'pure' | 'reference' | 'relocatable' | 'return' | 'returns' | 'sizeof' | 'static' | 'storage' | 'struct' | 'super' | 'supports' | 'switch' | 'this' | 'true' | 'try' | 'typedef' | 'typeof' | 'var' | 'view' | 'virtual' | `address${`[${string}]` | ''}` | `bool${`[${string}]` | ''}` | `string${`[${string}]` | ''}` | `tuple${`[${string}]` | ''}` | `bytes${number | ''}${`[${string}]` | ''}` | `${'u' | ''}int${number | ''}${`[${string}]` | ''}`;
/** @internal */
export type IsValidCharacter<character extends string> = character extends `${ValidCharacters}${infer tail}` ? tail extends '' ? true : IsValidCharacter<tail> : false;
/** @internal */
export type ValidCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '_' | '$';
/** @internal */
export type InvalidFunctionParameters = `${string}${MangledReturns} (${string}` | `${string}) ${MangledReturns}${string}` | `${string})${string}${MangledReturns}${string}(${string}`;
/** @internal */
export type MangledReturns = `r${string}eturns` | `re${string}turns` | `ret${string}urns` | `retu${string}rns` | `retur${string}ns` | `return${string}s` | `r${string}e${string}turns` | `r${string}et${string}urns` | `r${string}etu${string}rns` | `r${string}etur${string}ns` | `r${string}eturn${string}s` | `re${string}t${string}urns` | `re${string}tu${string}rns` | `re${string}tur${string}ns` | `re${string}turn${string}s` | `ret${string}u${string}rns` | `ret${string}ur${string}ns` | `ret${string}urn${string}s` | `retu${string}r${string}ns` | `retu${string}rn${string}s` | `retur${string}n${string}s` | `r${string}e${string}t${string}urns` | `r${string}e${string}tu${string}rns` | `r${string}e${string}tur${string}ns` | `r${string}e${string}turn${string}s` | `re${string}t${string}u${string}rns` | `re${string}t${string}ur${string}ns` | `re${string}t${string}urn${string}s` | `ret${string}u${string}r${string}ns` | `ret${string}u${string}rn${string}s` | `retu${string}r${string}n${string}s` | `r${string}e${string}t${string}u${string}rns` | `r${string}e${string}t${string}ur${string}ns` | `r${string}e${string}t${string}urn${string}s` | `re${string}t${string}u${string}r${string}ns` | `re${string}t${string}u${string}rn${string}s` | `ret${string}u${string}r${string}n${string}s` | `r${string}e${string}t${string}u${string}r${string}ns` | `r${string}e${string}t${string}u${string}rn${string}s` | `re${string}t${string}u${string}r${string}n${string}s` | `r${string}e${string}t${string}u${string}r${string}n${string}s`;
/** @internal */
export type Widen<type> = ([unknown] extends [type] ? unknown : never) | (type extends Function ? type : never) | (type extends abitype.ResolvedRegister['bigIntType'] ? bigint : never) | (type extends boolean ? boolean : never) | (type extends abitype.ResolvedRegister['intType'] ? number : never) | (type extends string ? type extends abitype.ResolvedRegister['addressType'] ? abitype.ResolvedRegister['addressType'] : type extends abitype.ResolvedRegister['bytesType']['inputs'] ? abitype.ResolvedRegister['bytesType'] : string : never) | (type extends readonly [] ? readonly [] : never) | (type extends Record<string, unknown> ? {
    [K in keyof type]: Widen<type[K]>;
} : never) | (type extends {
    length: number;
} ? {
    [K in keyof type]: Widen<type[K]>;
} extends infer Val extends readonly unknown[] ? readonly [...Val] : never : never);
/** @internal */
export declare function normalizeSignature(signature: string): string;
/** @internal */
export declare namespace normalizeSignature {
    type ErrorType = Errors.BaseError | Errors.GlobalErrorType;
}
/** @internal */
export declare function isArgOfType(arg: unknown, abiParameter: AbiParameters.Parameter): boolean;
/** @internal */
export declare function getAmbiguousTypes(sourceParameters: readonly AbiParameters.Parameter[], targetParameters: readonly AbiParameters.Parameter[], args: ExtractArgs): AbiParameters.Parameter['type'][] | undefined;
//# sourceMappingURL=abiItem.d.ts.map