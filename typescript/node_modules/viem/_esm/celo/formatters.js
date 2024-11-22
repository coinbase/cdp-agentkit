import { hexToBigInt } from '../utils/encoding/fromHex.js';
import { defineBlock } from '../utils/formatters/block.js';
import { defineTransaction, formatTransaction, } from '../utils/formatters/transaction.js';
import { defineTransactionRequest } from '../utils/formatters/transactionRequest.js';
import { isCIP64 } from './utils.js';
export const formatters = {
    block: /*#__PURE__*/ defineBlock({
        format(args) {
            const transactions = args.transactions?.map((transaction) => {
                if (typeof transaction === 'string')
                    return transaction;
                const formatted = formatTransaction(transaction);
                return {
                    ...formatted,
                    ...(transaction.gatewayFee
                        ? {
                            gatewayFee: hexToBigInt(transaction.gatewayFee),
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
    transaction: /*#__PURE__*/ defineTransaction({
        format(args) {
            if (args.type === '0x7e')
                return {
                    isSystemTx: args.isSystemTx,
                    mint: args.mint ? hexToBigInt(args.mint) : undefined,
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
                    ? hexToBigInt(args.gatewayFee)
                    : null;
                transaction.gatewayFeeRecipient = args.gatewayFeeRecipient;
            }
            return transaction;
        },
    }),
    transactionRequest: /*#__PURE__*/ defineTransactionRequest({
        format(args) {
            const request = {};
            if (args.feeCurrency)
                request.feeCurrency = args.feeCurrency;
            if (isCIP64(args))
                request.type = '0x7b';
            return request;
        },
    }),
};
//# sourceMappingURL=formatters.js.map