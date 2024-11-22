"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterTypeNotSupportedError = void 0;
const base_js_1 = require("./base.js");
class FilterTypeNotSupportedError extends base_js_1.BaseError {
    constructor(type) {
        super(`Filter type "${type}" is not supported.`, {
            name: 'FilterTypeNotSupportedError',
        });
    }
}
exports.FilterTypeNotSupportedError = FilterTypeNotSupportedError;
//# sourceMappingURL=log.js.map