"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDecimalNumberError = void 0;
const base_js_1 = require("./base.js");
class InvalidDecimalNumberError extends base_js_1.BaseError {
    constructor({ value }) {
        super(`Number \`${value}\` is not a valid decimal number.`, {
            name: 'InvalidDecimalNumberError',
        });
    }
}
exports.InvalidDecimalNumberError = InvalidDecimalNumberError;
//# sourceMappingURL=unit.js.map