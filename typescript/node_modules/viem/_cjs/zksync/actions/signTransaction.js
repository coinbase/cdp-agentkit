"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = signTransaction;
const signTransaction_js_1 = require("../../actions/wallet/signTransaction.js");
const isEip712Transaction_js_1 = require("../utils/isEip712Transaction.js");
const signEip712Transaction_js_1 = require("./signEip712Transaction.js");
async function signTransaction(client, args) {
    if ((0, isEip712Transaction_js_1.isEIP712Transaction)(args))
        return (0, signEip712Transaction_js_1.signEip712Transaction)(client, args);
    return await (0, signTransaction_js_1.signTransaction)(client, args);
}
//# sourceMappingURL=signTransaction.js.map