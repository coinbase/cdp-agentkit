import { stringify } from '../utils/stringify.js';
import { BaseError } from './base.js';
import { getUrl } from './utils.js';
export class HttpRequestError extends BaseError {
    constructor({ body, cause, details, headers, status, url, }) {
        super('HTTP request failed.', {
            cause,
            details,
            metaMessages: [
                status && `Status: ${status}`,
                `URL: ${getUrl(url)}`,
                body && `Request body: ${stringify(body)}`,
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
export class WebSocketRequestError extends BaseError {
    constructor({ body, cause, details, url, }) {
        super('WebSocket request failed.', {
            cause,
            details,
            metaMessages: [
                `URL: ${getUrl(url)}`,
                body && `Request body: ${stringify(body)}`,
            ].filter(Boolean),
            name: 'WebSocketRequestError',
        });
    }
}
export class RpcRequestError extends BaseError {
    constructor({ body, error, url, }) {
        super('RPC Request failed.', {
            cause: error,
            details: error.message,
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
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
export class SocketClosedError extends BaseError {
    constructor({ url, } = {}) {
        super('The socket has been closed.', {
            metaMessages: [url && `URL: ${getUrl(url)}`].filter(Boolean),
            name: 'SocketClosedError',
        });
    }
}
export class TimeoutError extends BaseError {
    constructor({ body, url, }) {
        super('The request took too long to respond.', {
            details: 'The request timed out.',
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: 'TimeoutError',
        });
    }
}
//# sourceMappingURL=request.js.map