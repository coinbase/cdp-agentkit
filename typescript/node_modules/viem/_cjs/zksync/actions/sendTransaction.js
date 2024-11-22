"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = sendTransaction;
const sendTransaction_js_1 = require("../../actions/wallet/sendTransaction.js");
const isEip712Transaction_js_1 = require("../utils/isEip712Transaction.js");
const sendEip712Transaction_js_1 = require("./sendEip712Transaction.js");
async function sendTransaction(client, parameters) {
    if ((0, isEip712Transaction_js_1.isEIP712Transaction)(parameters))
        return (0, sendEip712Transaction_js_1.sendEip712Transaction)(client, parameters);
    return (0, sendTransaction_js_1.sendTransaction)(client, parameters);
}
//# sourceMappingURL=sendTransaction.js.map