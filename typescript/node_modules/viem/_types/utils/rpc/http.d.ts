import { type HttpRequestErrorType as HttpRequestErrorType_, type TimeoutErrorType } from '../../errors/request.js';
import type { ErrorType } from '../../errors/utils.js';
import type { RpcRequest, RpcResponse } from '../../types/rpc.js';
import type { MaybePromise } from '../../types/utils.js';
import { type WithTimeoutErrorType } from '../promise/withTimeout.js';
export type HttpRpcClientOptions = {
    /** Request configuration to pass to `fetch`. */
    fetchOptions?: Omit<RequestInit, 'body'> | undefined;
    /** A callback to handle the request. */
    onRequest?: ((request: Request, init: RequestInit) => MaybePromise<void | undefined | (RequestInit & {
        url?: string | undefined;
    })>) | undefined;
    /** A callback to handle the response. */
    onResponse?: ((response: Response) => Promise<void> | void) | undefined;
    /** The timeout (in ms) for the request. */
    timeout?: number | undefined;
};
export type HttpRequestParameters<body extends RpcRequest | RpcRequest[] = RpcRequest> = {
    /** The RPC request body. */
    body: body;
    /** Request configuration to pass to `fetch`. */
    fetchOptions?: HttpRpcClientOptions['fetchOptions'] | undefined;
    /** A callback to handle the response. */
    onRequest?: ((request: Request, init: RequestInit) => MaybePromise<void | undefined | (RequestInit & {
        url?: string | undefined;
    })>) | undefined;
    /** A callback to handle the response. */
    onResponse?: ((response: Response) => Promise<void> | void) | undefined;
    /** The timeout (in ms) for the request. */
    timeout?: HttpRpcClientOptions['timeout'] | undefined;
};
export type HttpRequestReturnType<body extends RpcRequest | RpcRequest[] = RpcRequest> = body extends RpcRequest[] ? RpcResponse[] : RpcResponse;
export type HttpRequestErrorType = HttpRequestErrorType_ | TimeoutErrorType | WithTimeoutErrorType | ErrorType;
export type HttpRpcClient = {
    request<body extends RpcRequest | RpcRequest[]>(params: HttpRequestParameters<body>): Promise<HttpRequestReturnType<body>>;
};
export declare function getHttpRpcClient(url: string, options?: HttpRpcClientOptions): HttpRpcClient;
//# sourceMappingURL=http.d.ts.map