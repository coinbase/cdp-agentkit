import { parseEventLogs, } from '../../utils/abi/parseEventLogs.js';
import { portalAbi } from '../abis.js';
export function extractTransactionDepositedLogs({ logs, }) {
    return parseEventLogs({
        abi: portalAbi,
        eventName: 'TransactionDeposited',
        logs,
    });
}
//# sourceMappingURL=extractTransactionDepositedLogs.js.map