"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.SocketClosedError = exports.RpcRequestError = exports.WebSocketRequestError = exports.HttpRequestError = void 0;
const stringify_js_1 = require("../utils/stringify.js");
const base_js_1 = require("./base.js");
const utils_js_1 = require("./utils.js");
class HttpRequestError extends base_js_1.BaseError {
    constructor({ body, cause, details, headers, status, url, }) {
        super('HTTP request failed.', {
            cause,
            details,
            metaMessages: [
                status && `Status: ${status}`,
                `URL: ${(0, utils_js_1.getUrl)(url)}`,
                body && `Request body: ${(0, stringify_js_1.stringify)(body)}`,
            ].filter(Boolean),
            name: 'HttpRequestError',
        });
        Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.body = body;
        this.headers = headers;
        this.status = status;
        this.url = url;
    }
}
exports.HttpRequestError = HttpRequestError;
class WebSocketRequestError extends base_js_1.BaseError {
    constructor({ body, cause, details, url, }) {
        super('WebSocket request failed.', {
            cause,
            details,
            metaMessages: [
                `URL: ${(0, utils_js_1.getUrl)(url)}`,
                body && `Request body: ${(0, stringify_js_1.stringify)(body)}`,
            ].filter(Boolean),
            name: 'WebSocketRequestError',
        });
    }
}
exports.WebSocketRequestError = WebSocketRequestError;
class RpcRequestError extends base_js_1.BaseError {
    constructor({ body, error, url, }) {
        super('RPC Request failed.', {
            cause: error,
            details: error.message,
            metaMessages: [`URL: ${(0, utils_js_1.getUrl)(url)}`, `Request body: ${(0, stringify_js_1.stringify)(body)}`],
            name: 'RpcRequestError',
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = error.code;
    }
}
exports.RpcRequestError = RpcRequestError;
class SocketClosedError extends base_js_1.BaseError {
    constructor({ url, } = {}) {
        super('The socket has been closed.', {
            metaMessages: [url && `URL: ${(0, utils_js_1.getUrl)(url)}`].filter(Boolean),
            name: 'SocketClosedError',
        });
    }
}
exports.SocketClosedError = SocketClosedError;
class TimeoutError extends base_js_1.BaseError {
    constructor({ body, url, }) {
        super('The request took too long to respond.', {
            details: 'The request timed out.',
            metaMessages: [`URL: ${(0, utils_js_1.getUrl)(url)}`, `Request body: ${(0, stringify_js_1.stringify)(body)}`],
            name: 'TimeoutError',
        });
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=request.js.map