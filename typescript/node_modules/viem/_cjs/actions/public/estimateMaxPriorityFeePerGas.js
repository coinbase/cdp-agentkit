"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateMaxPriorityFeePerGas = estimateMaxPriorityFeePerGas;
exports.internal_estimateMaxPriorityFeePerGas = internal_estimateMaxPriorityFeePerGas;
const fee_js_1 = require("../../errors/fee.js");
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
const getAction_js_1 = require("../../utils/getAction.js");
const getBlock_js_1 = require("./getBlock.js");
const getGasPrice_js_1 = require("./getGasPrice.js");
async function estimateMaxPriorityFeePerGas(client, args) {
    return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
    const { block: block_, chain = client.chain, request } = args || {};
    try {
        const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
        if (typeof maxPriorityFeePerGas === 'function') {
            const block = block_ || (await (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({}));
            const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
                block,
                client,
                request,
            });
            if (maxPriorityFeePerGas_ === null)
                throw new Error();
            return maxPriorityFeePerGas_;
        }
        if (typeof maxPriorityFeePerGas !== 'undefined')
            return maxPriorityFeePerGas;
        const maxPriorityFeePerGasHex = await client.request({
            method: 'eth_maxPriorityFeePerGas',
        });
        return (0, fromHex_js_1.hexToBigInt)(maxPriorityFeePerGasHex);
    }
    catch {
        const [block, gasPrice] = await Promise.all([
            block_
                ? Promise.resolve(block_)
                : (0, getAction_js_1.getAction)(client, getBlock_js_1.getBlock, 'getBlock')({}),
            (0, getAction_js_1.getAction)(client, getGasPrice_js_1.getGasPrice, 'getGasPrice')({}),
        ]);
        if (typeof block.baseFeePerGas !== 'bigint')
            throw new fee_js_1.Eip1559FeesNotSupportedError();
        const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
        if (maxPriorityFeePerGas < 0n)
            return 0n;
        return maxPriorityFeePerGas;
    }
}
//# sourceMappingURL=estimateMaxPriorityFeePerGas.js.map