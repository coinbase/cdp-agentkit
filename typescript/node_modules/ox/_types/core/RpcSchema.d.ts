import type { ResolvedRegister } from './internal/register.js';
import type { Compute, IsNarrowable } from './internal/types.js';
export type { Eth } from './internal/rpcSchemas/eth.js';
export type { Wallet } from './internal/rpcSchemas/wallet.js';
/**
 * Instantiates a statically typed Schema. This is a runtime-noop function, and is purposed
 * to be used as a type-level tag to be used with {@link ox#Provider.(from:function)} or
 * {@link ox#RpcTransport.(fromHttp:function)}.
 *
 * @example
 * ### Using with `Provider.from`
 *
 * ```ts twoslash
 * // @noErrors
 * import 'ox/window'
 * import { Provider, RpcSchema } from 'ox'
 *
 * const schema = RpcSchema.from<
 *   | RpcSchema.Default
 *   | {
 *       Request: {
 *         method: 'abe_foo',
 *         params: [id: number],
 *       }
 *       ReturnType: string
 *     }
 *   | {
 *       Request: {
 *         method: 'abe_bar',
 *         params: [id: string],
 *       }
 *       ReturnType: string
 *     }
 * >()
 *
 * const provider = Provider.from(window.ethereum, { schema })
 *
 * const blockNumber = await provider.request({ method: 'e' })
 * //                                                    ^|
 *
 *
 *
 *
 *
 * ```
 */
export declare function from<schema extends Generic>(): schema;
/**
 * Extracts a schema item from a {@link ox#RpcSchema.Generic} or {@link ox#RpcSchema.MethodNameGeneric}.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Item = RpcSchema.ExtractItem<RpcSchema.Eth, 'eth_getBlockByNumber'>
 * //   ^?
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
 *
 * ```
 */
export type ExtractItem<schema extends Generic, methodName extends MethodNameGeneric<schema> = MethodNameGeneric<schema>> = Compute<{
    Request: ExtractRequest<schema, methodName>;
    ReturnType: ExtractReturnType<schema, methodName>;
}>;
/**
 * Extracts request from a {@link ox#RpcSchema.Generic} or {@link ox#RpcSchema.MethodNameGeneric}.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Request = RpcSchema.ExtractRequest<RpcSchema.Eth, 'eth_getBlockByNumber'>
 * //   ^?
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
 */
export type ExtractRequest<schema extends Generic, methodName extends MethodNameGeneric<schema> = MethodNameGeneric<schema>> = Extract<schema['Request'], {
    method: methodName;
}>;
/**
 * Type-safe union of all JSON-RPC Method Names.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type MethodName = RpcSchema.ExtractMethodName<RpcSchema.Default>
 * //   ^?
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 */
export type ExtractMethodName<schema extends Generic> = schema['Request']['method'];
/**
 * Extracts parameters from a {@link ox#RpcSchema.Generic} or {@link ox#RpcSchema.MethodNameGeneric}.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Eth_GetBlockByNumber = RpcSchema.ExtractParams<RpcSchema.Eth, 'eth_getBlockByNumber'>
 * //   ^?
 *
 *
 *
 *
 *
 * ```
 */
export type ExtractParams<schema extends Generic, methodName extends MethodNameGeneric<schema> = MethodNameGeneric<schema>> = ExtractRequest<schema, methodName>['params'];
/**
 * Extracts return type from a {@link ox#RpcSchema.Generic} or {@link ox#RpcSchema.MethodNameGeneric}.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type ReturnType = RpcSchema.ExtractReturnType<RpcSchema.Eth, 'eth_getBlockByNumber'>
 * //   ^?
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
 */
export type ExtractReturnType<schema extends Generic, methodName extends MethodNameGeneric<schema> = MethodNameGeneric<schema>> = methodName extends schema['Request']['method'] ? IsNarrowable<schema, Generic> extends true ? Extract<schema, {
    Request: {
        method: methodName;
    };
}>['ReturnType'] : unknown : unknown;
/**
 * Type to define a custom type-safe JSON-RPC Schema.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema, RpcRequest } from 'ox'
 *
 * type Schema = RpcSchema.From<{
 *   Request: {
 *     method: 'eth_foobar',
 *     params: [id: number],
 *   }
 *   ReturnType: string
 * }>
 * ```
 */
export type From<schema extends Generic> = schema;
/**
 * Generic type to define a JSON-RPC Method.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Schema = RpcSchema.Generic
 * //   ^?
 *
 *
 *
 *
 *
 *
 * ```
 */
export type Generic<name extends string = string, params = unknown> = {
    Request: {
        method: name;
        params?: params | undefined;
    };
    ReturnType?: unknown;
};
/**
 * Type-safe union of all JSON-RPC Methods.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Schema = RpcSchema.Default
 * //   ^?
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
 *
 * ```
 */
export type Default = ResolvedRegister['RpcSchema'];
/**
 * Generic type to define a JSON-RPC Method Name.
 *
 * @example
 * ```ts twoslash
 * import { RpcSchema } from 'ox'
 *
 * type Name = RpcSchema.MethodNameGeneric
 * //   ^?
 *
 *
 *
 *
 *
 * ```
 */
export type MethodNameGeneric<schema extends Generic = Generic> = schema['Request']['method'] | (string & {});
//# sourceMappingURL=RpcSchema.d.ts.map