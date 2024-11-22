"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOperationReceipt = getUserOperationReceipt;
const userOperation_js_1 = require("../../errors/userOperation.js");
const userOperationReceipt_js_1 = require("../../utils/formatters/userOperationReceipt.js");
async function getUserOperationReceipt(client, { hash }) {
    const receipt = await client.request({
        method: 'eth_getUserOperationReceipt',
        params: [hash],
    }, { dedupe: true });
    if (!receipt)
        throw new userOperation_js_1.UserOperationReceiptNotFoundError({ hash });
    return (0, userOperationReceipt_js_1.formatUserOperationReceipt)(receipt);
}
//# sourceMappingURL=getUserOperationReceipt.js.map