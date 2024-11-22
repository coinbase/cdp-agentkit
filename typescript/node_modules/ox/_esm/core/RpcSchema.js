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
export function from() {
    return null;
}
//# sourceMappingURL=RpcSchema.js.map