"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateTotalGas = estimateTotalGas;
const estimateGas_js_1 = require("../../actions/public/estimateGas.js");
const prepareTransactionRequest_js_1 = require("../../actions/wallet/prepareTransactionRequest.js");
const estimateL1Gas_js_1 = require("./estimateL1Gas.js");
async function estimateTotalGas(client, args) {
    const request = await (0, prepareTransactionRequest_js_1.prepareTransactionRequest)(client, args);
    const [l1Gas, l2Gas] = await Promise.all([
        (0, estimateL1Gas_js_1.estimateL1Gas)(client, request),
        (0, estimateGas_js_1.estimateGas)(client, request),
    ]);
    return l1Gas + l2Gas;
}
//# sourceMappingURL=estimateTotalGas.js.map