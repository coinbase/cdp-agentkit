"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatters = void 0;
const fromHex_js_1 = require("../utils/encoding/fromHex.js");
const block_js_1 = require("../utils/formatters/block.js");
const transaction_js_1 = require("../utils/formatters/transaction.js");
const transactionRequest_js_1 = require("../utils/formatters/transactionRequest.js");
const utils_js_1 = require("./utils.js");
exports.formatters = {
    block: (0, block_js_1.defineBlock)({
        format(args) {
            const transactions = args.transactions?.map((transaction) => {
                if (typeof transaction === 'string')
                    return transaction;
                const formatted = (0, transaction_js_1.formatTransaction)(transaction);
                return {
                    ...formatted,
                    ...(transaction.gatewayFee
                        ? {
                            gatewayFee: (0, fromHex_js_1.hexToBigInt)(transaction.gatewayFee),
                            gatewayFeeRecipient: transaction.gatewayFeeRecipient,
                        }
                        : {}),
                    feeCurrency: transaction.feeCurrency,
                };
            });
            return {
                transactions,
                ...(args.randomness ? { randomness: args.randomness } : {}),
            };
        },
    }),
    transaction: (0, transaction_js_1.defineTransaction)({
        format(args) {
            if (args.type === '0x7e')
                return {
                    isSystemTx: args.isSystemTx,
                    mint: args.mint ? (0, fromHex_js_1.hexToBigInt)(args.mint) : undefined,
                    sourceHash: args.sourceHash,
                    type: 'deposit',
                };
            const transaction = { feeCurrency: args.feeCurrency };
            if (args.type === '0x7b')
                transaction.type = 'cip64';
            else {
                if (args.type === '0x7c')
                    transaction.type = 'cip42';
                transaction.gatewayFee = args.gatewayFee
                    ? (0, fromHex_js_1.hexToBigInt)(args.gatewayFee)
                    : null;
                transaction.gatewayFeeRecipient = args.gatewayFeeRecipient;
            }
            return transaction;
        },
    }),
    transactionRequest: (0, transactionRequest_js_1.defineTransactionRequest)({
        format(args) {
            const request = {};
            if (args.feeCurrency)
                request.feeCurrency = args.feeCurrency;
            if ((0, utils_js_1.isCIP64)(args))
                request.type = '0x7b';
            return request;
        },
    }),
};
//# sourceMappingURL=formatters.js.map