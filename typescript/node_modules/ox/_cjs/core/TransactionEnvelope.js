"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipAboveFeeCapError = exports.InvalidSerializedError = exports.InvalidChainIdError = exports.GasPriceTooHighError = exports.FeeCapTooHighError = void 0;
const Errors = require("./Errors.js");
const Value = require("./Value.js");
class FeeCapTooHighError extends Errors.BaseError {
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
exports.FeeCapTooHighError = FeeCapTooHighError;
class GasPriceTooHighError extends Errors.BaseError {
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
exports.GasPriceTooHighError = GasPriceTooHighError;
class InvalidChainIdError extends Errors.BaseError {
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
exports.InvalidChainIdError = InvalidChainIdError;
class InvalidSerializedError extends Errors.BaseError {
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
exports.InvalidSerializedError = InvalidSerializedError;
class TipAboveFeeCapError extends Errors.BaseError {
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
exports.TipAboveFeeCapError = TipAboveFeeCapError;
//# sourceMappingURL=TransactionEnvelope.js.map