"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawBlockTransactions = getRawBlockTransactions;
const camelCaseKeys_js_1 = require("../utils/camelCaseKeys.js");
async function getRawBlockTransactions(client, parameters) {
    const result = await client.request({
        method: 'zks_getRawBlockTransactions',
        params: [parameters.number],
    });
    return (0, camelCaseKeys_js_1.camelCaseKeys)(result);
}
//# sourceMappingURL=getRawBlockTransactions.js.map