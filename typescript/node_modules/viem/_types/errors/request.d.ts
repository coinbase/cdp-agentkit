import { BaseError } from './base.js';
export type HttpRequestErrorType = HttpRequestError & {
    name: 'HttpRequestError';
};
export declare class HttpRequestError extends BaseError {
    body?: {
        [x: string]: unknown;
    } | {
        [y: string]: unknown;
    }[] | undefined;
    headers?: Headers | undefined;
    status?: number | undefined;
    url: string;
    constructor({ body, cause, details, headers, status, url, }: {
        body?: {
            [x: string]: unknown;
        } | {
            [y: string]: unknown;
        }[] | undefined;
        cause?: Error | undefined;
        details?: string | undefined;
        headers?: Headers | undefined;
        status?: number | undefined;
        url: string;
    });
}
export type WebSocketRequestErrorType = WebSocketRequestError & {
    name: 'WebSocketRequestError';
};
export declare class WebSocketRequestError extends BaseError {
    constructor({ body, cause, details, url, }: {
        body?: {
            [key: string]: unknown;
        } | undefined;
        cause?: Error | undefined;
        details?: string | undefined;
        url: string;
    });
}
export type RpcRequestErrorType = RpcRequestError & {
    name: 'RpcRequestError';
};
export declare class RpcRequestError extends BaseError {
    code: number;
    constructor({ body, error, url, }: {
        body: {
            [x: string]: unknown;
        } | {
            [y: string]: unknown;
        }[];
        error: {
            code: number;
            message: string;
        };
        url: string;
    });
}
export type SocketClosedErrorType = SocketClosedError & {
    name: 'SocketClosedError';
};
export declare class SocketClosedError extends BaseError {
    constructor({ url, }?: {
        url?: string | undefined;
    });
}
export type TimeoutErrorType = TimeoutError & {
    name: 'TimeoutError';
};
export declare class TimeoutError extends BaseError {
    constructor({ body, url, }: {
        body: {
            [x: string]: unknown;
        } | {
            [y: string]: unknown;
        }[];
        url: string;
    });
}
//# sourceMappingURL=request.d.ts.map