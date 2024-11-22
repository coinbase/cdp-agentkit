"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = custom;
const createTransport_js_1 = require("./createTransport.js");
function custom(provider, config = {}) {
    const { key = 'custom', name = 'Custom Provider', retryDelay } = config;
    return ({ retryCount: defaultRetryCount }) => (0, createTransport_js_1.createTransport)({
        key,
        name,
        request: provider.request.bind(provider),
        retryCount: config.retryCount ?? defaultRetryCount,
        retryDelay,
        type: 'custom',
    });
}
//# sourceMappingURL=custom.js.map