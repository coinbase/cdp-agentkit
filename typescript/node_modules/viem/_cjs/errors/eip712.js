"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eip712DomainNotFoundError = void 0;
const base_js_1 = require("./base.js");
class Eip712DomainNotFoundError extends base_js_1.BaseError {
    constructor({ address }) {
        super(`No EIP-712 domain found on contract "${address}".`, {
            metaMessages: [
                'Ensure that:',
                `- The contract is deployed at the address "${address}".`,
                '- `eip712Domain()` function exists on the contract.',
                '- `eip712Domain()` function matches signature to ERC-5267 specification.',
            ],
            name: 'Eip712DomainNotFoundError',
        });
    }
}
exports.Eip712DomainNotFoundError = Eip712DomainNotFoundError;
//# sourceMappingURL=eip712.js.map