import { RpcRequestError } from '../../errors/request.js';
import { UrlRequiredError, } from '../../errors/transport.js';
import { getSocket } from '../../utils/rpc/compat.js';
import { getWebSocketRpcClient, } from '../../utils/rpc/webSocket.js';
import { createTransport, } from './createTransport.js';
/**
 * @description Creates a WebSocket transport that connects to a JSON-RPC API.
 */
export function webSocket(
/** URL of the JSON-RPC API. Defaults to the chain's public RPC URL. */
url, config = {}) {
    const { keepAlive, key = 'webSocket', name = 'WebSocket JSON-RPC', reconnect, retryDelay, } = config;
    return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
        const retryCount = config.retryCount ?? retryCount_;
        const timeout = timeout_ ?? config.timeout ?? 10_000;
        const url_ = url || chain?.rpcUrls.default.webSocket?.[0];
        if (!url_)
            throw new UrlRequiredError();
        return createTransport({
            key,
            name,
            async request({ method, params }) {
                const body = { method, params };
                const rpcClient = await getWebSocketRpcClient(url_, {
                    keepAlive,
                    reconnect,
                });
                const { error, result } = await rpcClient.requestAsync({
                    body,
                    timeout,
                });
                if (error)
                    throw new RpcRequestError({
                        body,
                        error,
                        url: url_,
                    });
                return result;
            },
            retryCount,
            retryDelay,
            timeout,
            type: 'webSocket',
        }, {
            getSocket() {
                return getSocket(url_);
            },
            getRpcClient() {
                return getWebSocketRpcClient(url_);
            },
            async subscribe({ params, onData, onError }) {
                const rpcClient = await getWebSocketRpcClient(url_);
                const { result: subscriptionId } = await new Promise((resolve, reject) => rpcClient.request({
                    body: {
                        method: 'eth_subscribe',
                        params,
                    },
                    onError(error) {
                        reject(error);
                        onError?.(error);
                        return;
                    },
                    onResponse(response) {
                        if (response.error) {
                            reject(response.error);
                            onError?.(response.error);
                            return;
                        }
                        if (typeof response.id === 'number') {
                            resolve(response);
                            return;
                        }
                        if (response.method !== 'eth_subscription')
                            return;
                        onData(response.params);
                    },
                }));
                return {
                    subscriptionId,
                    async unsubscribe() {
                        return new Promise((resolve) => rpcClient.request({
                            body: {
                                method: 'eth_unsubscribe',
                                params: [subscriptionId],
                            },
                            onResponse: resolve,
                        }));
                    },
                };
            },
        });
    };
}
//# sourceMappingURL=webSocket.js.map