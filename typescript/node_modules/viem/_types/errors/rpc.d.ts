import type { Prettify } from '../types/utils.js';
import { BaseError } from './base.js';
export type RpcErrorCode = -1 | -32700 | -32600 | -32601 | -32602 | -32603 | -32000 | -32001 | -32002 | -32003 | -32004 | -32005 | -32006 | -32042;
type RpcErrorOptions<code extends number = RpcErrorCode> = {
    code?: code | (number & {}) | undefined;
    docsPath?: string | undefined;
    metaMessages?: string[] | undefined;
    name?: string | undefined;
    shortMessage: string;
};
/**
 * Error subclass implementing JSON RPC 2.0 errors and Ethereum RPC errors per EIP-1474.
 *
 * - EIP https://eips.ethereum.org/EIPS/eip-1474
 */
export type RpcErrorType = RpcError & {
    name: 'RpcError';
};
export declare class RpcError<code_ extends number = RpcErrorCode> extends BaseError {
    code: code_ | (number & {});
    constructor(cause: Error, { code, docsPath, metaMessages, name, shortMessage, }: RpcErrorOptions<code_>);
}
export type ProviderRpcErrorCode = 4001 | 4100 | 4200 | 4900 | 4901 | 4902;
/**
 * Error subclass implementing Ethereum Provider errors per EIP-1193.
 *
 * - EIP https://eips.ethereum.org/EIPS/eip-1193
 */
export type ProviderRpcErrorType = ProviderRpcError & {
    name: 'ProviderRpcError';
};
export declare class ProviderRpcError<T = undefined> extends RpcError<ProviderRpcErrorCode> {
    data?: T | undefined;
    constructor(cause: Error, options: Prettify<RpcErrorOptions<ProviderRpcErrorCode> & {
        data?: T | undefined;
    }>);
}
/**
 * Subclass for a "Parse error" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type ParseRpcErrorType = ParseRpcError & {
    code: -32700;
    name: 'ParseRpcError';
};
export declare class ParseRpcError extends RpcError {
    static code: -32700;
    constructor(cause: Error);
}
/**
 * Subclass for a "Invalid request" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type InvalidRequestRpcErrorType = InvalidRequestRpcError & {
    code: -32600;
    name: 'InvalidRequestRpcError';
};
export declare class InvalidRequestRpcError extends RpcError {
    static code: -32600;
    constructor(cause: Error);
}
/**
 * Subclass for a "Method not found" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type MethodNotFoundRpcErrorType = MethodNotFoundRpcError & {
    code: -32601;
    name: 'MethodNotFoundRpcError';
};
export declare class MethodNotFoundRpcError extends RpcError {
    static code: -32601;
    constructor(cause: Error, { method }?: {
        method?: string;
    });
}
/**
 * Subclass for an "Invalid params" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type InvalidParamsRpcErrorType = InvalidParamsRpcError & {
    code: -32602;
    name: 'InvalidParamsRpcError';
};
export declare class InvalidParamsRpcError extends RpcError {
    static code: -32602;
    constructor(cause: Error);
}
/**
 * Subclass for an "Internal error" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type InternalRpcErrorType = InternalRpcError & {
    code: -32603;
    name: 'InternalRpcError';
};
export declare class InternalRpcError extends RpcError {
    static code: -32603;
    constructor(cause: Error);
}
/**
 * Subclass for an "Invalid input" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type InvalidInputRpcErrorType = InvalidInputRpcError & {
    code: -32000;
    name: 'InvalidInputRpcError';
};
export declare class InvalidInputRpcError extends RpcError {
    static code: -32000;
    constructor(cause: Error);
}
/**
 * Subclass for a "Resource not found" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type ResourceNotFoundRpcErrorType = ResourceNotFoundRpcError & {
    code: -32001;
    name: 'ResourceNotFoundRpcError';
};
export declare class ResourceNotFoundRpcError extends RpcError {
    name: string;
    static code: -32001;
    constructor(cause: Error);
}
/**
 * Subclass for a "Resource unavailable" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type ResourceUnavailableRpcErrorType = ResourceUnavailableRpcError & {
    code: -32002;
    name: 'ResourceUnavailableRpcError';
};
export declare class ResourceUnavailableRpcError extends RpcError {
    static code: -32002;
    constructor(cause: Error);
}
/**
 * Subclass for a "Transaction rejected" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type TransactionRejectedRpcErrorType = TransactionRejectedRpcError & {
    code: -32003;
    name: 'TransactionRejectedRpcError';
};
export declare class TransactionRejectedRpcError extends RpcError {
    static code: -32003;
    constructor(cause: Error);
}
/**
 * Subclass for a "Method not supported" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type MethodNotSupportedRpcErrorType = MethodNotSupportedRpcError & {
    code: -32004;
    name: 'MethodNotSupportedRpcError';
};
export declare class MethodNotSupportedRpcError extends RpcError {
    static code: -32004;
    constructor(cause: Error, { method }?: {
        method?: string;
    });
}
/**
 * Subclass for a "Limit exceeded" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type LimitExceededRpcErrorType = LimitExceededRpcError & {
    code: -32005;
    name: 'LimitExceededRpcError';
};
export declare class LimitExceededRpcError extends RpcError {
    static code: -32005;
    constructor(cause: Error);
}
/**
 * Subclass for a "JSON-RPC version not supported" EIP-1474 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1474#error-codes
 */
