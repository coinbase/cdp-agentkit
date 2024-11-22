import { hexToBigInt, hexToNumber } from '../utils/encoding/fromHex.js';
import { hexToBytes } from '../utils/encoding/toBytes.js';
import { toHex } from '../utils/encoding/toHex.js';
import { defineBlock } from '../utils/formatters/block.js';
import { formatLog } from '../utils/formatters/log.js';
import { defineTransaction } from '../utils/formatters/transaction.js';
import { defineTransactionReceipt } from '../utils/formatters/transactionReceipt.js';
import { defineTransactionRequest } from '../utils/formatters/transactionRequest.js';
import { gasPerPubdataDefault } from './constants/number.js';
export const formatters = {
    block: /*#__PURE__*/ defineBlock({
        format(args) {
            const transactions = args.transactions?.map((transaction) => {
                if (typeof transaction === 'string')
                    return transaction;
                const formatted = formatters.transaction?.format(transaction);
                if (formatted.typeHex === '0x71')
                    formatted.type = 'eip712';
                else if (formatted.typeHex === '0xff')
                    formatted.type = 'priority';
                return formatted;
            });
            return {
                l1BatchNumber: args.l1BatchNumber
                    ? hexToBigInt(args.l1BatchNumber)
                    : null,
                l1BatchTimestamp: args.l1BatchTimestamp
                    ? hexToBigInt(args.l1BatchTimestamp)
                    : null,
                transactions,
            };
        },
    }),
    transaction: /*#__PURE__*/ defineTransaction({
        format(args) {
            const transaction = {};
            if (args.type === '0x71')
                transaction.type = 'eip712';
            else if (args.type === '0xff')
                transaction.type = 'priority';
            return {
                ...transaction,
                l1BatchNumber: args.l1BatchNumber
                    ? hexToBigInt(args.l1BatchNumber)
                    : null,
                l1BatchTxIndex: args.l1BatchTxIndex
                    ? hexToBigInt(args.l1BatchTxIndex)
                    : null,
            };
        },
    }),
    transactionReceipt: /*#__PURE__*/ defineTransactionReceipt({
        format(args) {
            return {
                l1BatchNumber: args.l1BatchNumber
                    ? hexToBigInt(args.l1BatchNumber)
                    : null,
                l1BatchTxIndex: args.l1BatchTxIndex
                    ? hexToBigInt(args.l1BatchTxIndex)
                    : null,
                logs: args.logs.map((log) => {
                    return {
                        ...formatLog(log),
                        l1BatchNumber: log.l1BatchNumber
                            ? hexToBigInt(log.l1BatchNumber)
                            : null,
                        transactionLogIndex: hexToNumber(log.transactionLogIndex),
                        logType: log.logType,
                    };
                }),
                l2ToL1Logs: args.l2ToL1Logs.map((l2ToL1Log) => {
                    return {
                        blockNumber: hexToBigInt(l2ToL1Log.blockHash),
                        blockHash: l2ToL1Log.blockHash,
                        l1BatchNumber: l2ToL1Log.l1BatchNumber
                            ? hexToBigInt(l2ToL1Log.l1BatchNumber)
                            : null,
                        transactionIndex: hexToBigInt(l2ToL1Log.transactionIndex),
                        shardId: hexToBigInt(l2ToL1Log.shardId),
                        isService: l2ToL1Log.isService,
                        sender: l2ToL1Log.sender,
                        key: l2ToL1Log.key,
                        value: l2ToL1Log.value,
                        transactionHash: l2ToL1Log.transactionHash,
                        logIndex: hexToBigInt(l2ToL1Log.logIndex),
                    };
                }),
            };
        },
    }),
    transactionRequest: /*#__PURE__*/ defineTransactionRequest({
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
                            ? { gasPerPubdata: toHex(args.gasPerPubdata) }
                            : { gasPerPubdata: toHex(gasPerPubdataDefault) }),
                        ...(args.paymaster && args.paymasterInput
                            ? {
                                paymasterParams: {
                                    paymaster: args.paymaster,
                                    paymasterInput: Array.from(hexToBytes(args.paymasterInput)),
                                },
                            }
                            : {}),
                        ...(args.factoryDeps
                            ? {
                                factoryDeps: args.factoryDeps.map((dep) => Array.from(hexToBytes(dep))),
                            }
                            : {}),
                        ...(args.customSignature
                            ? {
                                customSignature: Array.from(hexToBytes(args.customSignature)),
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