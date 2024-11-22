"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAddressError = void 0;
const base_js_1 = require("./base.js");
class InvalidAddressError extends base_js_1.BaseError {
    constructor({ address }) {
        super(`Address "${address}" is invalid.`, {
            metaMessages: [
                '- Address must be a hex value of 20 bytes (40 hex characters).',
                '- Address must match its checksum counterpart.',
            ],
            name: 'InvalidAddressError',
        });
    }
}
exports.InvalidAddressError = InvalidAddressError;
//# sourceMappingURL=address.js.map