import { BaseError } from '../errors/base.js';
import { HttpRequestError, } from '../errors/request.js';
import { ChainDisconnectedError, InternalRpcError, InvalidInputRpcError, InvalidParamsRpcError, InvalidRequestRpcError, JsonRpcVersionUnsupportedError, LimitExceededRpcError, MethodNotFoundRpcError, MethodNotSupportedRpcError, ParseRpcError, ProviderDisconnectedError, ResourceNotFoundRpcError, ResourceUnavailableRpcError, SwitchChainError, TransactionRejectedRpcError, UnauthorizedProviderError, UnknownRpcError, UnsupportedProviderMethodError, UserRejectedRequestError, } from '../errors/rpc.js';
import { stringToHex } from './encoding/toHex.js';
import { keccak256 } from './hash/keccak256.js';
import { withDedupe } from './promise/withDedupe.js';
import { withRetry } from './promise/withRetry.js';
import { stringify } from './stringify.js';
export function buildRequest(request, options = {}) {
    return async (args, overrideOptions = {}) => {
        const { dedupe = false, retryDelay = 150, retryCount = 3, uid, } = {
            ...options,
            ...overrideOptions,
        };
        const requestId = dedupe
            ? keccak256(stringToHex(`${uid}.${stringify(args)}`))
            : undefined;
        return withDedupe(() => withRetry(async () => {
            try {
                return await request(args);
            }
            catch (err_) {
                const err = err_;
                switch (err.code) {
                    // -32700
                    case ParseRpcError.code:
                        throw new ParseRpcError(err);
                    // -32600
                    case InvalidRequestRpcError.code:
                        throw new InvalidRequestRpcError(err);
                    // -32601
                    case MethodNotFoundRpcError.code:
                        throw new MethodNotFoundRpcError(err, { method: args.method });
                    // -32602
                    case InvalidParamsRpcError.code:
                        throw new InvalidParamsRpcError(err);
                    // -32603
                    case InternalRpcError.code:
                        throw new InternalRpcError(err);
                    // -32000
                    case InvalidInputRpcError.code:
                        throw new InvalidInputRpcError(err);
                    // -32001
                    case ResourceNotFoundRpcError.code:
                        throw new ResourceNotFoundRpcError(err);
                    // -32002
                    case ResourceUnavailableRpcError.code:
                        throw new ResourceUnavailableRpcError(err);
                    // -32003
                    case TransactionRejectedRpcError.code:
                        throw new TransactionRejectedRpcError(err);
                    // -32004
                    case MethodNotSupportedRpcError.code:
                        throw new MethodNotSupportedRpcError(err, {
                            method: args.method,
                        });
                    // -32005
                    case LimitExceededRpcError.code:
                        throw new LimitExceededRpcError(err);
                    // -32006
                    case JsonRpcVersionUnsupportedError.code:
                        throw new JsonRpcVersionUnsupportedError(err);
                    // 4001
                    case UserRejectedRequestError.code:
                        throw new UserRejectedRequestError(err);
                    // 4100
                    case UnauthorizedProviderError.code:
                        throw new UnauthorizedProviderError(err);
                    // 4200
                    case UnsupportedProviderMethodError.code:
                        throw new UnsupportedProviderMethodError(err);
                    // 4900
                    case ProviderDisconnectedError.code:
                        throw new ProviderDisconnectedError(err);
                    // 4901
                    case ChainDisconnectedError.code:
                        throw new ChainDisconnectedError(err);
                    // 4902
                    case SwitchChainError.code:
                        throw new SwitchChainError(err);
                    // CAIP-25: User Rejected Error
                    // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
                    case 5000:
                        throw new UserRejectedRequestError(err);
                    default:
                        if (err_ instanceof BaseError)
                            throw err_;
                        throw new UnknownRpcError(err);
                }
            }
        }, {
            delay: ({ count, error }) => {
                // If we find a Retry-After header, let's retry after the given time.
                if (error && error instanceof HttpRequestError) {
                    const retryAfter = error?.headers?.get('Retry-After');
                    if (retryAfter?.match(/\d/))
                        return Number.parseInt(retryAfter) * 1000;
                }
                // Otherwise, let's retry with an exponential backoff.
                return ~~(1 << count) * retryDelay;
            },
            retryCount,
            shouldRetry: ({ error }) => shouldRetry(error),
        }), { enabled: dedupe, id: requestId });
    };
}
/** @internal */
export function shouldRetry(error) {
    if ('code' in error && typeof error.code === 'number') {
        if (error.code === -1)
            return true; // Unknown error
        if (error.code === LimitExceededRpcError.code)
            return true;
        if (error.code === InternalRpcError.code)
            return true;
        return false;
    }
    if (error instanceof HttpRequestError && error.status) {
        // Forbidden
        if (error.status === 403)
            return true;
        // Request Timeout
        if (error.status === 408)
            return true;
        // Request Entity Too Large
        if (error.status === 413)
            return true;
        // Too Many Requests
        if (error.status === 429)
            return true;
        // Internal Server Error
        if (error.status === 500)
            return true;
        // Bad Gateway
        if (error.status === 502)
            return true;
        // Service Unavailable
        if (error.status === 503)
            return true;
        // Gateway Timeout
        if (error.status === 504)
            return true;
        return false;
    }
    return true;
}
//# sourceMappingURL=buildRequest.js.map