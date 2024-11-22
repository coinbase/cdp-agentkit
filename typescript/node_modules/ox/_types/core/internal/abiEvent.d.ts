import type * as abitype from 'abitype';
import type * as Filter from '../Filter.js';
import type * as Hex from '../Hex.js';
import type * as AbiItem_internal from './abiItem.js';
import type { Compute, Filter as Filter_internal, MaybeRequired, TypeErrorMessage, UnionToIntersection } from './types.js';
/** @internal */
export type EventParameterOptions = {
    EnableUnion?: boolean;
    IndexedOnly?: boolean;
    Required?: boolean;
};
/** @internal */
export type DefaultEventParameterOptions = {
    EnableUnion: true;
    IndexedOnly: true;
    Required: false;
};
/** @internal */
export type IsSignature<signature extends string> = (AbiItem_internal.IsEventSignature<signature> extends true ? true : never) | (AbiItem_internal.IsStructSignature<signature> extends true ? true : never) extends infer condition ? [condition] extends [never] ? false : true : false;
/** @internal */
export type Signature<signature extends string, key extends string | unknown = unknown> = IsSignature<signature> extends true ? signature : string extends signature ? signature : TypeErrorMessage<`Signature "${signature}" is invalid${key extends string ? ` at position ${key}` : ''}.`>;
/** @internal */
export type Signatures<signatures extends readonly string[]> = {
    [key in keyof signatures]: Signature<signatures[key], key>;
};
/** @internal */
export type ParametersToPrimitiveTypes<abiParameters extends readonly abitype.AbiParameter[], options extends EventParameterOptions = DefaultEventParameterOptions> = abiParameters extends readonly [] ? readonly [] : Filter_internal<abiParameters, options['IndexedOnly'] extends true ? {
    indexed: true;
} : object> extends infer Filtered extends readonly abitype.AbiParameter[] ? Filtered extends readonly [] ? readonly [] : HasNamedAbiParameter<Filtered> extends true ? UnionToIntersection<{
    [index in keyof Filtered]: Filtered[index] extends {
        name: infer name extends string;
    } ? {
        [key in name]?: ParameterToPrimitiveType<Filtered[index], options> | undefined;
    } : {
        [key in index]?: ParameterToPrimitiveType<Filtered[index], options> | undefined;
    };
}[number]> extends infer Mapped ? Compute<MaybeRequired<Mapped, options['Required'] extends boolean ? options['Required'] : false>> : never : readonly [
    ...{
        [K in keyof Filtered]: ParameterToPrimitiveType<Filtered[K], options>;
    }
] | (options['Required'] extends true ? never : Filtered extends readonly [
    ...infer Head extends readonly abitype.AbiParameter[],
    infer _
] ? ParametersToPrimitiveTypes<readonly [
    ...{
        [K in keyof Head]: Omit<Head[K], 'name'>;
    }
], options> : never) : never;
/** @internal */
export type ParameterToPrimitiveType<abiParameter extends abitype.AbiParameter, options extends EventParameterOptions = DefaultEventParameterOptions, _type = abitype.AbiParameterToPrimitiveType<abiParameter>> = options['EnableUnion'] extends true ? TopicType<_type> : _type;
/** @internal */
export type TopicType<primitiveType = Hex.Hex, topic extends Filter.Topic = Filter.Topic> = topic extends Hex.Hex ? primitiveType : topic extends readonly Hex.Hex[] ? primitiveType[] : topic extends null ? null : never;
/** @internal */
export type HasNamedAbiParameter<abiParameters extends readonly abitype.AbiParameter[]> = abiParameters extends readonly [
    infer Head extends abitype.AbiParameter,
    ...infer Tail extends readonly abitype.AbiParameter[]
] ? Head extends {
    name: string;
} ? Head['name'] extends '' ? HasNamedAbiParameter<Tail> : true : HasNamedAbiParameter<Tail> : false;
//# sourceMappingURL=abiEvent.d.ts.map