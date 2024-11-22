import type * as Address from './Address.js';
import * as Errors from './Errors.js';
import type * as Hex from './Hex.js';
import type { Compute } from './internal/types.js';
/** Base type for a Transaction Envelope. Transaction Envelopes inherit this type. */
export type Base<type extends string = string, signed extends boolean = boolean, bigintType = bigint, numberType = number> = Compute<{
    /** EIP-155 Chain ID. */
    chainId: numberType;
    /** Contract code or a hashed method call with encoded args */
    data?: Hex.Hex | undefined;
    /** @alias `data` – added for TransactionEnvelope - Transaction compatibility. */
    input?: Hex.Hex | undefined;
    /** Sender of the transaction. */
    from?: Address.Address | undefined;
    /** Gas provided for transaction execution */
    gas?: bigintType | undefined;
    /** Unique number identifying this transaction */
    nonce?: bigintType | undefined;
    /** Transaction recipient */
    to?: Address.Address | null | undefined;
    /** Transaction type */
    type: type;
    /** Value in wei sent with this transaction */
    value?: bigintType | undefined;
    /** ECDSA signature r. */
    r?: bigintType | undefined;
    /** ECDSA signature s. */
    s?: bigintType | undefined;
    /** ECDSA signature yParity. */
    yParity?: numberType | undefined;
    /** @deprecated ECDSA signature v (for backwards compatibility). */
    v?: numberType | undefined;
} & (signed extends true ? {
    r: bigintType;
    s: bigintType;
} : {})>;
/** RPC representation of a {@link ox#(TransactionEnvelope:namespace).Base}. */
export type BaseRpc<type extends string = string, signed extends boolean = boolean> = Base<type, signed, Hex.Hex, Hex.Hex>;
/** Signed representation of a {@link ox#(TransactionEnvelope:namespace).Base}. */
export type BaseSigned<type extends string = string> = Base<type, true>;
/**
 * Thrown when a fee cap is too high.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip1559 } from 'ox'
 *
 * TransactionEnvelopeEip1559.assert({
 *   maxFeePerGas: 2n ** 256n - 1n + 1n,
 *   chainId: 1,
 * })
 * // @error: TransactionEnvelope.FeeCapTooHighError: The fee cap (`maxFeePerGas`/`maxPriorityFeePerGas` = 115792089237316195423570985008687907853269984665640564039457584007913.129639936 gwei) cannot be higher than the maximum allowed value (2^256-1).
 * ```
 */
export declare class FeeCapTooHighError extends Errors.BaseError {
    readonly name = "TransactionEnvelope.FeeCapTooHighError";
    constructor({ feeCap, }?: {
        feeCap?: bigint | undefined;
    });
}
/**
 * Thrown when a gas price is too high.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeLegacy } from 'ox'
 *
 * TransactionEnvelopeLegacy.assert({
 *   gasPrice: 2n ** 256n - 1n + 1n,
 *   chainId: 1,
 * })
 * // @error: TransactionEnvelope.GasPriceTooHighError: The gas price (`gasPrice` = 115792089237316195423570985008687907853269984665640564039457584007913.129639936 gwei) cannot be higher than the maximum allowed value (2^256-1).
 * ```
 */
export declare class GasPriceTooHighError extends Errors.BaseError {
    readonly name = "TransactionEnvelope.GasPriceTooHighError";
    constructor({ gasPrice, }?: {
        gasPrice?: bigint | undefined;
    });
}
/**
 * Thrown when a chain ID is invalid.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip1559 } from 'ox'
 *
 * TransactionEnvelopeEip1559.assert({ chainId: 0 })
 * // @error: TransactionEnvelope.InvalidChainIdError: Chain ID "0" is invalid.
 * ```
 */
export declare class InvalidChainIdError extends Errors.BaseError {
    readonly name = "TransactionEnvelope.InvalidChainIdError";
    constructor({ chainId }: {
        chainId?: number | undefined;
    });
}
/**
 * Thrown when a serialized transaction is invalid.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip1559 } from 'ox'
 *
 * TransactionEnvelopeEip1559.deserialize('0x02c0')
 * // @error: TransactionEnvelope.InvalidSerializedError: Invalid serialized transaction of type "eip1559" was provided.
 * // @error: Serialized Transaction: "0x02c0"
 * // @error: Missing Attributes: chainId, nonce, maxPriorityFeePerGas, maxFeePerGas, gas, to, value, data, accessList
 * ```
 */
export declare class InvalidSerializedError extends Errors.BaseError {
    readonly name = "TransactionEnvelope.InvalidSerializedError";
    constructor({ attributes, serialized, type, }: {
        attributes: Record<string, unknown>;
        serialized: Hex.Hex;
        type: string;
    });
}
/**
 * Thrown when a tip is higher than a fee cap.
 *
 * @example
 * ```ts twoslash
 * import { TransactionEnvelopeEip1559 } from 'ox'
 *
 * TransactionEnvelopeEip1559.assert({
 *   chainId: 1,
 *   maxFeePerGas: 10n,
 *   maxPriorityFeePerGas: 11n,
 * })
 * // @error: TransactionEnvelope.TipAboveFeeCapError: The provided tip (`maxPriorityFeePerGas` = 11 gwei) cannot be higher than the fee cap (`maxFeePerGas` = 10 gwei).
 * ```
 */
export declare class TipAboveFeeCapError extends Errors.BaseError {
    readonly name = "TransactionEnvelope.TipAboveFeeCapError";
    constructor({ maxPriorityFeePerGas, maxFeePerGas, }?: {
        maxPriorityFeePerGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
    });
}
//# sourceMappingURL=TransactionEnvelope.d.ts.map