"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipc = ipc;
const request_js_1 = require("../../errors/request.js");
const ipc_js_1 = require("../../utils/rpc/ipc.js");
const createTransport_js_1 = require("./createTransport.js");
function ipc(path, config = {}) {
    const { key = 'ipc', name = 'IPC JSON-RPC', reconnect, retryDelay } = config;
    return ({ retryCount: retryCount_, timeout: timeout_ }) => {
        const retryCount = config.retryCount ?? retryCount_;
        const timeout = timeout_ ?? config.timeout ?? 10_000;
        return (0, createTransport_js_1.createTransport)({
            key,
            name,
            async request({ method, params }) {
                const body = { method, params };
                const rpcClient = await (0, ipc_js_1.getIpcRpcClient)(path, { reconnect });
                const { error, result } = await rpcClient.requestAsync({
                    body,
                    timeout,
                });
                if (error)
                    throw new request_js_1.RpcRequestError({
                        body,
                        error,
                        url: path,
                    });
                return result;
            },
            retryCount,
            retryDelay,
            timeout,
            type: 'ipc',
        }, {
            getRpcClient() {
                return (0, ipc_js_1.getIpcRpcClient)(path);
            },
            async subscribe({ params, onData, onError }) {
                const rpcClient = await (0, ipc_js_1.getIpcRpcClient)(path);
                const { result: subscriptionId } = await new Promise((resolve, reject) => rpcClient.request({
                    body: {
                        method: 'eth_subscribe',
                        params,
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
//# sourceMappingURL=ipc.js.map