"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransport = createTransport;
const buildRequest_js_1 = require("../../utils/buildRequest.js");
const uid_js_1 = require("../../utils/uid.js");
function createTransport({ key, name, request, retryCount = 3, retryDelay = 150, timeout, type, }, value) {
    const uid = (0, uid_js_1.uid)();
    return {
        config: {
            key,
            name,
            request,
            retryCount,
            retryDelay,
            timeout,
            type,
        },
        request: (0, buildRequest_js_1.buildRequest)(request, { retryCount, retryDelay, uid }),
        value,
    };
}
//# sourceMappingURL=createTransport.js.map