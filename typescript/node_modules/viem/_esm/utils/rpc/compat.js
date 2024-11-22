// TODO(v3): This file is here for backwards compatibility, and to prevent breaking changes.
// These APIs will be removed in v3.
import { getHttpRpcClient } from './http.js';
import { getWebSocketRpcClient } from './webSocket.js';
function webSocket(socketClient, { body, onError, onResponse }) {
    socketClient.request({
        body,
        onError,
        onResponse,
    });
    return socketClient;
}
async function webSocketAsync(socketClient, { body, timeout = 10_000 }) {
    return socketClient.requestAsync({
        body,
        timeout,
    });
}
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
export async function getSocket(url) {
    const client = await getWebSocketRpcClient(url);
    return Object.assign(client.socket, {
        requests: client.requests,
        subscriptions: client.subscriptions,
    });
}
export const rpc = {
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
    http(url, params) {
        return getHttpRpcClient(url).request(params);
    },
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
    webSocket,
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
    webSocketAsync,
};
/* c8 ignore end */
//# sourceMappingURL=compat.js.map