import * as Errors from './Errors.js';
import * as Value from './Value.js';
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
export class FeeCapTooHighError extends Errors.BaseError {
    constructor({ feeCap, } = {}) {
        super(`The fee cap (\`maxFeePerGas\`/\`maxPriorityFeePerGas\`${feeCap ? ` = ${Value.formatGwei(feeCap)} gwei` : ''}) cannot be higher than the maximum allowed value (2^256-1).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.FeeCapTooHighError'
        });
    }
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
export class GasPriceTooHighError extends Errors.BaseError {
    constructor({ gasPrice, } = {}) {
        super(`The gas price (\`gasPrice\`${gasPrice ? ` = ${Value.formatGwei(gasPrice)} gwei` : ''}) cannot be higher than the maximum allowed value (2^256-1).`);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.GasPriceTooHighError'
        });
    }
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
export class InvalidChainIdError extends Errors.BaseError {
    constructor({ chainId }) {
        super(typeof chainId !== 'undefined'
            ? `Chain ID "${chainId}" is invalid.`
            : 'Chain ID is invalid.');
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.InvalidChainIdError'
        });
    }
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
export class InvalidSerializedError extends Errors.BaseError {
    constructor({ attributes, serialized, type, }) {
        const missing = Object.entries(attributes)
            .map(([key, value]) => (typeof value === 'undefined' ? key : undefined))
            .filter(Boolean);
        super(`Invalid serialized transaction of type "${type}" was provided.`, {
            metaMessages: [
                `Serialized Transaction: "${serialized}"`,
                missing.length > 0 ? `Missing Attributes: ${missing.join(', ')}` : '',
            ].filter(Boolean),
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.InvalidSerializedError'
        });
    }
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
export class TipAboveFeeCapError extends Errors.BaseError {
    constructor({ maxPriorityFeePerGas, maxFeePerGas, } = {}) {
        super([
            `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas
                ? ` = ${Value.formatGwei(maxPriorityFeePerGas)} gwei`
                : ''}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${Value.formatGwei(maxFeePerGas)} gwei` : ''}).`,
        ].join('\n'));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'TransactionEnvelope.TipAboveFeeCapError'
        });
    }
}
//# sourceMappingURL=TransactionEnvelope.js.map