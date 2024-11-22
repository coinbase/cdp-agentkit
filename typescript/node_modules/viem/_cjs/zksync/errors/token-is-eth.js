"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenIsEthError = void 0;
const base_js_1 = require("../../errors/base.js");
class TokenIsEthError extends base_js_1.BaseError {
    constructor() {
        super(['Token is an ETH token.', '', 'ETH token cannot be retrieved.'].join('\n'), { name: 'TokenIsEthError' });
    }
}
exports.TokenIsEthError = TokenIsEthError;
//# sourceMappingURL=token-is-eth.js.map