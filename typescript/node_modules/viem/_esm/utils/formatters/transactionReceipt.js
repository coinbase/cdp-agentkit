import { hexToNumber } from '../encoding/fromHex.js';
import { defineFormatter } from './formatter.js';
import { formatLog } from './log.js';
import { transactionType } from './transaction.js';
export const receiptStatuses = {
    '0x0': 'reverted',
    '0x1': 'success',
};
export function formatTransactionReceipt(transactionReceipt) {
    const receipt = {
        ...transactionReceipt,
        blockNumber: transactionReceipt.blockNumber
            ? BigInt(transactionReceipt.blockNumber)
            : null,
        contractAddress: transactionReceipt.contractAddress
            ? transactionReceipt.contractAddress
            : null,
        cumulativeGasUsed: transactionReceipt.cumulativeGasUsed
            ? BigInt(transactionReceipt.cumulativeGasUsed)
            : null,
        effectiveGasPrice: transactionReceipt.effectiveGasPrice
            ? BigInt(transactionReceipt.effectiveGasPrice)
            : null,
        gasUsed: transactionReceipt.gasUsed
            ? BigInt(transactionReceipt.gasUsed)
            : null,
        logs: transactionReceipt.logs
            ? transactionReceipt.logs.map((log) => formatLog(log))
            : null,
        to: transactionReceipt.to ? transactionReceipt.to : null,
        transactionIndex: transactionReceipt.transactionIndex
            ? hexToNumber(transactionReceipt.transactionIndex)
            : null,
        status: transactionReceipt.status
            ? receiptStatuses[transactionReceipt.status]
            : null,
        type: transactionReceipt.type
            ? transactionType[transactionReceipt.type] || transactionReceipt.type
            : null,
    };
    if (transactionReceipt.blobGasPrice)
        receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed)
        receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    return receipt;
}
export const defineTransactionReceipt = /*#__PURE__*/ defineFormatter('transactionReceipt', formatTransactionReceipt);
//# sourceMappingURL=transactionReceipt.js.map