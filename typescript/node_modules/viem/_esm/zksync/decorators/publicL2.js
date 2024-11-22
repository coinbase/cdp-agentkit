import { estimateFee } from '../actions/estimateFee.js';
import { estimateGasL1ToL2, } from '../actions/estimateGasL1ToL2.js';
import { getAllBalances, } from '../actions/getAllBalances.js';
import { getBaseTokenL1Address, } from '../actions/getBaseTokenL1Address.js';
import { getBlockDetails, } from '../actions/getBlockDetails.js';
import { getBridgehubContractAddress, } from '../actions/getBridgehubContractAddress.js';
import { getDefaultBridgeAddresses, } from '../actions/getDefaultBridgeAddresses.js';
import { getL1BatchBlockRange, } from '../actions/getL1BatchBlockRange.js';
import { getL1BatchDetails, } from '../actions/getL1BatchDetails.js';
import { getL1BatchNumber, } from '../actions/getL1BatchNumber.js';
import { getL1ChainId, } from '../actions/getL1ChainId.js';
import { getLogProof, } from '../actions/getLogProof.js';
import { getMainContractAddress, } from '../actions/getMainContractAddress.js';
import { getRawBlockTransactions, } from '../actions/getRawBlockTransactions.js';
import { getTestnetPaymasterAddress, } from '../actions/getTestnetPaymasterAddress.js';
import { getTransactionDetails, } from '../actions/getTransactionDetails.js';
export function publicActionsL2() {
    return (client) => {
        return {
            estimateGasL1ToL2: (args) => estimateGasL1ToL2(client, args),
            getDefaultBridgeAddresses: () => getDefaultBridgeAddresses(client),
            getTestnetPaymasterAddress: () => getTestnetPaymasterAddress(client),
            getL1ChainId: () => getL1ChainId(client),
            getMainContractAddress: () => getMainContractAddress(client),
            getAllBalances: (args) => getAllBalances(client, args),
            getRawBlockTransaction: (args) => getRawBlockTransactions(client, args),
            getBlockDetails: (args) => getBlockDetails(client, args),
            getL1BatchDetails: (args) => getL1BatchDetails(client, args),
            getL1BatchBlockRange: (args) => getL1BatchBlockRange(client, args),
            getL1BatchNumber: () => getL1BatchNumber(client),
            getLogProof: (args) => getLogProof(client, args),
            getTransactionDetails: (args) => getTransactionDetails(client, args),
            estimateFee: (args) => estimateFee(client, args),
            getBridgehubContractAddress: () => getBridgehubContractAddress(client),
            getBaseTokenL1Address: () => getBaseTokenL1Address(client),
        };
    };
}
//# sourceMappingURL=publicL2.js.map