export type JsonRpcVersionUnsupportedErrorType = JsonRpcVersionUnsupportedError & {
    code: -32006;
    name: 'JsonRpcVersionUnsupportedError';
};
export declare class JsonRpcVersionUnsupportedError extends RpcError {
    static code: -32006;
    constructor(cause: Error);
}
/**
 * Subclass for a "User Rejected Request" EIP-1193 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 */
export type UserRejectedRequestErrorType = UserRejectedRequestError & {
    code: 4001;
    name: 'UserRejectedRequestError';
};
export declare class UserRejectedRequestError extends ProviderRpcError {
    static code: 4001;
    constructor(cause: Error);
}
/**
 * Subclass for an "Unauthorized" EIP-1193 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 */
export type UnauthorizedProviderErrorType = UnauthorizedProviderError & {
    code: 4100;
    name: 'UnauthorizedProviderError';
};
export declare class UnauthorizedProviderError extends ProviderRpcError {
    static code: 4100;
    constructor(cause: Error);
}
/**
 * Subclass for an "Unsupported Method" EIP-1193 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 */
export type UnsupportedProviderMethodErrorType = UnsupportedProviderMethodError & {
    code: 4200;
    name: 'UnsupportedProviderMethodError';
};
export declare class UnsupportedProviderMethodError extends ProviderRpcError {
    static code: 4200;
    constructor(cause: Error, { method }?: {
        method?: string;
    });
}
/**
 * Subclass for an "Disconnected" EIP-1193 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 */
export type ProviderDisconnectedErrorType = ProviderDisconnectedError & {
    code: 4900;
    name: 'ProviderDisconnectedError';
};
export declare class ProviderDisconnectedError extends ProviderRpcError {
    static code: 4900;
    constructor(cause: Error);
}
/**
 * Subclass for an "Chain Disconnected" EIP-1193 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 */
export type ChainDisconnectedErrorType = ChainDisconnectedError & {
    code: 4901;
    name: 'ChainDisconnectedError';
};
export declare class ChainDisconnectedError extends ProviderRpcError {
    static code: 4901;
    constructor(cause: Error);
}
/**
 * Subclass for an "Switch Chain" EIP-1193 error.
 *
 * EIP https://eips.ethereum.org/EIPS/eip-1193#provider-errors
 */
export type SwitchChainErrorType = SwitchChainError & {
    code: 4902;
    name: 'SwitchChainError';
};
export declare class SwitchChainError extends ProviderRpcError {
    static code: 4902;
    constructor(cause: Error);
}
/**
 * Subclass for an unknown RPC error.
 */
export type UnknownRpcErrorType = UnknownRpcError & {
    name: 'UnknownRpcError';
};
export declare class UnknownRpcError extends RpcError {
    constructor(cause: Error);
}
export {};
//# sourceMappingURL=rpc.d.ts.map