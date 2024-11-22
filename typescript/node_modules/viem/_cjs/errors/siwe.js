"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiweInvalidMessageFieldError = void 0;
const base_js_1 = require("./base.js");
class SiweInvalidMessageFieldError extends base_js_1.BaseError {
    constructor(parameters) {
        const { docsPath, field, metaMessages } = parameters;
        super(`Invalid Sign-In with Ethereum message field "${field}".`, {
            docsPath,
            metaMessages,
            name: 'SiweInvalidMessageFieldError',
        });
    }
}
exports.SiweInvalidMessageFieldError = SiweInvalidMessageFieldError;
//# sourceMappingURL=siwe.js.map