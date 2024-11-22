"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicClient = createPublicClient;
const createClient_js_1 = require("./createClient.js");
const public_js_1 = require("./decorators/public.js");
function createPublicClient(parameters) {
    const { key = 'public', name = 'Public Client' } = parameters;
    const client = (0, createClient_js_1.createClient)({
        ...parameters,
        key,
        name,
        type: 'publicClient',
    });
    return client.extend(public_js_1.publicActions);
}
//# sourceMappingURL=createPublicClient.js.map