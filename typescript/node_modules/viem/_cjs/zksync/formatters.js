"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatters = void 0;
const fromHex_js_1 = require("../utils/encoding/fromHex.js");
const toBytes_js_1 = require("../utils/encoding/toBytes.js");
const toHex_js_1 = require("../utils/encoding/toHex.js");
const block_js_1 = require("../utils/formatters/block.js");
const log_js_1 = require("../utils/formatters/log.js");
const transaction_js_1 = require("../utils/formatters/transaction.js");
const transactionReceipt_js_1 = require("../utils/formatters/transactionReceipt.js");
const transactionRequest_js_1 = require("../utils/formatters/transactionRequest.js");
const number_js_1 = require("./constants/number.js");
exports.formatters = {
    block: (0, block_js_1.defineBlock)({
        format(args) {
            const transactions = args.transactions?.map((transaction) => {
                if (typeof transaction === 'string')
                    return transaction;
                const formatted = exports.formatters.transaction?.format(transaction);
                if (formatted.typeHex === '0x71')
                    formatted.type = 'eip712';
                else if (formatted.typeHex === '0xff')
                    formatted.type = 'priority';
                return formatted;
            });
            return {
                l1BatchNumber: args.l1BatchNumber
                    ? (0, fromHex_js_1.hexToBigInt)(args.l1BatchNumber)
                    : null,
                l1BatchTimestamp: args.l1BatchTimestamp
                    ? (0, fromHex_js_1.hexToBigInt)(args.l1BatchTimestamp)
                    : null,
                transactions,
            };
        },
    }),
    transaction: (0, transaction_js_1.defineTransaction)({
        format(args) {
            const transaction = {};
            if (args.type === '0x71')
                transaction.type = 'eip712';
            else if (args.type === '0xff')
                transaction.type = 'priority';
            return {
                ...transaction,
                l1BatchNumber: args.l1BatchNumber
                    ? (0, fromHex_js_1.hexToBigInt)(args.l1BatchNumber)
                    : null,
                l1BatchTxIndex: args.l1BatchTxIndex
                    ? (0, fromHex_js_1.hexToBigInt)(args.l1BatchTxIndex)
                    : null,
            };
        },
    }),
    transactionReceipt: (0, transactionReceipt_js_1.defineTransactionReceipt)({
        format(args) {
            return {
                l1BatchNumber: args.l1BatchNumber
                    ? (0, fromHex_js_1.hexToBigInt)(args.l1BatchNumber)
                    : null,
                l1BatchTxIndex: args.l1BatchTxIndex
                    ? (0, fromHex_js_1.hexToBigInt)(args.l1BatchTxIndex)
                    : null,
                logs: args.logs.map((log) => {
                    return {
                        ...(0, log_js_1.formatLog)(log),
                        l1BatchNumber: log.l1BatchNumber
                            ? (0, fromHex_js_1.hexToBigInt)(log.l1BatchNumber)
                            : null,
                        transactionLogIndex: (0, fromHex_js_1.hexToNumber)(log.transactionLogIndex),
                        logType: log.logType,
                    };
                }),
                l2ToL1Logs: args.l2ToL1Logs.map((l2ToL1Log) => {
                    return {
                        blockNumber: (0, fromHex_js_1.hexToBigInt)(l2ToL1Log.blockHash),
                        blockHash: l2ToL1Log.blockHash,
                        l1BatchNumber: l2ToL1Log.l1BatchNumber
                            ? (0, fromHex_js_1.hexToBigInt)(l2ToL1Log.l1BatchNumber)
                            : null,
                        transactionIndex: (0, fromHex_js_1.hexToBigInt)(l2ToL1Log.transactionIndex),
                        shardId: (0, fromHex_js_1.hexToBigInt)(l2ToL1Log.shardId),
                        isService: l2ToL1Log.isService,
                        sender: l2ToL1Log.sender,
                        key: l2ToL1Log.key,
                        value: l2ToL1Log.value,
                        transactionHash: l2ToL1Log.transactionHash,
                        logIndex: (0, fromHex_js_1.hexToBigInt)(l2ToL1Log.logIndex),
                    };
                }),
            };
        },
    }),
    transactionRequest: (0, transactionRequest_js_1.defineTransactionRequest)({
        exclude: [
            'customSignature',
            'factoryDeps',
            'gasPerPubdata',
            'paymaster',
            'paymasterInput',
        ],
        format(args) {
            if (args.gasPerPubdata ||
                (args.paymaster && args.paymasterInput) ||
                args.factoryDeps ||
                args.customSignature)
                return {
                    eip712Meta: {
                        ...(args.gasPerPubdata
                            ? { gasPerPubdata: (0, toHex_js_1.toHex)(args.gasPerPubdata) }
                            : { gasPerPubdata: (0, toHex_js_1.toHex)(number_js_1.gasPerPubdataDefault) }),
                        ...(args.paymaster && args.paymasterInput
                            ? {
                                paymasterParams: {
                                    paymaster: args.paymaster,
                                    paymasterInput: Array.from((0, toBytes_js_1.hexToBytes)(args.paymasterInput)),
                                },
                            }
                            : {}),
                        ...(args.factoryDeps
                            ? {
                                factoryDeps: args.factoryDeps.map((dep) => Array.from((0, toBytes_js_1.hexToBytes)(dep))),
                            }
                            : {}),
                        ...(args.customSignature
                            ? {
                                customSignature: Array.from((0, toBytes_js_1.hexToBytes)(args.customSignature)),
                            }
                            : {}),
                    },
                    type: '0x71',
                };
            return {};
        },
    }),
};
//# sourceMappingURL=formatters.js.map