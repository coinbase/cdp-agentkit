"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlRequiredError = void 0;
const base_js_1 = require("./base.js");
class UrlRequiredError extends base_js_1.BaseError {
    constructor() {
        super('No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.', {
            docsPath: '/docs/clients/intro',
            name: 'UrlRequiredError',
        });
    }
}
exports.UrlRequiredError = UrlRequiredError;
//# sourceMappingURL=transport.js.map