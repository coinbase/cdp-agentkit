import { getEnsAddress, } from '../../actions/ens/getEnsAddress.js';
import { getEnsAvatar, } from '../../actions/ens/getEnsAvatar.js';
import { getEnsName, } from '../../actions/ens/getEnsName.js';
import { getEnsResolver, } from '../../actions/ens/getEnsResolver.js';
import { getEnsText, } from '../../actions/ens/getEnsText.js';
import { call, } from '../../actions/public/call.js';
import { createBlockFilter, } from '../../actions/public/createBlockFilter.js';
import { createContractEventFilter, } from '../../actions/public/createContractEventFilter.js';
import { createEventFilter, } from '../../actions/public/createEventFilter.js';
import { createPendingTransactionFilter, } from '../../actions/public/createPendingTransactionFilter.js';
import { estimateContractGas, } from '../../actions/public/estimateContractGas.js';
import { estimateFeesPerGas, } from '../../actions/public/estimateFeesPerGas.js';
import { estimateGas, } from '../../actions/public/estimateGas.js';
import { estimateMaxPriorityFeePerGas, } from '../../actions/public/estimateMaxPriorityFeePerGas.js';
import { getBalance, } from '../../actions/public/getBalance.js';
import { getBlobBaseFee, } from '../../actions/public/getBlobBaseFee.js';
import { getBlock, } from '../../actions/public/getBlock.js';
import { getBlockNumber, } from '../../actions/public/getBlockNumber.js';
import { getBlockTransactionCount, } from '../../actions/public/getBlockTransactionCount.js';
import { getChainId, } from '../../actions/public/getChainId.js';
import { getCode, } from '../../actions/public/getCode.js';
import { getContractEvents, } from '../../actions/public/getContractEvents.js';
import { getEip712Domain, } from '../../actions/public/getEip712Domain.js';
import { getFeeHistory, } from '../../actions/public/getFeeHistory.js';
import { getFilterChanges, } from '../../actions/public/getFilterChanges.js';
import { getFilterLogs, } from '../../actions/public/getFilterLogs.js';
import { getGasPrice, } from '../../actions/public/getGasPrice.js';
import { getLogs, } from '../../actions/public/getLogs.js';
import { getProof, } from '../../actions/public/getProof.js';
import { getStorageAt, } from '../../actions/public/getStorageAt.js';
import { getTransaction, } from '../../actions/public/getTransaction.js';
import { getTransactionConfirmations, } from '../../actions/public/getTransactionConfirmations.js';
import { getTransactionCount, } from '../../actions/public/getTransactionCount.js';
import { getTransactionReceipt, } from '../../actions/public/getTransactionReceipt.js';
import { multicall, } from '../../actions/public/multicall.js';
import { readContract, } from '../../actions/public/readContract.js';
import { simulateContract, } from '../../actions/public/simulateContract.js';
import { uninstallFilter, } from '../../actions/public/uninstallFilter.js';
import { verifyMessage, } from '../../actions/public/verifyMessage.js';
import { verifyTypedData, } from '../../actions/public/verifyTypedData.js';
import { waitForTransactionReceipt, } from '../../actions/public/waitForTransactionReceipt.js';
import { watchBlockNumber, } from '../../actions/public/watchBlockNumber.js';
import { watchBlocks, } from '../../actions/public/watchBlocks.js';
import { watchContractEvent, } from '../../actions/public/watchContractEvent.js';
import { watchEvent, } from '../../actions/public/watchEvent.js';
import { watchPendingTransactions, } from '../../actions/public/watchPendingTransactions.js';
import { verifySiweMessage, } from '../../actions/siwe/verifySiweMessage.js';
import { prepareTransactionRequest, } from '../../actions/wallet/prepareTransactionRequest.js';
import { sendRawTransaction, } from '../../actions/wallet/sendRawTransaction.js';
export function publicActions(client) {
    return {
        call: (args) => call(client, args),
        createBlockFilter: () => createBlockFilter(client),
        createContractEventFilter: (args) => createContractEventFilter(client, args),
        createEventFilter: (args) => createEventFilter(client, args),
        createPendingTransactionFilter: () => createPendingTransactionFilter(client),
        estimateContractGas: (args) => estimateContractGas(client, args),
        estimateGas: (args) => estimateGas(client, args),
        getBalance: (args) => getBalance(client, args),
        getBlobBaseFee: () => getBlobBaseFee(client),
        getBlock: (args) => getBlock(client, args),
        getBlockNumber: (args) => getBlockNumber(client, args),
        getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
        getBytecode: (args) => getCode(client, args),
        getChainId: () => getChainId(client),
        getCode: (args) => getCode(client, args),
        getContractEvents: (args) => getContractEvents(client, args),
        getEip712Domain: (args) => getEip712Domain(client, args),
        getEnsAddress: (args) => getEnsAddress(client, args),
        getEnsAvatar: (args) => getEnsAvatar(client, args),
        getEnsName: (args) => getEnsName(client, args),
        getEnsResolver: (args) => getEnsResolver(client, args),
        getEnsText: (args) => getEnsText(client, args),
        getFeeHistory: (args) => getFeeHistory(client, args),
        estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
        getFilterChanges: (args) => getFilterChanges(client, args),
        getFilterLogs: (args) => getFilterLogs(client, args),
        getGasPrice: () => getGasPrice(client),
        getLogs: (args) => getLogs(client, args),
        getProof: (args) => getProof(client, args),
        estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
        getStorageAt: (args) => getStorageAt(client, args),
        getTransaction: (args) => getTransaction(client, args),
        getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
        getTransactionCount: (args) => getTransactionCount(client, args),
        getTransactionReceipt: (args) => getTransactionReceipt(client, args),
        multicall: (args) => multicall(client, args),
        prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
        readContract: (args) => readContract(client, args),
        sendRawTransaction: (args) => sendRawTransaction(client, args),
        simulateContract: (args) => simulateContract(client, args),
        verifyMessage: (args) => verifyMessage(client, args),
        verifySiweMessage: (args) => verifySiweMessage(client, args),
        verifyTypedData: (args) => verifyTypedData(client, args),
        uninstallFilter: (args) => uninstallFilter(client, args),
        waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
        watchBlocks: (args) => watchBlocks(client, args),
        watchBlockNumber: (args) => watchBlockNumber(client, args),
        watchContractEvent: (args) => watchContractEvent(client, args),
        watchEvent: (args) => watchEvent(client, args),
        watchPendingTransactions: (args) => watchPendingTransactions(client, args),
    };
}
//# sourceMappingURL=public.js.map