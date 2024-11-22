"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOperation = getUserOperation;
const userOperation_js_1 = require("../../errors/userOperation.js");
const userOperation_js_2 = require("../../utils/formatters/userOperation.js");
async function getUserOperation(client, { hash }) {
    const result = await client.request({
        method: 'eth_getUserOperationByHash',
        params: [hash],
    }, { dedupe: true });
    if (!result)
        throw new userOperation_js_1.UserOperationNotFoundError({ hash });
    const { blockHash, blockNumber, entryPoint, transactionHash, userOperation } = result;
    return {
        blockHash,
        blockNumber: BigInt(blockNumber),
        entryPoint,
        transactionHash,
        userOperation: (0, userOperation_js_2.formatUserOperation)(userOperation),
    };
}
//# sourceMappingURL=getUserOperation.js.map