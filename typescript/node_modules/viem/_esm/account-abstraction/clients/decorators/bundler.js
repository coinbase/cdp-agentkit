import { getChainId, } from '../../../actions/public/getChainId.js';
import { estimateUserOperationGas, } from '../../actions/bundler/estimateUserOperationGas.js';
import { getSupportedEntryPoints, } from '../../actions/bundler/getSupportedEntryPoints.js';
import { getUserOperation, } from '../../actions/bundler/getUserOperation.js';
import { getUserOperationReceipt, } from '../../actions/bundler/getUserOperationReceipt.js';
import { prepareUserOperation, } from '../../actions/bundler/prepareUserOperation.js';
import { sendUserOperation, } from '../../actions/bundler/sendUserOperation.js';
import { waitForUserOperationReceipt, } from '../../actions/bundler/waitForUserOperationReceipt.js';
export function bundlerActions(client) {
    return {
        estimateUserOperationGas: (parameters) => estimateUserOperationGas(client, parameters),
        getChainId: () => getChainId(client),
        getSupportedEntryPoints: () => getSupportedEntryPoints(client),
        getUserOperation: (parameters) => getUserOperation(client, parameters),
        getUserOperationReceipt: (parameters) => getUserOperationReceipt(client, parameters),
        prepareUserOperation: (parameters) => prepareUserOperation(client, parameters),
        sendUserOperation: (parameters) => sendUserOperation(client, parameters),
        waitForUserOperationReceipt: (parameters) => waitForUserOperationReceipt(client, parameters),
    };
}
//# sourceMappingURL=bundler.js.map