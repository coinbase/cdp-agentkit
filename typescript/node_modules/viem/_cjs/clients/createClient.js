"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = createClient;
exports.rpcSchema = rpcSchema;
const parseAccount_js_1 = require("../accounts/utils/parseAccount.js");
const uid_js_1 = require("../utils/uid.js");
function createClient(parameters) {
    const { batch, cacheTime = parameters.pollingInterval ?? 4_000, ccipRead, key = 'base', name = 'Base Client', pollingInterval = 4_000, type = 'base', } = parameters;
    const chain = parameters.chain;
    const account = parameters.account
        ? (0, parseAccount_js_1.parseAccount)(parameters.account)
        : undefined;
    const { config, request, value } = parameters.transport({
        chain,
        pollingInterval,
    });
    const transport = { ...config, ...value };
    const client = {
        account,
        batch,
        cacheTime,
        ccipRead,
        chain,
        key,
        name,
        pollingInterval,
        request,
        transport,
        type,
        uid: (0, uid_js_1.uid)(),
    };
    function extend(base) {
        return (extendFn) => {
            const extended = extendFn(base);
            for (const key in client)
                delete extended[key];
            const combined = { ...base, ...extended };
            return Object.assign(combined, { extend: extend(combined) });
        };
    }
    return Object.assign(client, { extend: extend(client) });
}
function rpcSchema() {
    return null;
}
//# sourceMappingURL=createClient.js.map