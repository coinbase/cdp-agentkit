import type { TimeoutErrorType, WebSocketRequestError } from '../../errors/request.js';
import type { ErrorType } from '../../errors/utils.js';
import type { RpcResponse } from '../../types/rpc.js';
import type { WithTimeoutErrorType } from '../promise/withTimeout.js';
import { type HttpRequestParameters } from './http.js';
import type { SocketRpcClient } from './socket.js';
export type WebSocketOptions = Parameters<SocketRpcClient<WebSocket>['request']>[0];
export type WebSocketReturnType = SocketRpcClient<WebSocket>;
export type WebSocketErrorType = WebSocketRequestError | ErrorType;
declare function webSocket(socketClient: SocketRpcClient<WebSocket>, { body, onError, onResponse }: WebSocketOptions): WebSocketReturnType;
export type WebSocketAsyncOptions = Parameters<SocketRpcClient<WebSocket>['requestAsync']>[0];
export type WebSocketAsyncReturnType = RpcResponse;
export type WebSocketAsyncErrorType = WebSocketErrorType | TimeoutErrorType | WithTimeoutErrorType | ErrorType;
declare function webSocketAsync(socketClient: SocketRpcClient<WebSocket>, { body, timeout }: WebSocketAsyncOptions): Promise<WebSocketAsyncReturnType>;
/**
 * @deprecated use `getSocketClient` instead.
 *
 * ```diff
 * -import { getSocket } from 'viem/utils'
 * +import { getSocketClient } from 'viem/utils'
 *
 * -const socket = await getSocket(url)
 * +const socketClient = await getSocketClient(url)
 * +const socket = socketClient.socket
 * ```
 */
export declare function getSocket(url: string): Promise<WebSocket & {
    close(): void;
    ping?: (() => void) | undefined;
    request(params: {
        body: import("../../types/rpc.js").RpcRequest;
    }): void;
} & {
    requests: Map<string | number, {
        onResponse: (message: any) => void;
        onError?: ((error?: Error | Event | undefined) => void) | undefined;
    }>;
    subscriptions: Map<string | number, {
        onResponse: (message: any) => void;
        onError?: ((error?: Error | Event | undefined) => void) | undefined;
    }>;
}>;
export declare const rpc: {
    /**
     * @deprecated use `getHttpRpcClient` instead.
     *
     * ```diff
     * -import { rpc } from 'viem/utils'
     * +import { getHttpRpcClient } from 'viem/utils'
     *
     * -rpc.http(url, params)
     * +const httpClient = getHttpRpcClient(url)
     * +httpClient.request(params)
     * ```
     */
    http(url: string, params: HttpRequestParameters): Promise<RpcResponse>;
    /**
     * @deprecated use `getWebSocketRpcClient` instead.
     *
     * ```diff
     * -import { rpc } from 'viem/utils'
     * +import { getWebSocketRpcClient } from 'viem/utils'
     *
     * -rpc.webSocket(url, params)
     * +const webSocketClient = getWebSocketRpcClient(url)
     * +webSocketClient.request(params)
     * ```
     */
    webSocket: typeof webSocket;
    /**
     * @deprecated use `getWebSocketRpcClient` instead.
     *
     * ```diff
     * -import { rpc } from 'viem/utils'
     * +import { getWebSocketRpcClient } from 'viem/utils'
     *
     * -const response = await rpc.webSocketAsync(url, params)
     * +const webSocketClient = getWebSocketRpcClient(url)
     * +const response = await webSocketClient.requestAsync(params)
     * ```
     */
    webSocketAsync: typeof webSocketAsync;
};
export {};
//# sourceMappingURL=compat.d.ts.map