import { type UrlRequiredErrorType } from '../../errors/transport.js';
import type { ErrorType } from '../../errors/utils.js';
import { type HttpRpcClientOptions } from '../../utils/rpc/http.js';
import { type CreateTransportErrorType, type Transport, type TransportConfig } from './createTransport.js';
export type HttpTransportConfig = {
    /**
     * Whether to enable Batch JSON-RPC.
     * @link https://www.jsonrpc.org/specification#batch
     */
    batch?: boolean | {
        /** The maximum number of JSON-RPC requests to send in a batch. @default 1_000 */
        batchSize?: number | undefined;
        /** The maximum number of milliseconds to wait before sending a batch. @default 0 */
        wait?: number | undefined;
    } | undefined;
    /**
     * Request configuration to pass to `fetch`.
     * @link https://developer.mozilla.org/en-US/docs/Web/API/fetch
     */
    fetchOptions?: HttpRpcClientOptions['fetchOptions'] | undefined;
    /** A callback to handle the response from `fetch`. */
    onFetchRequest?: HttpRpcClientOptions['onRequest'] | undefined;
    /** A callback to handle the response from `fetch`. */
    onFetchResponse?: HttpRpcClientOptions['onResponse'] | undefined;
    /** The key of the HTTP transport. */
    key?: TransportConfig['key'] | undefined;
    /** The name of the HTTP transport. */
    name?: TransportConfig['name'] | undefined;
    /** The max number of times to retry. */
    retryCount?: TransportConfig['retryCount'] | undefined;
    /** The base delay (in ms) between retries. */
    retryDelay?: TransportConfig['retryDelay'] | undefined;
    /** The timeout (in ms) for the HTTP request. Default: 10_000 */
    timeout?: TransportConfig['timeout'] | undefined;
};
export type HttpTransport = Transport<'http', {
    fetchOptions?: HttpTransportConfig['fetchOptions'] | undefined;
    url?: string | undefined;
}>;
export type HttpTransportErrorType = CreateTransportErrorType | UrlRequiredErrorType | ErrorType;
/**
 * @description Creates a HTTP transport that connects to a JSON-RPC API.
 */
export declare function http(
/** URL of the JSON-RPC API. Defaults to the chain's public RPC URL. */
url?: string | undefined, config?: HttpTransportConfig): HttpTransport;
//# sourceMappingURL=http.d.ts.map