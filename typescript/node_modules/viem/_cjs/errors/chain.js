"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidChainIdError = exports.ClientChainNotConfiguredError = exports.ChainNotFoundError = exports.ChainMismatchError = exports.ChainDoesNotSupportContract = void 0;
const base_js_1 = require("./base.js");
class ChainDoesNotSupportContract extends base_js_1.BaseError {
    constructor({ blockNumber, chain, contract, }) {
        super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
            metaMessages: [
                'This could be due to any of the following:',
                ...(blockNumber &&
                    contract.blockCreated &&
                    contract.blockCreated > blockNumber
                    ? [
                        `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`,
                    ]
                    : [
                        `- The chain does not have the contract "${contract.name}" configured.`,
                    ]),
            ],
            name: 'ChainDoesNotSupportContract',
        });
    }
}
exports.ChainDoesNotSupportContract = ChainDoesNotSupportContract;
class ChainMismatchError extends base_js_1.BaseError {
    constructor({ chain, currentChainId, }) {
        super(`The current chain of the wallet (id: ${currentChainId}) does not match the target chain for the transaction (id: ${chain.id} – ${chain.name}).`, {
            metaMessages: [
                `Current Chain ID:  ${currentChainId}`,
                `Expected Chain ID: ${chain.id} – ${chain.name}`,
            ],
            name: 'ChainMismatchError',
        });
    }
}
exports.ChainMismatchError = ChainMismatchError;
class ChainNotFoundError extends base_js_1.BaseError {
    constructor() {
        super([
            'No chain was provided to the request.',
            'Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient.',
        ].join('\n'), {
            name: 'ChainNotFoundError',
        });
    }
}
exports.ChainNotFoundError = ChainNotFoundError;
class ClientChainNotConfiguredError extends base_js_1.BaseError {
    constructor() {
        super('No chain was provided to the Client.', {
            name: 'ClientChainNotConfiguredError',
        });
    }
}
exports.ClientChainNotConfiguredError = ClientChainNotConfiguredError;
class InvalidChainIdError extends base_js_1.BaseError {
    constructor({ chainId }) {
        super(typeof chainId === 'number'
            ? `Chain ID "${chainId}" is invalid.`
            : 'Chain ID is invalid.', { name: 'InvalidChainIdError' });
    }
}
exports.InvalidChainIdError = InvalidChainIdError;
//# sourceMappingURL=chain.js.map