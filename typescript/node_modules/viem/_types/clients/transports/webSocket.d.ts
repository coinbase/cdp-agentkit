import { type UrlRequiredErrorType } from '../../errors/transport.js';
import type { ErrorType } from '../../errors/utils.js';
import type { Hash } from '../../types/misc.js';
import type { RpcResponse } from '../../types/rpc.js';
import type { SocketRpcClient } from '../../utils/rpc/socket.js';
import { type GetWebSocketRpcClientOptions } from '../../utils/rpc/webSocket.js';
import { type CreateTransportErrorType, type Transport, type TransportConfig } from './createTransport.js';
type WebSocketTransportSubscribeParameters = {
    onData: (data: RpcResponse) => void;
    onError?: ((error: any) => void) | undefined;
};
type WebSocketTransportSubscribeReturnType = {
    subscriptionId: Hash;
    unsubscribe: () => Promise<RpcResponse<boolean>>;
};
type WebSocketTransportSubscribe = {
    subscribe(args: WebSocketTransportSubscribeParameters & {
        /**
         * @description Add information about compiled contracts
         * @link https://hardhat.org/hardhat-network/docs/reference#hardhat_addcompilationresult
         */
        params: ['newHeads'];
    }): Promise<WebSocketTransportSubscribeReturnType>;
};
export type WebSocketTransportConfig = {
    /**
     * Whether or not to send keep-alive ping messages.
     * @default true
     */
    keepAlive?: GetWebSocketRpcClientOptions['keepAlive'] | undefined;
    /** The key of the WebSocket transport. */
    key?: TransportConfig['key'] | undefined;
    /** The name of the WebSocket transport. */
    name?: TransportConfig['name'] | undefined;
    /**
     * Whether or not to attempt to reconnect on socket failure.
     * @default true
     */
    reconnect?: GetWebSocketRpcClientOptions['reconnect'] | undefined;
    /** The max number of times to retry. */
    retryCount?: TransportConfig['retryCount'] | undefined;
    /** The base delay (in ms) between retries. */
    retryDelay?: TransportConfig['retryDelay'] | undefined;
    /** The timeout (in ms) for async WebSocket requests. Default: 10_000 */
    timeout?: TransportConfig['timeout'] | undefined;
};
export type WebSocketTransport = Transport<'webSocket', {
    /**
     * @deprecated use `getRpcClient` instead.
     */
    getSocket(): Promise<WebSocket>;
    getRpcClient(): Promise<SocketRpcClient<WebSocket>>;
    subscribe: WebSocketTransportSubscribe['subscribe'];
}>;
export type WebSocketTransportErrorType = CreateTransportErrorType | UrlRequiredErrorType | ErrorType;
/**
 * @description Creates a WebSocket transport that connects to a JSON-RPC API.
 */
export declare function webSocket(
/** URL of the JSON-RPC API. Defaults to the chain's public RPC URL. */
url?: string, config?: WebSocketTransportConfig): WebSocketTransport;
export {};
//# sourceMappingURL=webSocket.d.ts.map