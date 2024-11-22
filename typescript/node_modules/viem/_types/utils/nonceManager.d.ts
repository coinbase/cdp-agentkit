import type { Address } from 'abitype';
import type { Client } from '../clients/createClient.js';
import type { MaybePromise } from '../types/utils.js';
export type CreateNonceManagerParameters = {
    source: NonceManagerSource;
};
type FunctionParameters = {
    address: Address;
    chainId: number;
};
export type NonceManager = {
    /** Get and increment a nonce. */
    consume: (parameters: FunctionParameters & {
        client: Client;
    }) => Promise<number>;
    /** Increment a nonce. */
    increment: (chainId: FunctionParameters) => void;
    /** Get a nonce. */
    get: (chainId: FunctionParameters & {
        client: Client;
    }) => Promise<number>;
    /** Reset a nonce. */
    reset: (chainId: FunctionParameters) => void;
};
/**
 * Creates a nonce manager for auto-incrementing transaction nonces.
 *
 * - Docs: https://viem.sh/docs/accounts/createNonceManager
 *
 * @example
 * ```ts
 * const nonceManager = createNonceManager({
 *   source: jsonRpc(),
 * })
 * ```
 */
export declare function createNonceManager(parameters: CreateNonceManagerParameters): NonceManager;
export type NonceManagerSource = {
    /** Get a nonce. */
    get(parameters: FunctionParameters & {
        client: Client;
    }): MaybePromise<number>;
    /** Set a nonce. */
    set(parameters: FunctionParameters, nonce: number): MaybePromise<void>;
};
/** JSON-RPC source for a nonce manager. */
export declare function jsonRpc(): NonceManagerSource;
/** Default Nonce Manager with a JSON-RPC source. */
export declare const nonceManager: NonceManager;
export {};
//# sourceMappingURL=nonceManager.d.ts.map