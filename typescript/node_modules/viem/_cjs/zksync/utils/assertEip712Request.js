"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEip712Request = assertEip712Request;
const assertRequest_js_1 = require("../../utils/transaction/assertRequest.js");
const transaction_js_1 = require("../errors/transaction.js");
const isEip712Transaction_js_1 = require("./isEip712Transaction.js");
function assertEip712Request(args) {
    if (!(0, isEip712Transaction_js_1.isEIP712Transaction)(args))
        throw new transaction_js_1.InvalidEip712TransactionError();
    (0, assertRequest_js_1.assertRequest)(args);
}
//# sourceMappingURL=assertEip712Request.js.map