"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rpc = void 0;
exports.getSocket = getSocket;
const http_js_1 = require("./http.js");
const webSocket_js_1 = require("./webSocket.js");
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
async function getSocket(url) {
    const client = await (0, webSocket_js_1.getWebSocketRpcClient)(url);
    return Object.assign(client.socket, {
        requests: client.requests,
        subscriptions: client.subscriptions,
    });
}
exports.rpc = {
    http(url, params) {
        return (0, http_js_1.getHttpRpcClient)(url).request(params);
    },
    webSocket,
    webSocketAsync,
};
//# sourceMappingURL=compat.js.map