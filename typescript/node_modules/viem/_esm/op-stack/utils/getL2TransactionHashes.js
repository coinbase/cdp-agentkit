import { extractTransactionDepositedLogs } from './extractTransactionDepositedLogs.js';
import { getL2TransactionHash } from './getL2TransactionHash.js';
export function getL2TransactionHashes({ logs, }) {
    const extractedLogs = extractTransactionDepositedLogs({ logs });
    return extractedLogs.map((log) => getL2TransactionHash({ log }));
}
//# sourceMappingURL=getL2TransactionHashes.js.map