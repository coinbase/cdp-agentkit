"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatters = void 0;
const fromHex_js_1 = require("../utils/encoding/fromHex.js");
const block_js_1 = require("../utils/formatters/block.js");
const transaction_js_1 = require("../utils/formatters/transaction.js");
const transactionReceipt_js_1 = require("../utils/formatters/transactionReceipt.js");
exports.formatters = {
    block: (0, block_js_1.defineBlock)({
        format(args) {
            const transactions = args.transactions?.map((transaction) => {
                if (typeof transaction === 'string')
                    return transaction;
                const formatted = (0, transaction_js_1.formatTransaction)(transaction);
                if (formatted.typeHex === '0x7e') {
                    formatted.isSystemTx = transaction.isSystemTx;
                    formatted.mint = transaction.mint
                        ? (0, fromHex_js_1.hexToBigInt)(transaction.mint)
                        : undefined;
                    formatted.sourceHash = transaction.sourceHash;
                    formatted.type = 'deposit';
                }
                return formatted;
            });
            return {
                transactions,
                stateRoot: args.stateRoot,
            };
        },
    }),
    transaction: (0, transaction_js_1.defineTransaction)({
        format(args) {
            const transaction = {};
            if (args.type === '0x7e') {
                transaction.isSystemTx = args.isSystemTx;
                transaction.mint = args.mint ? (0, fromHex_js_1.hexToBigInt)(args.mint) : undefined;
                transaction.sourceHash = args.sourceHash;
                transaction.type = 'deposit';
            }
            return transaction;
        },
    }),
    transactionReceipt: (0, transactionReceipt_js_1.defineTransactionReceipt)({
        format(args) {
            return {
                l1GasPrice: args.l1GasPrice ? (0, fromHex_js_1.hexToBigInt)(args.l1GasPrice) : null,
                l1GasUsed: args.l1GasUsed ? (0, fromHex_js_1.hexToBigInt)(args.l1GasUsed) : null,
                l1Fee: args.l1Fee ? (0, fromHex_js_1.hexToBigInt)(args.l1Fee) : null,
                l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null,
            };
        },
    }),
};
//# sourceMappingURL=formatters.js.map