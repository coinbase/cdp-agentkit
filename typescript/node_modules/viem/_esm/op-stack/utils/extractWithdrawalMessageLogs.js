import { parseEventLogs, } from '../../utils/abi/parseEventLogs.js';
import { l2ToL1MessagePasserAbi } from '../abis.js';
export function extractWithdrawalMessageLogs({ logs, }) {
    return parseEventLogs({
        abi: l2ToL1MessagePasserAbi,
        eventName: 'MessagePassed',
        logs,
    });
}
//# sourceMappingURL=extractWithdrawalMessageLogs.js.map