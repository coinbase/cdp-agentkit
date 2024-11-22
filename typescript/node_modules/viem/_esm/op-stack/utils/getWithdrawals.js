import { extractWithdrawalMessageLogs, } from './extractWithdrawalMessageLogs.js';
export function getWithdrawals({ logs, }) {
    const extractedLogs = extractWithdrawalMessageLogs({ logs });
    return extractedLogs.map((log) => log.args);
}
//# sourceMappingURL=getWithdrawals.js.map