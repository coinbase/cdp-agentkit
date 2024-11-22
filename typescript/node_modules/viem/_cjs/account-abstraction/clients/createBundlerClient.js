"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBundlerClient = createBundlerClient;
const createClient_js_1 = require("../../clients/createClient.js");
const bundler_js_1 = require("./decorators/bundler.js");
function createBundlerClient(parameters) {
    const { client: client_, key = 'bundler', name = 'Bundler Client', paymaster, paymasterContext, transport, userOperation, } = parameters;
    const client = Object.assign((0, createClient_js_1.createClient)({
        ...parameters,
        chain: parameters.chain ?? client_?.chain,
        key,
        name,
        transport,
        type: 'bundlerClient',
    }), { client: client_, paymaster, paymasterContext, userOperation });
    return client.extend(bundler_js_1.bundlerActions);
}
//# sourceMappingURL=createBundlerClient.js.map