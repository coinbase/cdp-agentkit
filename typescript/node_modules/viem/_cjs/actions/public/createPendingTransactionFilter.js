"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPendingTransactionFilter = createPendingTransactionFilter;
const createFilterRequestScope_js_1 = require("../../utils/filters/createFilterRequestScope.js");
async function createPendingTransactionFilter(client) {
    const getRequest = (0, createFilterRequestScope_js_1.createFilterRequestScope)(client, {
        method: 'eth_newPendingTransactionFilter',
    });
    const id = await client.request({
        method: 'eth_newPendingTransactionFilter',
    });
    return { id, request: getRequest(id), type: 'transaction' };
}
//# sourceMappingURL=createPendingTransactionFilter.js.map