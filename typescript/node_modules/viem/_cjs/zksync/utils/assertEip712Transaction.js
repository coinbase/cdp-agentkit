"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertEip712Transaction = assertEip712Transaction;
const address_js_1 = require("../../errors/address.js");
const base_js_1 = require("../../errors/base.js");
const chain_js_1 = require("../../errors/chain.js");
const isAddress_js_1 = require("../../utils/address/isAddress.js");
const transaction_js_1 = require("../errors/transaction.js");
const isEip712Transaction_js_1 = require("./isEip712Transaction.js");
function assertEip712Transaction(transaction) {
    const { chainId, to, from, paymaster, paymasterInput } = transaction;
    if (!(0, isEip712Transaction_js_1.isEIP712Transaction)(transaction))
        throw new transaction_js_1.InvalidEip712TransactionError();
    if (!chainId || chainId <= 0)
        throw new chain_js_1.InvalidChainIdError({ chainId });
    if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
    if (from && !(0, isAddress_js_1.isAddress)(from))
        throw new address_js_1.InvalidAddressError({ address: from });
    if (paymaster && !(0, isAddress_js_1.isAddress)(paymaster))
        throw new address_js_1.InvalidAddressError({ address: paymaster });
    if (paymaster && !paymasterInput) {
        throw new base_js_1.BaseError('`paymasterInput` must be provided when `paymaster` is defined');
    }
    if (!paymaster && paymasterInput) {
        throw new base_js_1.BaseError('`paymaster` must be provided when `paymasterInput` is defined');
    }
}
//# sourceMappingURL=assertEip712Transaction.js.map