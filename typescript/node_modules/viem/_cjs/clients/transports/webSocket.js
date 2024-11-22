"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocket = webSocket;
const request_js_1 = require("../../errors/request.js");
const transport_js_1 = require("../../errors/transport.js");
const compat_js_1 = require("../../utils/rpc/compat.js");
const webSocket_js_1 = require("../../utils/rpc/webSocket.js");
const createTransport_js_1 = require("./createTransport.js");
function webSocket(url, config = {}) {
    const { keepAlive, key = 'webSocket', name = 'WebSocket JSON-RPC', reconnect, retryDelay, } = config;
    return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
        const retryCount = config.retryCount ?? retryCount_;
        const timeout = timeout_ ?? config.timeout ?? 10_000;
        const url_ = url || chain?.rpcUrls.default.webSocket?.[0];
        if (!url_)
            throw new transport_js_1.UrlRequiredError();
        return (0, createTransport_js_1.createTransport)({
            key,
            name,
            async request({ method, params }) {
                const body = { method, params };
                const rpcClient = await (0, webSocket_js_1.getWebSocketRpcClient)(url_, {
                    keepAlive,
                    reconnect,
                });
                const { error, result } = await rpcClient.requestAsync({
                    body,
                    timeout,
                });
                if (error)
                    throw new request_js_1.RpcRequestError({
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
                return (0, compat_js_1.getSocket)(url_);
            },
            getRpcClient() {
                return (0, webSocket_js_1.getWebSocketRpcClient)(url_);
            },
            async subscribe({ params, onData, onError }) {
                const rpcClient = await (0, webSocket_js_1.getWebSocketRpcClient)(url_);
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