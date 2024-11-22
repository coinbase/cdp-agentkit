import type { Errors } from '../index.js'
import type * as RpcSchema from './RpcSchema.js'
import type * as RpcSchema_internal from './internal/rpcSchema.js'
import type { Compute } from './internal/types.js'

/** A JSON-RPC request object as per the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification#request_object). */
export type RpcRequest<schema extends RpcSchema.Generic = RpcSchema.Generic> =
  Compute<
    schema extends any
      ? schema['Request'] & {
          id: number
          jsonrpc: '2.0'
          /** @deprecated internal */
          _returnType: schema['ReturnType']
        }
      : never
  >

/** JSON-RPC request store type. */
export type Store<schema extends RpcSchema.Generic = RpcSchema.Default> =
  Compute<{
    prepare: <methodName extends RpcSchema.MethodNameGeneric>(
      parameters: Compute<
        RpcSchema_internal.ExtractRequestOpaque<schema, methodName>
      >,
    ) => Compute<RpcRequest<RpcSchema.ExtractItem<schema, methodName>>>
    readonly id: number
  }>

/**
 * Creates a JSON-RPC request store to build requests with an incrementing `id`.
 *
 * Returns a type-safe `prepare` function to build a JSON-RPC request object as per the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification#request_object).
 *
 * @example
 * ```ts twoslash
 * import { RpcRequest } from 'ox'
 *
 * const store = RpcRequest.createStore()
 *
 * const request_1 = store.prepare({
 *   method: 'eth_blockNumber',
 * })
 * // @log: { id: 0, jsonrpc: '2.0', method: 'eth_blockNumber' }
 *
 * const request_2 = store.prepare({
 *   method: 'eth_call',
 *   params: [
 *     {
 *       to: '0x0000000000000000000000000000000000000000',
 *       data: '0xdeadbeef',
 *     },
 *   ],
 * })
 * // @log: { id: 1, jsonrpc: '2.0', method: 'eth_call', params: [{ to: '0x0000000000000000000000000000000000000000', data: '0xdeadbeef' }] }
 * ```
 *
 * @example
 * ### Type-safe Custom Schemas
 *
 * It is possible to define your own type-safe schema by using the {@link ox#RpcSchema.From} type.
 *
 * ```ts twoslash
 * import { RpcSchema, RpcRequest } from 'ox'
 *
 * type Schema = RpcSchema.From<{ // [!code focus]
 *   Request: { // [!code focus]
 *     method: 'eth_foobar' // [!code focus]
 *     params: [number] // [!code focus]
 *   } // [!code focus]
 *   ReturnType: string // [!code focus]
 * } | { // [!code focus]
 *   Request: { // [!code focus]
 *     method: 'eth_foobaz' // [!code focus]
 *     params: [string] // [!code focus]
 *   } // [!code focus]
 *   ReturnType: string // [!code focus]
 * }> // [!code focus]
 *
 * const store = RpcRequest.createStore<Schema>() // [!code focus]
 *
 * const request = store.prepare({
 *   method: 'eth_foobar', // [!code focus]
 *   // ^?
 *   params: [42],
 * })
 * ```
 *
 * @param options - Request store options.
 * @returns The request store
 */
export function createStore<
  schema extends RpcSchema.Generic = RpcSchema.Default,
>(options: createStore.Options = {}): createStore.ReturnType<schema> {
  let id = options.id ?? 0
  return {
    prepare(options) {
      return from({
        id: id++,
        ...options,
      } as never) as never
    },
    get id() {
      return id
    },
  }
}

export declare namespace createStore {
  type Options = {
    /** The initial request ID. */
    id?: number
  }

  type ReturnType<schema extends RpcSchema.Generic = RpcSchema.Default> =
    Store<schema>

  type ErrorType = Errors.GlobalErrorType
}

createStore.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as createStore.ErrorType

/**
 * A type-safe interface to build a JSON-RPC request object as per the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification#request_object).
 *
 * :::warning
 *
 * You will likely want to use {@link ox#RpcRequest.(createStore:function)} instead as it will also manage `id`s and uses this function internally.
 *
 * :::
 *
 * @example
 * ```ts twoslash
 * import { RpcRequest, RpcResponse } from 'ox'
 *
 * // 1. Build a request object.
 * const request = RpcRequest.from({ // [!code focus]
 *   id: 0, // [!code focus]
 *   method: 'eth_estimateGas', // [!code focus]
 *   params: [ // [!code focus]
 *     { // [!code focus]
 *       from: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
 *       to: '0x0D44f617435088c947F00B31160f64b074e412B4', // [!code focus]
 *       value: '0x69420', // [!code focus]
 *     }, // [!code focus]
 *   ], // [!code focus]
 * }) // [!code focus]
 *
 * // 2. Send the JSON-RPC request via HTTP.
 * const gas = await fetch('https://1.rpc.thirdweb.com', {
 *   body: JSON.stringify(request),
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   method: 'POST',
 * })
 *  .then((response) => response.json())
 *  // 3. Parse the JSON-RPC response into a type-safe result.
 *  .then((response) => RpcResponse.parse(response, { request }))
 * ```
 *
 * @param options - JSON-RPC request options.
 * @returns The fully-formed JSON-RPC request object.
 */
export function from<methodName extends RpcSchema.MethodNameGeneric>(
  options: from.Options<methodName>,
): from.ReturnType<methodName> {
  return {
    ...options,
    jsonrpc: '2.0',
  } as never
}

export declare namespace from {
  type Options<methodName extends RpcSchema.MethodNameGeneric> = Compute<
    RpcSchema_internal.ExtractRequestOpaque<RpcSchema.Default, methodName> & {
      id: number
    }
  >

  type ReturnType<methodName extends RpcSchema.MethodNameGeneric> = Compute<
    RpcRequest<RpcSchema.ExtractItem<RpcSchema.Default, methodName>>
  >

  type ErrorType = Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType
